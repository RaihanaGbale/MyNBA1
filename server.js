const express = require(`express`)
const path = require(`path`)
const app = express()
const urllib = require(`urllib`)
const port = 3000;
let teamPlayers = []

const teamToIDs = {
    "lakers": "1610612747",
    "warriors": "1610612744",
    "heat": "1610612748",
    "suns": "1610612756"
}

app.use(express.static(path.join(__dirname, "dist")))
app.use(express.static(path.join(__dirname, "node_modules")))

const loadPlayers = function (playersData, teamName) {
    let allPlayersList = JSON.parse(playersData).league.standard
    teamPlayers = allPlayersList.filter(player => player.isActive && player.teamId == teamToIDs[teamName]).
        map(player => {
            return {
                firstName: player.firstName,
                lastName: player.lastName,
                jersey: player.jersey,
                pos: player.pos
            }
        })
}

app.get("/teams/:teamName", function (request, response) {
    const teamName = request.params.teamName
    urllib.request("http://data.nba.net/10s/prod/v1/2018/players.json", function (err, playersData, res) {
        if (err) { throw err; }
        loadPlayers(playersData, teamName)
    })
    response.send(teamPlayers)
})

app.listen(port, function () {
    console.log(`The server on port ${port} is listening`)
})