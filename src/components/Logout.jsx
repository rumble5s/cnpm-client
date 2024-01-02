import { useNavigate } from "react-router-dom";
import "../css/Logout.css"
import { CiLogout } from "react-icons/ci";

export const Logout = () => {
    const navigate = useNavigate();
    const groupid = JSON.parse(localStorage.getItem('groupid'));
    const isadmin = JSON.parse(localStorage.getItem('isadmin'));

    const logout = () => {
        localStorage.removeItem("isadmin");
        localStorage.removeItem("groupid");
        navigate("/login");
    }

    return(
        <button type="button" className="btn btn-success rounded-pill logoutLblPos" style={{backgroundColor:"red"}} onClick={() => logout()}>
            <strong>Đăng xuất </strong>
            <CiLogout
              style={{
                fontSize: "1.25rem",
                color: "white",
              }}
            />
          </button>
    );
}