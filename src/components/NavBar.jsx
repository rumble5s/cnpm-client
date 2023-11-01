import { useNavigate } from "react-router-dom";
import "../css/NavBar.css"

export const NavBar = () => {
    const navigate = useNavigate();
    const groupid = JSON.parse(localStorage.getItem('groupid'));
    const isadmin = JSON.parse(localStorage.getItem('isadmin'));
    
    const Login = () => {
        navigate("/login");
    }

    const Logout = () => {
        localStorage.removeItem("isadmin");
        localStorage.removeItem("groupid");
        navigate("/login");
    }

    return(
        <div className="navbar">
            {   groupid || isadmin ? null : <button onClick={Login}> Login </button> }
            {   groupid || isadmin ? <button onClick={Logout}> Logout </button> : null }
        </div>
    );
}