const dotenv = require('dotenv').config();
const fetch = require('node-fetch');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
app.set('views', './views');
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
const port = process.env.PORT;
const origin = process.env.ORIGIN;
const key = process.env.API_KEY;

var corsOptions = {
    origin: origin,
    optionsSuccessStatus: 200
}

const { body, validationResult } = require('express-validator');

let leaderboard = JSON.parse(fs.readFileSync('leaderboard.json'));
let blacklist = JSON.parse(fs.readFileSync('blacklist.json'));
let blacklist_temp = JSON.parse(JSON.stringify(blacklist));

app.get('/api', (req, res) => {
    res.sendFile(__dirname + '/swagger.html');
})

app.get('/api/swagger.json', (req, res) => {
    res.sendFile(__dirname + '/swagger.json');
})

app.get('/stats/:user', (req, res) => {
    res.sendFile(__dirname + '/index.html');
})

app.get('/api/stats/:user', async (req, res) => {
    let responded = false;
    if (req.params.user.length > 16) { // If uuid
        id = req.params.user;
        if(id.includes('-')) {
            id = id.replace(/-/g, '');
        }
    } else { // If username
        var id = '';
        await Promise.all([
            fetch(`https://api.mojang.com/users/profiles/minecraft/${req.params.user}`)
        ])
        .then(async([res1]) => {
            // Gets the user's uuid from the Mojang API
            mojang_data = await res1.json();
            id = mojang_data.id;
        })
        .catch(error => {
            res.send({success: false, cause: 'This user does not exist'});
            responded = true;
        });
    }
    if(id != '') {
        Promise.all([
            fetch(`https://api.hypixel.net/resources/skyblock/bingo`)
        ])
        .then(async([res1]) => {
            // Gets the current active bingo goals
            let goal_data = await res1.json();
            Promise.all([
                fetch(`https://api.hypixel.net/player?key=${key}&uuid=${id}`),
                fetch(`https://api.hypixel.net/skyblock/profiles?key=${key}&uuid=${id}`),
                fetch(`https://api.hypixel.net/skyblock/bingo?key=${key}&uuid=${id}`)
            ])
            .then(async([res1, res2, res3]) => {
                let player_data = await res1.json();
                // Get's the user's username
                let name = player_data.player.displayname;
                // Gets the user's Hypixel rank
                var hypixel_rank = 'NORMAL';
                if(player_data.player.rank != undefined) {
                    hypixel_rank = player_data.player.rank;
                } else if(player_data.player.monthlyPackageRank != undefined && player_data.player.monthlyPackageRank != 'NONE') {
                    hypixel_rank = player_data.player.monthlyPackageRank;
                } else if(player_data.player.newPackageRank != undefined) {
                    hypixel_rank = player_data.player.newPackageRank;
                } else if(player_data.player.packageRank != undefined) {
                    hypixel_rank = player_data.player.packageRank;
                }
                
                let profile_data = await res2.json();
                // If the user does not have skyblock data send an error message
                if (profile_data.profiles == null && !responded) {res.send({success: false, cause: 'No skyblock data could be found'}); responded = true;}
                let bingo_rank = 0;
                let profile_number = 0;
                for (i = 0; i < profile_data.profiles.length; i++) {
                    if (profile_data.profiles[i].game_mode == 'bingo') {
                        // Determines which profile is the user's bingo profile
                        profile_number = i;
                        // Determines the user's bingo rank (based on their active bingo pet)
                        if (profile_data.profiles[profile_number].members[id].pets[0] != undefined) {
                            if (profile_data.profiles[profile_number].members[id].pets[0].tier == 'UNCOMMON') {bingo_rank = 1;}
                            if (profile_data.profiles[profile_number].members[id].pets[0].tier == 'RARE') {bingo_rank = 2;}
                            if (profile_data.profiles[profile_number].members[id].pets[0].tier == 'EPIC') {bingo_rank = 3;}
                        }
                        break;
                    }
                }
    
                let bingo_data = await res3.json();
                // If the user does not have bingo data send an empty response
                if (bingo_data.success == false && !responded) {res.send({uuid: id, username: name, hypixel_rank: hypixel_rank, bingo_rank: 0, total_completions: 0, total_points: 0, points: 0, completed_goals: []}); responded = true;}
                // Get's the total bingo points & total bingo completions of a user
                var completions = 0;
                var total_points = 0;
                let add_to_blacklist = false;
                for(j = 0; j < bingo_data.events.length; j++) {
                    // If a user has exceeded the maximum number of points (ie: they duped points) blacklist the user
                    if (bingo_data.events[j].points > 160) {add_to_blacklist = true;}
                    if(bingo_data.events[j].completed_goals.length == 20) {completions++;}
                    total_points+=bingo_data.events[j].points;
                }
    
                // Checks to see if a user is blacklisted
                let already_blacklisted = false;
                for(i = 0; i < blacklist_temp.length; i++) {
                    if(blacklist_temp[i].uuid == id) {already_blacklisted = true;}
                }
    
                // Updates the leaderboard array
                // For each player on the leaderboard
                for(k = 0; k < leaderboard.length; k++) {
                    // If the user is not blacklisted
                    if(!already_blacklisted) {
                        // If the user's points are greater than the person k on the leaderboard
                        if (total_points > leaderboard[k].points) {
                            // If the user is already on the leaderboard
                            if (leaderboard.find(element => element.uuid === id) != undefined) {
                                // If the amount of points shown is less than the current amount
                                if (total_points > (leaderboard.find(element => element.uuid === id).points)) {
                                    let index = leaderboard.findIndex(element => element.uuid === id);
                                    leaderboard.splice(index, 1);
                                    leaderboard.splice(k, 0, {uuid: id, name: name, hypixel_rank: hypixel_rank, points: total_points});
                                    break;
                                }
                            // If the user is not already on the leaderboard
                            } else {
                                leaderboard.splice(k, 0, {uuid: id, name: name, hypixel_rank: hypixel_rank, points: total_points});
                                leaderboard.pop();
                                break;   
                            }
                        }
                    }
                }
                
                // Updates the blacklist.json file
                if(add_to_blacklist && !already_blacklisted) {blacklist_temp.push({uuid: id});}
                if(blacklist != blacklist_temp) {
                    fs.writeFileSync('blacklist.json', JSON.stringify(blacklist_temp));
                }
    
                // Updates the leaderboard.json file
                fs.writeFileSync('leaderboard.json', JSON.stringify(leaderboard));
    
                completed_goals = [];
                points = 0;
                // Gets the user's amount of points for the current bingo event
                for(i = 0; i < bingo_data.events.length; i++) {
                    if (bingo_data.events[i].key == goal_data.id) {
                        points = bingo_data.events[i].points;
                        // Gets the # of completed goals for the current bingo event
                        completed_goals = bingo_data.events[i].completed_goals;
                    }
                }
                if(!responded) {res.send({uuid: id, username: name, hypixel_rank: hypixel_rank, bingo_rank: bingo_rank, total_completions: completions, total_points: total_points, points: points, completed_goals: completed_goals}); responded = true;}
            })
            .catch(error => {
                if(!responded) {res.send({success: false, cause: 'This user does not exist'}); responded = true;};
            });
        })
        .catch(error => {
            if(!responded) {res.send({success: false, cause: 'The Hypixel API is currently unavailable.'}); responded = true;};
        });
    }
})

app.get('/stats/:user', (req, res) => {
    res.sendFile(__dirname + '/index.html');
})

app.get('/api/leaderboard', (req, res) => {
    res.send({leaderboard});
})

app.get('/api/*', function(req, res){
    res.redirect(`https://${origin}/api`);
});

app.get('*', function(req, res){
    res.redirect(`https://${origin}`);
});

app.listen(port, () => {
    console.log(`Listening to requests on https://${origin}:${port}`);
});