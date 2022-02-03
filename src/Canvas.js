import "./Canvas.css";
import Tools from "./Tools";
import { useState, useEffect, useRef } from "react";


const Canvas = ({imageData}) => {


    const [isDrawing, setIsDrawing] = useState(false);
    const [lineWidth, setLineWidth] = useState(5);
    const [lineColor, setLineColor] = useState("black");
    
    //canvas and context refference
    const canvasRef = useRef(null);
    const ctxRef = useRef(null);

    //variable for undo
    const restroreArray = useRef([]);
    

    //initial canvas and context
    useEffect(() => {

        const canvas = canvasRef.current;
        canvas.height = 500;//window.innerHeight/1.25;
        canvas.width = 600;//window.innerWidth/1.25;
        
        const ctx = canvas.getContext('2d');
        
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctxRef.current = ctx;
        
        drawImage();
    }, []);

    // drawing functions
    const startDrawing = ({nativeEvent, pressure, pointerType}) => {
        
        const {offsetX, offsetY} = nativeEvent;
        setIsDrawing(true);
        
        ctxRef.current.lineWidth = lineWidth * pressure * 2;
        ctxRef.current.strokeStyle = lineColor;
        
        /* Draw the Dot at pen down */
        ctxRef.current.lineTo(offsetX , offsetY );
        ctxRef.current.stroke();
        draw({nativeEvent, pressure, pointerType});
        
        
    }
    const finishDrawing = (e) => {
        setIsDrawing(false);      
        ctxRef.current.beginPath(); //cut the previous line

        //add imgae data in to restoreArray to undo
        if(restroreArray.current.length > 50){
            restroreArray.current.shift();
        }

        if(e.type === "pointerup"){
            storeCurrentData();
        }
    }
    
    const draw = ({nativeEvent, pressure, pointerType}) => {
        
        if(!isDrawing) return;
        
        const {offsetX, offsetY} = nativeEvent;
        //detect pressure when you draw
        ctxRef.current.lineWidth = lineWidth * pressure * 2 ;
        
        ctxRef.current.lineTo(offsetX, offsetY);
        ctxRef.current.stroke();
        
        //make it smoother
        ctxRef.current.beginPath();
        ctxRef.current.moveTo(offsetX, offsetY);
           
    }

    function changeColor(id){
        let newColor = "" + id;
        setLineColor(newColor);
        
    }
    function changeLineWidth(newWidth){
        setLineWidth(newWidth);
    }
    
    // add new canvas data to restore array
    function storeCurrentData(){
        restroreArray.current.push(
            ctxRef.current.getImageData(
                0,0,canvasRef.current.width,canvasRef.current.height
        ));
    }

    //Draw the image loaded from server 
    function drawImage(){
        let image = new Image();
        image.src = imageData;
        
        image.onload = () => {
            //draw according to rasio
            ctxRef.current.drawImage(image,0,0,
                canvasRef.current.height * image.width / image.height,
                canvasRef.current.height);
            
            // add new canvas data to restore array
            storeCurrentData();
            
        } 
    }   

    return ( 
        <div className="canvas-block">
            <canvas id="canvas"
                onPointerDown={startDrawing}
                onPointerUp={finishDrawing}
                onPointerOut={finishDrawing}
                onPointerMove={draw}
                ref={canvasRef}
            ></canvas>
            
            <Tools 
                canvasRef={canvasRef}
                ctxRef={ctxRef}
                lineWidth={lineWidth}
                restroreArray={restroreArray}
                changeColor={changeColor}   
                changeLineWidth={changeLineWidth}
                storeCurrentData={storeCurrentData}
            
            ></Tools>
            
        </div>
     );
}
 
export default Canvas;