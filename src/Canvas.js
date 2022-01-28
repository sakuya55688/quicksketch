import "./Canvas.css";
import { useState, useEffect, useRef } from "react";

const Canvas = () => {

    const commonColors = ["red","blue","yellow","green","purple"];

    const [isDrawing, setIsDrawing] = useState(false);
    const [lineWidth, setLineWidth] = useState(1.7);
    const [lineColor, setLineColor] = useState("black");

    const canvasRef = useRef(null);
    const ctxRef = useRef(null);

    //initial canvas and context
    useEffect(() => {

        const canvas = canvasRef.current;
        canvas.height = 400;
        canvas.width = 800;
        
        const ctx = canvas.getContext('2d');
        
        ctx.lineCap = "round";
        ctxRef.current = ctx;

    }, []);


    
    const startDrawing = ({nativeEvent, pressure}) => {
        setIsDrawing(true);
        const {offsetX , offsetY} = nativeEvent;
        /* Draw the Dot Possible */
        ctxRef.current.lineWidth = lineWidth * pressure * 4.5;
        ctxRef.current.strokeStyle = lineColor;

        ctxRef.current.lineTo(offsetX , offsetY);
        ctxRef.current.stroke();
        draw({nativeEvent});

        //console.log(pressure * 8)
        
    }
    const finishDrawing = (e) => {
        setIsDrawing(false);
        ctxRef.current.beginPath();
    }
    function changeCursor(){
        canvasRef.current.style.cursor = "crosshair";
    }
    const draw = ({nativeEvent,pressure}) => {
        
        if(!isDrawing) return;
        
        const {offsetX, offsetY} = nativeEvent;
        ctxRef.current.lineWidth = lineWidth * pressure * 5;

        ctxRef.current.lineTo(offsetX, offsetY);
        ctxRef.current.stroke();

        ctxRef.current.beginPath();
        ctxRef.current.lineTo(offsetX, offsetY);

        console.log(lineColor);
    }

    
    function changeColor(value){
        let newColor = "" + value;
        setLineColor(newColor);
        
    }
    function changeLineWidth(newWidth){
        setLineWidth(newWidth);
    }

    return ( 
        <>
            <canvas id="canvas"
                onPointerDown={(e) => startDrawing(e)}
                onPointerUp={finishDrawing}
                onPointerMove={draw}
                ref={canvasRef}
            ></canvas>

            <div className="function-blocks">
                <button className="undo-btn">Undo</button>
                <button className="clear-btn">Clear</button>
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
                <input type="range" onInput={(e) => changeLineWidth(e.target.value)} className="line-width" />
            </div>
        </>
     );
}
 
export default Canvas;