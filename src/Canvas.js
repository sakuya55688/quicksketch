import "./Canvas.css";
import { useState, useEffect, useRef } from "react";


const Canvas = () => {

    const commonColors = ["red","blue","yellow","green","purple"];

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
        canvas.height = 400;
        canvas.width = 800;
        
        const ctx = canvas.getContext('2d');
        
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctxRef.current = ctx;

    }, []);

    // drawing functions
    const startDrawing = ({nativeEvent, pressure, pointerType}) => {
        setIsDrawing(true);
        const {offsetX , offsetY} = nativeEvent;
        
        ctxRef.current.lineWidth = lineWidth * pressure * 2;
        ctxRef.current.strokeStyle = lineColor;
        
        /* Draw the Dot at pen down */
        
        //ctxRef.current.moveTo(offsetX , offsetY);
        //ctxRef.current.stroke();
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
    
    // tool buttons 
    function clearCanvas(){
        ctxRef.current.fillStyle = "white";
        ctxRef.current.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        ctxRef.current.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    
        storeCurrentData(); //clear is also a state 
        
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

        console.log(restroreArray.current);
    }

    // add new canvas data to restore array
    function storeCurrentData(){
        restroreArray.current.push(
            ctxRef.current.getImageData(
                0,0,canvasRef.current.width,canvasRef.current.height
        ));
    }
    
    function changeColor(id){

        let newColor = "" + id;
        setLineColor(newColor);
        
    }
    function changeLineWidth(newWidth){
        setLineWidth(newWidth);
    }

    function uploadImage(e){
        let reader = new FileReader();
        reader.onload = (event) => {
            //open menu to select image
            let img = new Image();
            img.onload = () => {
                //clear canvas before drawing new one
                //clearCanvas();

                //draw according to rasio
                ctxRef.current.drawImage(img,0,0,
                    canvasRef.current.height * img.width / img.height,
                    canvasRef.current.height);
                storeCurrentData();
            }
            img.src = event.target.result;
        }
        reader.readAsDataURL(e.target.files[0]);

    }
    

    return ( 
        <>
            <canvas id="canvas"
                onPointerDown={startDrawing}
                onPointerUp={finishDrawing}
                onPointerOut={finishDrawing}
                onPointerMove={draw}
                ref={canvasRef}
            ></canvas>

            <div className="tool-blocks">
                <input type="file" className="upload" onChange={(e)=> uploadImage(e)}/>
                <button id="undo" className="tool-btn" onClick={undo}>Undo</button>
                <button id="clear" className="tool-btn" onClick={clearCanvas}>Clear</button>
                <div className="color-blocks">
                    {
                    commonColors.map((color)=>(
                        <div className="color-block" id={color} key={color}
                            style={{backgroundColor: "" + color}}
                            onClick={(e) => changeColor(e.target.id)}
                        ></div>
                    ))
                    }
                </div>
                <input type="color" onInput={(e) => changeColor(e.target.value)} className="color-picker" />
               
                <input type="range" onInput={(e) => changeLineWidth(e.target.value)} className="width-bar" 
                    min={1} max={100} step={0.5} value={lineWidth}
                />
                <output className="current-width">{lineWidth}</output>
                
            </div>
            
        </>
     );
}
 
export default Canvas;