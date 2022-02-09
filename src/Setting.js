import "./Setting.css";
import { Link, useNavigate } from "react-router-dom";

const Setting = ({changeFolderPath}) => {
    
    const navigate = useNavigate();

    //handle submit and navigate to the canvas page
    const handleSubmit = (e) => {
        e.preventDefault();

        //get the data from input text
        let url = e.target.folderurl.value;
        console.log(url);
        
        //check whether the url is empty
        if(url+"" != ""){
            changeFolderPath(url);
        }
        navigate("/Canvas");
    }

    return ( 
        <div className="setting-block">
            <h2 className="setting-title">Quicksketch</h2>

            <form onSubmit={handleSubmit}>
                <label htmlFor="folder-url">Folder Path</label>
                <input type="text" name="folderurl"/>
                <label htmlFor="max-time">Counter Time</label>
                <input type="range" name="max-time"/>

                <button type="submit" >START</button>
            </form>
        </div>    
    );
}
 
export default Setting;
