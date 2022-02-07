const fs = require("fs");
const path = require("path");
const cors = require("cors");
const express = require("express");
const app = express();

let folderPath = "/Users/sakuya/Downloads/圖片/twitter";
let images = [];


const getAllImage = () => {
    images = [];
    fs.readdirSync(folderPath).map((filename) => {
        images.push(filename);
    });
}
const randompick = () => {
    const random = Math.floor(Math.random() * images.length >> 0);
    return images[random];
}

//setting cors from the client
app.use("*", cors({
    origin: "http://localhost:3000"
}));

app.use(express.json());

app.post("/image", (req, res) => {

    let url = req.body.url;
    
    if(url != undefined){
        if(url != folderPath){
            folderPath = url;  
            getAllImage();
            
        }
    }

    

    let imagePath = path.resolve(folderPath , randompick());
    console.log(imagePath);
    res.sendFile(imagePath);
    
    
});


app.listen(8080, () => {
    console.log("Image Server Running");
})

getAllImage();