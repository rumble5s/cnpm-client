import React, { useEffect } from "react";
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

//Table
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { DepartmentData } from "../components/DepartmentData";

export const Department = () => {
  const BASE_URL = "http://localhost:8000";
  const [rooms, setRooms] = useState([{}]);
  const [auth, setAuth] = useState("");

  useEffect(() => {
    const auth = JSON.parse(localStorage.getItem("isadmin")).isadmin;
    setAuth(auth);
    const fetchData = async () => {
      try {
        const response = await axios({
          method: "POST",
          url: BASE_URL + "/admin_get_rooms/",
          data: {
            auth: auth,
          },
        });

        if (response.data.error) {
          alert(response.data.error);
        } else {
          console.log(response.data.rooms);
          setRooms(response.data.rooms);
        }
      } catch (error) {
        alert("Department Error");
      }
    };
    fetchData();
  }, []);

  const index = 0;

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
                className="link-secondary sidebar-link current-site"
                to="/department"
              >
                <FaBuilding className="icon-sidebar" />
                Danh sách căn hộ
              </Link>
            </li>

            <li className="sidebar-item">
              <Link className="link-secondary sidebar-link">
                <MdOutlineFamilyRestroom className="icon-sidebar" />
                Hộ gia đình
              </Link>
            </li>
            <li className="sidebar-item">
              <Link className="link-secondary sidebar-link">
                <MdOutlineCreditCard className="icon-sidebar" />
                Thông tin thu phí
              </Link>
            </li>
            <li className="sidebar-item">
              <Link className="link-secondary sidebar-link">
                <RiComputerFill className="icon-sidebar" />
                Danh sách đăng ký
              </Link>
            </li>
            <li className="sidebar-item">
              <Link className="link-secondary sidebar-link">
                <RiMotorbikeFill className="icon-sidebar" />
                Phí trông xe
              </Link>
            </li>
          </ul>
        </div>
      </aside>
      <div className="main">
        <main className="content px-3 py-2">
          <h2>
            <strong>Danh sách căn hộ</strong>
            <form class="d-flex">
        <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
        <button class="btn btn-outline-success" type="submit">Search</button>
      </form>
          </h2>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="left">
                    <strong>#</strong>
                  </TableCell>
                  <TableCell align="left">
                    <strong>Số phòng</strong>
                  </TableCell>
                  <TableCell align="left">
                    <strong>Diện tích (m2)</strong>
                  </TableCell>
                  <TableCell align="left">
                    <strong>
                      Giá dịch vụ hàng tháng
                      <br /> (không bao gồm điện, nước)
                    </strong>
                  </TableCell>
                  <TableCell align="right"></TableCell>
                  <TableCell align="left"></TableCell>
                </TableRow>
              </TableHead>
              <TableBody style={{ width: '100%' }}>
                {rooms.map((room, index) => (
                  <TableRow
                    key={room.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align="left">{index + 1}</TableCell>
                    <TableCell align="left">{room.name}</TableCell>
                    <TableCell align="left">{room.area}</TableCell>
                    <TableCell align="left">{room.price}</TableCell>
                    <TableCell align="left">
                    <div>
                      <a>
                        <FaTrashAlt style={{ fontSize: "1.5rem", color: "#E32929"}} className="delete-row"/>
                      </a>
                      <a>
                        <FaEdit style={{ fontSize: "1.5rem", color: "#17a2b8" }}/>
                      </a>
                    </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </main>
        <a href="#" className="theme-toggle">
          <i className="fa-regular fa-moon" />
          <i className="fa-regular fa-sun" />
        </a>
      </div>
    </div>
  );
};
