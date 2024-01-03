import { useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/LoginForm.css'
import '../css/Admin.css';

import { HiOutlineKey } from 'react-icons/hi2'
import { AiOutlineUser } from 'react-icons/ai'

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
                navigate("/user");
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

    const handleSubmit = (e) => {
        e.preventDefault();
        SignIn();
    }

    return (
        <div className='bg'>
            <div className="Auth-form-container">
                <div className='support-layout'>
                    <h6 className='support-title'>Nếu cần hỗ trợ kỹ thuật, vui lòng thực hiện một trong các cách sau: </h6>
                    <ol className='support-content'>
                        <li>Gửi mail cho phòng kỹ thuật <strong style={{ color: 'red' }}>phongkythuat@gmail.com</strong></li>
                        <li>Gọi số Hotline của phòng kỹ thuật <strong style={{ color: 'red' }}>012345678</strong></li>
                    </ol>
                </div>
                <br />
                <form className="Auth-form" onSubmit={handleSubmit}>
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
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="d-grid gap-2 mt-3">
                            <button type="submit" className="btn btn-primary">
                                Đăng nhập
                            </button>
                            <button type="button" className="btn btn-outline-primary" data-bs-toggle="modal" data-bs-target="#signUp">Đăng ký</button>
                        </div>
                        <div className="modal fade" id="signUp" aria-labelledby="signUp" aria-hidden="true" tabIndex={-1} role="dialog">
                            <div className="modal-dialog modal-lg">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title" id="exampleModalLabel"><strong>Đăng ký tài khoản</strong> </h5>
                                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div className="modal-body">
                                        <form onSubmit={SignUp}>
                                            <div className="form-group mt-3">
                                                <div className="col-xs-2">
                                                    <label>Tài khoản</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        placeholder="user01@gmail.com"
                                                        // onChange={(e) => setName(e.target.value)}
                                                    />
                                                </div>
                                                <div className="col-xs-3">
                                                    <label>Mật khẩu</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        placeholder="123456"
                                                        // onChange={(e) => setArea(e.target.value)}
                                                    />
                                                </div>
                                                {/* <div className="col-xs-4">
                                                    <label>Giá dịch vụ hàng tháng <br /> (không bao gồm điện, nước)</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        placeholder="250000"
                                                        onChange={(e) => setPrice(e.target.value)}
                                                    />
                                                </div> */}
                                            </div>
                                            <div className="modal-footer">
                                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" style={{ backgroundColor: "red" }}>Hủy</button>
                                                <button type="submit" className="btn btn-primary" data-bs-dismiss="modal" style={{ backgroundColor: "green" }}> Xác nhận </button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
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