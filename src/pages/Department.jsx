import React from "react";
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
  return (
    <div className="wrapper">
      <aside id="sidebar" className="js-sidebar">
        {/* Content For Sidebar */}
        <div className="h-100">
          <div className="sidebar-logo">
            <a className="text-center" href="#">
              Admin
            </a>
          </div>
          <ul className="sidebar-nav">
            <li className="sidebar-item">
              <Link className="sidebar-link" to="/admin">               
                  <FaHome className="icon-sidebar" />
                  Trang chủ                
              </Link>
            </li>
            <li className="sidebar-item">
              <Link className="sidebar-link" to="/department">               
                <button className="btn btn-light current-site">
                <FaBuilding className="icon-sidebar" />
                    Danh sách căn hộ
                </button>
              </Link>
            </li>

            <li className="sidebar-item">
              <a href="#" className="sidebar-link">
                <MdOutlineFamilyRestroom className="icon-sidebar" />
                Hộ gia đình
              </a>
            </li>
            <li className="sidebar-item">
              <a href="#" className="sidebar-link">
                <MdOutlineCreditCard className="icon-sidebar" />
                Thông tin thu phí
              </a>
            </li>
            <li className="sidebar-item">
              <a href="#" className="sidebar-link">
                <RiComputerFill className="icon-sidebar" />
                Danh sách đăng ký
              </a>
            </li>
            <li className="sidebar-item">
              <a href="#" className="sidebar-link">
                <RiMotorbikeFill className="icon-sidebar" />
                Phí trông xe
              </a>
            </li>
          </ul>
        </div>
      </aside>
      <div className="main">
        <main className="content px-3 py-2">
          <h2>
            <strong>Danh sách căn hộ</strong>
          </h2>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="left">auth</TableCell>
                  <TableCell align="left">group_id</TableCell>
                  <TableCell align="left">name</TableCell>
                  <TableCell align="left">type</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {DepartmentData.map((row) => (
                  <TableRow
                    key={row.name}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align="left">{row.auth}</TableCell>
                    <TableCell align="left">{row.group_id}</TableCell>
                    <TableCell align="left">{row.name}</TableCell>
                    <TableCell align="left">{row.type}</TableCell>
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
