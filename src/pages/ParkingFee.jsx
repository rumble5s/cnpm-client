import { useEffect } from "react";
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
import { FaBicycle } from "react-icons/fa6";
import { FaCar } from "react-icons/fa";

//Table
import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData(1, "Xe đạp", "30k"),
  createData(2, "Xe máy", "100k"),
  createData(3, "Ô tô", "200k"),
];

export const ParkingFee = () => {
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
              <Link className="link-secondary sidebar-link" to="/department">
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
              <Link className="link-secondary sidebar-link" to="/register">
                <RiComputerFill className="icon-sidebar" />
                Danh sách đăng ký
              </Link>
            </li>
            <li className="sidebar-item">
              <Link
                className="link-secondary sidebar-link current-site"
                to="/parking"
              >
                <RiMotorbikeFill className="icon-sidebar" />
                Phí trông xe
              </Link>
            </li>
          </ul>
        </div>
      </aside>
      <div className="main">
        <main className="content px-3 py-4 pb-4">
          <h1>
            <strong>Giá gửi xe(theo tháng)</strong>
          </h1>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>#</StyledTableCell>
                  <StyledTableCell align="left">Loại</StyledTableCell>
                  <StyledTableCell align="left">Giá</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <StyledTableRow key={row.name}>
                    <StyledTableCell component="th" scope="row">
                      {row.name}
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      {row.calories}
                    </StyledTableCell>
                    <StyledTableCell align="left">{row.fat}</StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </main>
        <main className="content px-3 py-2">
          <div className="container-fluid">
            <div className="container text-center">
              <div class="row">
                <div class="col-xl-4 col-md-6 mb-4">
                  <div class="card border-left-primary shadow h-100 py-2">
                    <div class="card-body">
                      <div class="row no-gutters align-items-center">
                        <div class="col mr-2">
                          <div class="text-xs font-weight-bold text-primary text-uppercase mb-1">
                            <strong>Xe đạp</strong>
                          </div>
                          <div class="h2 mb-0 font-weight-bold text-gray-800">
                            40
                          </div>
                        </div>
                        <div class="col-auto">
                          <FaBicycle color='#1B68B1' size={70}/>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-xl-4 col-md-6 mb-4">
                  <div class="card border-left-success shadow h-100 py-2">
                    <div class="card-body">
                      <div class="row no-gutters align-items-center">
                        <div class="col mr-2">
                          <div class="text-xs font-weight-bold text-primary text-uppercase mb-1">
                            <strong>Xe máy</strong>
                          </div>
                          <div class="h2 mb-0 font-weight-bold text-gray-800">
                            40
                          </div>
                        </div>
                        <div class="col-auto">
                          <RiMotorbikeFill color='#1cc88a' size={70}/>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-xl-4 col-md-6 mb-4">
                  <div class="card border-left-warning shadow h-100 py-2">
                    <div class="card-body">
                      <div class="row no-gutters align-items-center">
                        <div class="col mr-2">
                          <div class="text-xs font-weight-bold text-primary text-uppercase mb-1">
                            <strong>Ô tô</strong>
                          </div>
                          <div class="h2 mb-0 font-weight-bold text-gray-800">
                            40
                          </div>
                        </div>
                        <div class="col-auto">
                          <FaCar color='#f6c23e' size={70}/>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};
