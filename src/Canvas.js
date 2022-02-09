import "./Canvas.css";
import Tools from "./Tools";
import Countdown from "./Countdown";
import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";


const Canvas = ({imageData,fetchData}) => {
    //react-dom
    const navigate = useNavigate();

    //varieble for line width and color 
    const [isDrawing, setIsDrawing] = useState(false);
    const [lineWidth, setLineWidth] = useState(5);
    const [lineColor, setLineColor] = useState("black");
    
    //canvas and context refference
    const canvasRef = useRef(null);
    const ctxRef = useRef(null);
    //a circle moving with the mouse
    const cursorRef = useRef(null);

    //variable for undo
    const restroreArray = useRef([]);
    
    
    //initial canvas and context
    useEffect(() => {

        const canvas = canvasRef.current;
        canvas.height = 500;//window.innerHeight/1.25;
        canvas.width = 700;//window.innerWidth/1.25;
        
        const ctx = canvas.getContext('2d');
        //set white background
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctxRef.current = ctx;
        
        //initial cursor
        cursorRef.current = document.querySelector(".canvas-cursor");
        
        fetchData();
        drawImage();

        //keydown listener
        document.addEventListener("keydown", keyboardDetection);

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
        //store canvas when finish line
        if(e.type === "pointerup"){
            storeCurrentData();
        }
    }
    
    const draw = ({nativeEvent, pressure, pointerType}) => {
        
        const {offsetX, offsetY} = nativeEvent;

        //stop function if cursor haven't initialized 
        if(cursorRef.current === null) return;

        //set the position and radius of the cursor
        cursorRef.current.style.width = lineWidth + "px";
        cursorRef.current.style.height = lineWidth + "px";
        
        let rect = canvasRef.current.getBoundingClientRect();
        cursorRef.current.style.left = offsetX + rect.left + 2 + "px";
        cursorRef.current.style.top = offsetY + rect.top + 3 + "px"
        
        //stop function when not drawing(like just hover)
        if(!isDrawing) return;

        //detect pressure when you draw
        ctxRef.current.lineWidth = lineWidth * pressure * 2;
        
        //draw the line
        ctxRef.current.lineTo(offsetX, offsetY);
        ctxRef.current.stroke();
        
        //make it smoother
        ctxRef.current.beginPath();
        ctxRef.current.moveTo(offsetX, offsetY);
           
    }

//======================function buttons==============================================
    function clearCanvas(){
        ctxRef.current.fillStyle = "white";
        ctxRef.current.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        ctxRef.current.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    
        restroreArray.current = [];
        //storeCurrentData(); //clear is also a state 
    }
    function undo(){
        if(restroreArray.current.length > 1){
    
            restroreArray.current.pop();
            ctxRef.current.putImageData(restroreArray.current[restroreArray.current.length-1], 0, 0);
        }
        else if(restroreArray.current.length === 1){
            restroreArray.current.pop();
            clearCanvas();
        }
    }

    function changeColor(id){
        let newColor = "" + id;
        setLineColor(newColor);
        
    }
    function changeLineWidth(newWidth){
        setLineWidth(newWidth);
    }
    
    // add current canvas data to restore array
    function storeCurrentData(){
        restroreArray.current.push(
            ctxRef.current.getImageData(
                0,0,canvasRef.current.width,canvasRef.current.height
        ));
    }

    //Draw the image loaded from server 
    function drawImage(){

        //make a new
        let image = new Image();
        image.src = imageData;
        
        image.onload = () => {
            //draw according to rasio
            if(image.height > image.width){
                ctxRef.current.drawImage(image,0,0,
                    canvasRef.current.height * image.width / image.height,
                    canvasRef.current.height);
            }
            else{
                ctxRef.current.drawImage(image,0,0,
                    canvasRef.current.width/1.3,
                    canvasRef.current.width/1.3 * image.height / image.width);
            }
            // add new canvas data to restore array
            storeCurrentData();
            
        } 
    }   
    
    //detect certain keydown combination
    const keyboardDetection = useCallback((event)=>{
        //combination == ctrl + r, navigate back to Setting page.
        if(event.keyCode == 82 && event.ctrlKey){
            navigate("/");
        }
        //combination == ctrl + z, undo canvas once
        if(event.keyCode == 90 && event.ctrlKey){
            undo();
        }
            
    },[]);
    

    return ( 
        <div className="wrapper">
            <div className="canvas-block">
                <div className="canvas-cursor"></div>
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
                    clearCanvas={clearCanvas}
                    undo={undo}
                    changeColor={changeColor}   
                    changeLineWidth={changeLineWidth}

                ></Tools>
            </div>
            <Countdown 
                MaxTime = {120}
                drawImage={drawImage} 
                clearCanvas={clearCanvas} 
                fetchData={fetchData}
            ></Countdown>
        </div>
     );
}
 
export default Canvas;