import "./Setting.css";
import { Link, useNavigate } from "react-router-dom";

const Setting = ({startSetting}) => {
    
    const navigate = useNavigate();

    //handle submit and navigate to the canvas page
    const handleSubmit = (e) => {
        e.preventDefault();

        //get the data from input text
        let url = e.target.folderurl.value;
        //data from range bar
        let time = e.target.maxtime.value;

        startSetting(url,time);
        navigate("/Canvas");
    }

    return ( 
        <div className="setting-block">
            <h2 className="setting-title">Quicksketch</h2>

            <form onSubmit={handleSubmit}>
                <label htmlFor="folder-url">Folder Path</label>
                <input type="text" name="folderurl"/>
                <label htmlFor="maxtime"  >Drawing Time</label>
                <div className="time-range">
                    <input type="range" name="maxtime" list="time-tick" min="15" max="120" step="15"/>
                    <datalist id="time-tick">
                        <option value="15">15</option>
                        <option value="30">30</option>
                        <option value="45">45</option>
                        <option value="60">60</option>
                        <option value="75">75</option>
                        <option value="90">90</option>
                        <option value="105">105</option>
                        <option value="120">120</option>
                    </datalist>
                </div>
                <button type="submit" >START</button>
            </form>
        </div>    
    );
}
 
export default Setting;
