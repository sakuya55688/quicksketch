import { useEffect, useState } from "react";

const useFetch = () => {

    const [imageData, setImageData] = useState(null);
    const [isPending, setIsPending] = useState(true);

    useEffect(() => {
        //To successfully use cors 
        //add cors in express server OR add proxy in react package.json
        fetch("http://localhost:8080/image", {

            method: "get",
            headers: {
                 "Content-Type": "image/jpeg"
            },
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
            
            /*
            let image = new Image();
            image.src = imageObjectURL;
            document.body.appendChild(image);
            console.log(imageBlob);
            */
        })
    

    }, []);

    return {imageData,isPending};
}
export default useFetch;