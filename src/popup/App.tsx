import "./style.css";
import {addPost} from "../db";
import {useState} from "react";
function App()
{   const[val,setVal]=useState("");
    const handleSearch=()=>{
        const username=val.trim();
        if(!username)return;
        window.open(`https://www.instagram.com/${username}/`, "_blank");
    }
    

    
    return(
        
        <div className="parent">
            <h4>Insta Search</h4>
            <h3>Enter instagram profile username</h3>
            <input type="text" value={val} onChange={(event)=>setVal(event.target.value)} placeholder="Enter instagram url"/>
            <button onClick={handleSearch}>Search</button>
            
        </div>
    );
}
export default App;