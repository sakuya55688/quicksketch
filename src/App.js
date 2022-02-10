import './App.css';
import Canvas from './Canvas';
import Setting from './Setting';
import useFetch from './FetchData';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import { useState } from 'react';
//在pakage.json
//"start": "concurrently \"node ./server/uploadImage.js\" \"react-scripts start\"",
function App() {

	
	const [folderPath,setFolderPath] = useState("");
	const [drawingTime, setDrawingTime] = useState(0);
	const {imageData,isPending,fetchData} = useFetch(folderPath);

	//function to change image url
	const startSetting = (url,time) => {
		setFolderPath(url);
		setDrawingTime(time);
	}


  	return (
    <Router>

		<Routes>
			<Route path="/" element={
				<Setting startSetting={startSetting}/>
			}></Route>
			
			<Route path="/Canvas" element={
				<div className="canvas-holder">
        			{!isPending && <Canvas drawingTime={drawingTime} imageData={imageData} fetchData={fetchData}></Canvas>}
      			</div>
			}
			></Route>
		</Routes>

    </Router>
  );
}

export default App;
