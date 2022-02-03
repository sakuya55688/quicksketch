import './App.css';
import Canvas from './Canvas';
import useFetch from './FetchData';


function App() {

  let {imageData,isPending} = useFetch();
  
  return (
    <div>
      <div className="canvas-holder">
        {!isPending && <Canvas imageData={imageData}></Canvas>}
      </div>
      <div className="counter-block"></div>
    </div>
  );
}

export default App;
