const fs = require("fs");
const path = require("path");
const cors = require("cors");
const express = require("express");
const app = express();

let folderPath = path.resolve(__dirname, "SampleIMG"); //default url
let images = [];
let isFinished = false;

const getAllImage = () => {
    //initailize before pushing image id
    images = [];
    isFinished = false;

    fs.readdirSync(folderPath).map((filename) => {
        images.push(filename);
    });
    isFinished = true;

}
//pick an image id randomly
const randompick = () => {
    const random = Math.floor(Math.random() * images.length >> 0);
    return images[random];
}

//setting cors from the client
app.use("*", cors({
    origin: "http://localhost:3000"
}));

//body parser
app.use(express.json());

//POST function
app.post("/image", (req, res) => {

    //the new folderurl data from post body
    let url = req.body.url;
    
    if(url != undefined){
        if(url != folderPath && url != ""){
            folderPath = url; 
            getAllImage();
            
        }

        if(isFinished === true){
            let imagePath = path.resolve(folderPath , randompick());
            console.log(imagePath);
            res.sendFile(imagePath);
        }
    }
    
});

//Get Sample Image beforehead
getAllImage();

app.listen(8080, () => {
    console.log("Image Server Running");
});


