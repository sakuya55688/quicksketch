import { useEffect, useRef, useState } from "react";
import "./Countdown.css" ;
import useFetch from './FetchData';


const Countdown = ({MaxTime,drawImage,clearCanvas,fetchData}) => {
    
    const [number, setNumber] = useState(MaxTime);
    let isPause = false;
    const intervalIdRef = useRef(null);

    //countdown timer
    useEffect(()=> {

        // exit and change image when we reach 0
        if(number === 0){
            setTimeout(()=> changeImage(0),800);
            return;
        }
        
        // save intervalId to clear the interval when the component re-renders
        intervalIdRef.current = setInterval(() => {
            setNumber(number - 1);
        }, 800);

        // clear interval on re-render to avoid memory leaks
        return () => clearInterval(intervalIdRef.current);
        
    }, [number]);  // use number as dependency when we update

    const changeImage = () => {
        
        clearCanvas();
        fetchData();
        drawImage();
        setNumber(MaxTime);
        
    }

    const pause = () => {
        if(intervalIdRef.current != null){
            if(isPause === false){
                
                isPause = true;
                clearInterval(intervalIdRef.current);
            }
            else{
                isPause = false;
                setNumber(number-1);
            }

        }
    }

    return ( 
    <div className="countdown-block">
        <div id="pause-btn" className="countdown-btns" onClick={pause}>
            <svg>
                <polygon points="10,5.9 10,34.10 36,20"></polygon>
            </svg>
        </div>
        <div id="countdown-number">{number}</div>
        <div id="forward-btn" className="countdown-btns" onClick={changeImage}>
            <svg>
                <polygon points="7,11.33 7,28.67 22,20"></polygon>
                <polygon points="22,11.33 22,28.67 37,20"></polygon>
            </svg>
        </div>
    </div> 
    
    );
}
 
export default Countdown;