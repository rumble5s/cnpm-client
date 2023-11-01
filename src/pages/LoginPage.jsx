import { useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "../css/LoginForm.css"

export function LoginPage() {
    const BASE_URL = 'http://127.0.0.1:8000';
    const groupid = JSON.parse(localStorage.getItem('groupid'));
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const SignIn = async () => {
        try {
            const response = await axios({
                method: 'POST',
                url: BASE_URL + '/signin/',
                data: {
                    username: username,
                    password: password
                }
            });

            if(response.data.error)
                alert(response.data.error);
            else if(response.data.isadmin) {
                const isadmin = response.data.isadmin;
                localStorage.setItem('isadmin', JSON.stringify({ isadmin }));
                navigate("/admin");
            }
            else {
                const group_id = response.data.group_id;
                localStorage.setItem('groupid', JSON.stringify({ group_id }));
                navigate("/");
            }

        } catch (error) {
            alert("Cant connect to server");
        }
    }

    const SignUp = async () => {
        try {
            const response = await axios({
                method: 'POST',
                url: BASE_URL + '/signup/',
                data: {
                    username: username,
                    password: password,
                    type: "roomate"
                }
            });

            if(response.data.error)
                alert(response.data.error);
            else {
                const group_id = response.data.group_id;
                localStorage.setItem('groupid', JSON.stringify({ group_id }));
                navigate("/");
            }

        } catch (error) {
            alert("Cant connect to server");
        }
    }

    return (
        <>
            {groupid !== null ? null :
                <div className="Loginform">
                    <input className="username" type="text" value={username} onChange={(e) => setUsername(e.target.value)} /><br></br>
                    <input className="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} /><br></br>

                    <button className="SignIn" onClick={SignIn}>Login</button>
                    <button className="SignUp" onClick={SignUp}>Signup</button>

                </div>
            }
        </>
    )
}