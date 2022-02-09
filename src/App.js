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
	
	const {imageData,isPending,fetchData} = useFetch(folderPath);

	//function to change image url
	const changeFolderPath = (url) => {
		setFolderPath(url);
	}


  	return (
    <Router>

		<Routes>
			<Route path="/" element={
				<Setting changeFolderPath={changeFolderPath}/>
			}></Route>
			
			<Route path="/Canvas" element={
				<div className="canvas-holder">
        			{!isPending && <Canvas imageData={imageData} fetchData={fetchData}></Canvas>}
      			</div>
			}
			></Route>
		</Routes>

    </Router>
  );
}

export default App;
