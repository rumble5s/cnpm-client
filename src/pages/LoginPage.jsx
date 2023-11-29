import { useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/LoginForm.css'

import { HiOutlineKey } from 'react-icons/hi2'
import { AiOutlineUser } from 'react-icons/ai'

import LayoutImage from '../img/japan-vintage.jpg'
var sectionStyle = {
    backgroundImage: `url(${LayoutImage})`,
    height: `100vh`,
    
}

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
        <div className='bg'>
            <div className="Auth-form-container">
                <div className='support-layout py-2'>
                    <h6 className='support-title'>Nếu cần hỗ trợ kỹ thuật, vui lòng thực hiện một trong các cách sau: </h6>
                    <ol className='support-content mr-1 max-w-none space-y-1 text-black list-decimal list-inside dark:text-gray-400 px-2 py-2'>
                        <li>Gửi mail cho phòng kỹ thuật <strong style={{ color: 'red' }}>phongkythuat@gmail.com</strong></li>
                        <li>Gọi số Hotline của phòng kỹ thuật <strong style={{ color: 'red' }}>012345678</strong></li>
                    </ol>
                </div>
                <br />
                <form className="Auth-form">
                    <div className="Auth-form-content">
                        <h3 className="Auth-form-title">Đăng Nhập</h3>
                        <div className="form-group mt-3">
                            <label>Tài khoản</label>

                            <div className='input-group mb-3'>
                                <div className='input-group-prepend'>
                                    <span className='input-group-text'>
                                        <AiOutlineUser size={28} />
                                    </span>
                                </div>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Nhập tên tài khoản"
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="form-group mt-3">
                            <label>Mật khẩu</label>

                            <div className="input-group mb-3">
                                <div className="input-group-prepend">
                                    <span className="input-group-text"> <HiOutlineKey size={28} /> </span>
                                </div>

                                <input
                                    type="password"
                                    className="form-control"
                                    placeholder="Nhập mật khẩu"
                                />
                            </div>
                        </div>
                        <div className="d-grid gap-2 mt-3">
                            <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                                Đăng nhập
                            </button>
                        </div>
                        {/* <p className="forgot-password text-right mt-2">
                        Forgot <a href="#">password?</a>
                    </p> */}
                    </div>
                </form>
            </div>
        </div>
    );
}