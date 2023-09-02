package main

import (
	"context"
	"github.com/redis/go-redis/v9"
  "net/http"
  "os"
  "io/ioutil"
  "github.com/gin-gonic/gin"
  "encoding/json"
  _ "github.com/joho/godotenv/autoload"
)

func fetch(url string) string {
	res, err := http.Get(url)
	if err != nil {
		panic(err)
	}
	defer res.Body.Close()
	resBody, err := ioutil.ReadAll(res.Body)
  if err != nil {
		panic(err)
	}
	response := string(resBody)
	return response
}

func getTotalPoints(c *gin.Context, uuid string) float64 {
  hypixelKey := os.Getenv("API_KEY")
  res := fetch("https://api.hypixel.net/skyblock/bingo?key="+hypixelKey+"&uuid="+uuid)
  resBytes := []byte(res)
  var jsonRes map[string]interface{} // declaring a map for key names as string and values as interface 
  err := json.Unmarshal(resBytes, &jsonRes)
  if err != nil {
    panic(err)
  }

  success := jsonRes["success"].(bool)
  if !success {
    c.JSON(http.StatusBadRequest, gin.H{"error": "Malformed UUID"})
    panic(err)
  }

  totalPoints := 0.0
  events := jsonRes["events"].([]interface{}) // type the interface again to a array of interfaces
  for i := range events {
    currEvent := events[i].(map[string]interface{}) // Type assertion to map[string]interface{}
		points := currEvent["points"].(float64)           // Correctly assert to int64
		totalPoints += points
  }
  return totalPoints
}

/* CREATE & UPDATE */
func setLeaderboardRank(uuid string, score float64, client *redis.Client, ctx context.Context) {
  _, err := client.ZAdd(ctx, "leaderboard", redis.Z{Score: score, Member: uuid}).Result()
	if err != nil {
		panic(err)
	}
}

/* READ */
func getLeaderboardRank(c *gin.Context, client *redis.Client, ctx context.Context) {
  uuid := c.Param("uuid")
  totalPoints := getTotalPoints(c, uuid)
  // break execution if total_points == 0 || nil
  zRevRankResult, err := client.ZRevRankWithScore(ctx, "leaderboard", uuid).Result()
	if err != nil {
    setLeaderboardRank(uuid, totalPoints, client, ctx) // User does not already exist
    zRevRankResult, err := client.ZRevRankWithScore(ctx, "leaderboard", uuid).Result()
    if err != nil {
      panic(err)   
    }
    c.JSON(http.StatusOK, zRevRankResult)
    return
	}
	if totalPoints > zRevRankResult.Score {
    setLeaderboardRank(uuid, totalPoints, client, ctx)
		zRevRankResult, err := client.ZRevRankWithScore(ctx, "leaderboard", uuid).Result()
    if err != nil {
      c.JSON(http.StatusOK, zRevRankResult)
      panic(err)
    }
    c.JSON(http.StatusOK, zRevRankResult)
    return
	}
  c.JSON(http.StatusOK, zRevRankResult)
}

type Guide struct {
  Name   string `json:"name"`
  Lore   string `json:"lore"`
  Method string `json:"method"`
  Notes  string `json:"notes"`
}

func getGuide(c *gin.Context) {
  var guides []Guide
  dat, err := os.Open("./guide.json")
  if err != nil {
    c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to open file"})
		return
  }
  defer dat.Close()
  bytes, err := ioutil.ReadAll(dat)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to read file"})
		return
	}
  err = json.Unmarshal(bytes, &guides)
  if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to unmarshal JSON"})
		return
	}
  c.JSON(http.StatusOK, guides)
}

/*func getLeaderboard(c *gin.Context, client *redis.Client, ctx context.Context) {
	zRevRangeResult, err := client.ZRevRangeWithScores(ctx, "leaderboard", 0, 100).Result()
	if err != nil {
		panic(err)
	}
	c.JSON(http.StatusOK, zRevRangeResult)
}*/

func main() {
  /* REDIS CLIENT */
  client := redis.NewClient(&redis.Options{
    Addr:	  "localhost:6379",
    Password: "", // no password set
    DB:		  0,  // use default DB
  })
  ctx := context.Background()
  
  /* GIN CLIENT */
  gin.SetMode(gin.ReleaseMode)
  router := gin.Default()
  /*router.GET("/leaderboard", func(c *gin.Context) {
		getLeaderboard(c, client, ctx)
	})*/
  router.GET("/leaderboard/:uuid", func(c *gin.Context) {
		getLeaderboardRank(c, client, ctx)
	})
  router.GET("/guide", func(c *gin.Context) {
		getGuide(c)
	})
  router.Run("localhost:8080")
}
