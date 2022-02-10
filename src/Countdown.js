import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Countdown.css" ;
import useFetch from './FetchData';


const Countdown = ({MaxTime,drawImage,clearCanvas,fetchData}) => {
    
    const [number, setNumber] = useState(MaxTime);
    const intervalIdRef = useRef(null);
    const animeCircleRef = useRef(null);
    
    const navigate = useNavigate();
    
    let isPause = false;
    let initialOffset = 120;

    
    

    useEffect(()=>{
        animeCircleRef.current =  document.querySelector(".animation-circle");
        animeCircleRef.current.style["stroke-dashoffset"] = initialOffset - (initialOffset * number / MaxTime );
    }, [])

    //countdown timer
    useEffect(()=> {

        // exit and change image when we reach 0
        if(number === 0){
            setTimeout(()=> nextImage(),800);
            return;
        }
        
        // save intervalId to clear the interval when the component re-renders
        intervalIdRef.current = setInterval(() => {
            setNumber(number - 1);
        }, 800);

        animeCircleRef.current.style["stroke-dashoffset"] = initialOffset - (initialOffset * (number/MaxTime));
        

        // clear interval on re-render to avoid memory leaks
        return () => clearInterval(intervalIdRef.current);
        
    }, [number]);  // use number as dependency when we update

    const nextImage = () => {
        
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

    const reset = () => {
        clearCanvas();
        navigate("/");
    }

    const computeCircle = () => {

    }

    return ( 
    <div className="countdown-block">
        <div id="reset-btn" className="countdown-btns" onClick={reset}>
            <svg>
                <polygon points="10,10 10,30 30,30 30,10 "></polygon>
            </svg>
        </div>
        <div id="pause-btn" className="countdown-btns" onClick={pause}>
            <svg>
                <polygon points="10,5.9 10,34.10 36,20"></polygon>
            </svg>
        </div>
        <div className="countdown-number">
            <p>{number}</p>
            <svg>
                <circle className="animation-circle" r="19" cx="20" cy="20" ></circle>
            </svg>
            
        </div>
        <div id="forward-btn" className="countdown-btns" onClick={nextImage}>
            <svg>
                <polygon points="7,11.33 7,28.67 22,20"></polygon>
                <polygon points="22,11.33 22,28.67 37,20"></polygon>
            </svg>
        </div>
        
    </div> 
    
    );
}
 
export default Countdown;