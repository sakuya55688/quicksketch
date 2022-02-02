const fs = require("fs");
const express = require("express");
const app = express();

let folderPath = "/Users/sakuya/Downloads/圖片/twitter";
let images = [];

fs.readdirSync(folderPath).map((filename) => {
    images.push(filename);
});

const randompick = () => {
    const random = Math.floor(Math.random() * images.length >> 0);
    return images[random];
}


app.use("/", (req, res) => {
    
});

