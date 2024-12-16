import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

export default function Master({isLogin, userRole}){
    return(
        <div className="d-flex flex-column flex-lg-row">
            <Navbar isLogin={isLogin} userRole={userRole}/>
            <div className="content-area">
            <Outlet/> 
            </div>
        </div>
)
}
