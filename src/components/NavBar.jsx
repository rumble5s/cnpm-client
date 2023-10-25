import { useNavigate } from "react-router-dom";
import "../css/NavBar.css"

export const NavBar = () => {
    const navigate = useNavigate();
    const groupid = JSON.parse(localStorage.getItem('groupid'));
    
    const Login = () => {
        navigate("/login");
    }

    const Logout = () => {
        localStorage.removeItem("groupid");
        navigate("/login");
    }

    return(
        <div className="navbar">
            {   groupid ? null : <button onClick={Login}> Login </button> }
            {   groupid ? <button onClick={Logout}> Logout </button> : null }
        </div>
    );
}