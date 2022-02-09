import { useEffect, useState } from "react";

const useFetch = (folderPath) => {

    const [imageData, setImageData] = useState(null);
    const [isPending, setIsPending] = useState(true);
    
    const fetchData =  () => {
        //To successfully use cors 
        //add cors in express server OR add proxy in react package.json   
        
        fetch("http://localhost:8080/image", {
            method: "POST",
            headers: {
                 "Content-Type": "application/json"
            },
            body: JSON.stringify({url:folderPath}),
        })
        .then(res => {
            if(!res.ok)
                throw Error("Could not fetch data");
            else
                return res.blob(); //turn image to readable blob
        })
        .then(imageBlob => {

            const imageObjectURL = URL.createObjectURL(imageBlob);
            setImageData(imageObjectURL);
            setIsPending(false); 
            
        })
    }
    //automatically fetch once when folderPath change
    useEffect(()=>{
        fetchData();
    },[folderPath]);
    

    return {imageData,isPending,fetchData};
}
export default useFetch;