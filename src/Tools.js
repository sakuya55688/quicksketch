import "./Tools.css";

const Tools = ({
    canvasRef,ctxRef,lineWidth,restroreArray,
    clearCanvas,changeColor,changeLineWidth
}) => {

    const commonColors = ["red","blue","yellow","black","white"];

    
    //undo Button
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
    
    //upload button for reference
    //Image drew from upload 
    /*
    function uploadImage(e){
        //open menu to select image
        let reader = new FileReader(); 
        reader.onload = (event) => {
            
            let img = new Image();
            img.src = event.target.result;
            img.onload = () => {
                //draw according to rasio
                ctxRef.current.drawImage(img,0,0,
                    canvasRef.current.height * img.width / img.height,
                    canvasRef.current.height);
                storeCurrentData();
            }  
        }
        reader.readAsDataURL(e.target.files[0]);
    }
    */

    return ( 
        <div className="tool-blocks">
            <button id="clear" className="tool-btn" onClick={clearCanvas}>Clear</button>
            <button id="undo" className="tool-btn" onClick={undo}>Undo</button>
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
                min={1} max={40} step={0.1} value={lineWidth}
            />
            <output className="current-width">{lineWidth}</output>
            
        </div>
     );
}
 
export default Tools;