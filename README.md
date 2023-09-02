<!-- Improved compatibility of back to top link: See: https://github.com/othneildrew/Best-README-Template/pull/73 -->
<a name="readme-top"></a>
<!--
*** Thanks for checking out the Best-README-Template. If you have a suggestion
*** that would make this better, please fork the repo and create a pull request
*** or simply open an issue with the tag "enhancement".
*** Don't forget to give the project a star!
*** Thanks again! Now go create something AMAZING! :D
-->



<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->
[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![React][React.js]][React-url]
[![Next][Next.js]][Next-url]

  

<h3 align="center">skyblock.bingo</h3>

  <p align="center">
    View your Hypixel Skyblock bingo stats
    <br />
    <a href="https://github.com/awesomepandapig/skyblock.bingo/issues">Report Bug</a>
    ·
    <a href="https://github.com/awesomepandapig/skyblock.bingo/issues">Request Feature</a>
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About

![Product Name Screen Shot](https://github.com/awesomepandapig/skyblock.bingo/assets/34806109/9698ef1a-9891-4e60-9d48-a5eb8ce53e62)

* View your global bingo ranking
* View your completed goals for this month's bingo event
* View a guide on how to complete your remaining goals
* View a leaderboard of the top 100 bingo players

<!-- GETTING STARTED -->
## Getting Started

### Prerequisites

* Node.js
* Go
* Redis

### Installation

1. Get a Hypixel API Key at [developer.hypixel.net](https://developer.hypixel.net)
2. Clone the repo
   ```sh
   git clone https://github.com/awesomepandapig/skyblock.bingo.git
   ```
3. Enter the client directory
   ```sh
   cd client
   ```
5. Install NPM packages
   ```sh
   npm install
   ```
4. Enter your API Key in `.env.local`
   ```js
   API_KEY='YOUR_API_KEY';
   ```
5. Enter the server direcory
   ```sh
   cd ../server
   ```
6. Enter your API Key in `.env`
   ```js
   API_KEY='YOUR_API_KEY';
   ```

### Running

1. Run the client
   ```sh
   cd client
   npm run build && npm start
   ```
2. Run the server
   ```sh
   cd server
   redis-server --daemonize yes
   go run index.go
   ```

<!-- ROADMAP -->
## Roadmap

See the [open issues](https://github.com/awesomepandapig/skyblock.bingo/issues) for a full list of proposed features (and known issues).

<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request





<!-- LICENSE -->
## License

Distributed under the MIT License.





<!-- ACKNOWLEDGMENTS -->
## Acknowledgments

* Bingo guide provided by [Bingo Brewers](https://discord.gg/bingobrewers)
* Minecraft usernames provided by [Mojang](https://api.mojang.com)
* Minecraft head images provided by [Crafatar](https://crafatar.com)
* This product is not affiliated or endorsed by Hypixel





<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/awesomepandapig/skyblock.bingo.svg?style=for-the-badge
[contributors-url]: https://github.com/awesomepandapig/skyblock.bingo/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/awesomepandapig/skyblock.bingo.svg?style=for-the-badge
[forks-url]: https://github.com/awesomepandapig/skyblock.bingo/network/members
[stars-shield]: https://img.shields.io/github/stars/awesomepandapig/skyblock.bingo.svg?style=for-the-badge
[stars-url]: https://github.com/awesomepandapig/skyblock.bingo/stargazers
[issues-shield]: https://img.shields.io/github/issues/awesomepandapig/skyblock.bingo.svg?style=for-the-badge
[issues-url]: https://github.com/awesomepandapig/skyblock.bingo/issues
[license-shield]: https://img.shields.io/github/license/awesomepandapig/skyblock.bingo.svg?style=for-the-badge
[license-url]: https://github.com/awesomepandapig/skyblock.bingo/blob/main/LICENSE
[product-screenshot]: images/screenshot.png
[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
