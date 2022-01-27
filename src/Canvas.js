import "./Canvas.css";
import { useState } from "react";

const Canvas = () => {
    
    window.addEventListener("load", function(){
        const canvas = document.querySelector("#canvas");
        const ctx = canvas.getContext('2d');
        
        canvas.height = 400;
        canvas.width = 800;
        
        let painting = false;
        let lineWidth = 1.7;
        let mouse = {x: 0, y: 0};

        function startPosition(e){
            painting = true;

            /* Making Dot Possible */
            ctx.lineTo(e.pageX - this.offsetLeft -1, e.pageY - this.offsetTop -1);
            ctx.stroke();
            draw(e);
        }
        function finishedPosition(e){
            painting = false;
            ctx.beginPath();
        }
        function changeCursor(){
            canvas.style.cursor = "crosshair";
        }

        function draw(e){
            if(!painting) return;
            ctx.lineWidth = lineWidth;
            ctx.lineCap = "round";

            //ctx.lineTo(e.clientX, e.clientX);
            ctx.lineTo(e.pageX - this.offsetLeft, e.pageY - this.offsetTop);
            ctx.stroke();

            ctx.beginPath();
            ctx.lineTo(e.pageX - this.offsetLeft, e.pageY - this.offsetTop);
        }


        canvas.addEventListener("pointerdown", startPosition);
        canvas.addEventListener("pointerup", finishedPosition);
        canvas.addEventListener("pointermove", draw);
        canvas.addEventListener("pointerover", changeCursor);
    });
    
    
    
    

    return ( 
        <>
            <canvas id="canvas"></canvas>

            <div className="color-blocks">

            </div>
        </>
     );
}
 
export default Canvas;