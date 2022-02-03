const fs = require("fs");
const path = require("path");
const cors = require("cors");
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

//setting cors from the client
app.use("*", cors({
    origin: "http://localhost:3000"
}));

app.get("/image", (req, res) => {
    let imagePath = path.resolve(folderPath , randompick());
    console.log(imagePath);
    res.sendFile(imagePath);
});

// testing data
app.get("/data", (req, res) => {
    let data = 
        {"products": [
            {"goods": "さくらみこ 3周年", "price": 5200},
            {"goods": "天音かなた 2周年", "price": 4500}
        ]}
    console.log(data);
    res.send(data);
});

app.listen(8080, () => {
    console.log("Image Server Running");
})