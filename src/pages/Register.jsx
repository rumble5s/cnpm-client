import { React, useEffect } from "react";
import axios from "axios";
import { ReactDOM } from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/Admin.css";

import { FaHome } from "react-icons/fa";
import { MdOutlineFamilyRestroom } from "react-icons/md";
import { FaBuilding } from "react-icons/fa6";
import { MdOutlineCreditCard } from "react-icons/md";
import { RiComputerFill } from "react-icons/ri";
import { RiMotorbikeFill } from "react-icons/ri";
import { FaTrashAlt } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";

export const Register = () => {
//   const BASE_URL = "http://localhost:8000";
//   const [rooms, setRooms] = useState([{}]);
//   const [auth, setAuth] = useState("");

//   useEffect(() => {
//     const auth = JSON.parse(localStorage.getItem("isadmin")).isadmin;
//     setAuth(auth);
//     const fetchData = async () => {
//       try {
//         const response = await axios({
//           method: "POST",
//           url: BASE_URL + "/admin_get_rooms/",
//           data: {
//             auth: auth,
//           },
//         });

//         if (response.data.error) {
//           alert(response.data.error);
//         } else {
//           console.log(response.data.rooms);
//           setRooms(response.data.rooms);
//         }
//       } catch (error) {
//         alert("Department Error");
//       }
//     };
//     fetchData();
//   }, []);

//   const index = 0;

  return (
    <div className="wrapper">
      <aside id="sidebar" className="js-sidebar">
        {/* Content For Sidebar */}
        <div className="h-100">
          <div className="sidebar-logo">
            <a className="text-center" to="/admin">
              Admin
            </a>
          </div>
          <ul className="sidebar-nav">
            <li className="sidebar-item">
              <Link className="link-secondary sidebar-link" to="/admin">
                <FaHome className="icon-sidebar" />
                Trang chủ
              </Link>
            </li>
            <li className="sidebar-item">
              <Link
                className="link-secondary sidebar-link"
                to="/department"
              >
                <FaBuilding className="icon-sidebar" />
                Danh sách căn hộ
              </Link>
            </li>

            <li className="sidebar-item">
              <Link className="link-secondary sidebar-link" to="/room">
                <MdOutlineFamilyRestroom className="icon-sidebar" />
                Hộ gia đình
              </Link>
            </li>
            <li className="sidebar-item">
              <Link className="link-secondary sidebar-link" to="/bill">
                <MdOutlineCreditCard className="icon-sidebar" />
                Thông tin thu phí
              </Link>
            </li>
            <li className="sidebar-item">
              <Link className="link-secondary sidebar-link current-site" to ="/register">
                <RiComputerFill className="icon-sidebar" />
                Danh sách đăng ký
              </Link>
            </li>
            <li className="sidebar-item">
              <Link className="link-secondary sidebar-link" to="/parking">
                <RiMotorbikeFill className="icon-sidebar" />
                Phí trông xe
              </Link>
            </li>
          </ul>
        </div>
      </aside>
      <div className="main">
      </div>
    </div>
  );
};
