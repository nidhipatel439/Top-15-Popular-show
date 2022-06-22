const express = require("express");
const path = require("path");
const axios = require("axios");

const dotenv = require("dotenv");
dotenv.config();

const app = express();
const port = process.env.PORT || "3000";

const trakt = "https://api.trakt.tv";


app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
    getTrendingShows(res);
});



app.listen(port, () => {
    console.log(`listening on ${port}`);
})


function getTrendingShows(res) {
    axios(
        //config options
        {
            url: `${trakt}/shows/popular?limit=15`,
            method: "get",
            headers: {
                "Content-Type": "application/json",
                "trakt-api-version": 2,
                "trakt-api-key": process.env.TRAKT_CLIENT_ID
            }
        }
    ).then(function (response) {
        res.render("index", { title: "Home", shows: response.data })
    }).catch(function (error) {
        console.log(error);
    })
}