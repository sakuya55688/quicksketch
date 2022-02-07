import "./Setting.css";

import { Link } from "react-router-dom";


const Setting = ({changeFolderPath}) => {
    
    
    return ( 
        <div className="setting-block">
            <form action="#">
                <label htmlFor="folder-url">Folder Path</label>
                <input type="text" id="folder-url"/>
                <input type="range" />
                <Link to="Canvas">
                    <input type="submit" />
                </Link>
            </form>
        </div>    
    );
}
 
export default Setting;
