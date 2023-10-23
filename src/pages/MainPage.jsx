import { Button } from "@mui/material";
import { Fragment } from "react";
import { Link, useNavigate } from "react-router-dom";

export const MainPage = () => {
    const navigate = useNavigate();

    const Logout = () => {
        localStorage.removeItem("groupid");
        navigate("/login");
    }

    return(
        <Fragment>
            <Button
                component={Link}
                to="/login"
                color="primary"
            >
                Login
            </Button>
            <Button onClick={Logout}>
                Logout
            </Button>
        </Fragment>
    );
};