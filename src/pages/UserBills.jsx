import { useEffect } from "react";
import axios from "axios";
import { ReactDOM } from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/User.css";

import { Logout } from '../components/Logout.jsx';

import { FaHome } from "react-icons/fa";
import { MdOutlineFamilyRestroom } from "react-icons/md";
import { FaBuilding } from "react-icons/fa6";
import { MdOutlineCreditCard } from "react-icons/md";
import { RiComputerFill } from "react-icons/ri";
import { RiMotorbikeFill } from "react-icons/ri";
import { FaTrashAlt } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { TiPinOutline } from "react-icons/ti";

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
  '&:last-child td, &:last-child th': {
    border: 20,
  },
}));

function formatDate(date) {
  const d = new Date(date);
  const day = d.getDate().toString().padStart(2, '0');
  const month = (d.getMonth() + 1).toString().padStart(2, '0');
  const year = d.getFullYear();
  return `${day}/${month}/${year}`;
}

export const UserBills = () => {
  const BASE_URL = "http://localhost:8000";
  const [bills, setBills] = useState([]);
  const [groupid, setGroupid] = useState("");

  const [roomid, setRoomid] = useState("");
  const [roomname, setRoomname] = useState("");

  const [filterMonth, setFilterMonth] = useState('');
  const [filterYear, setFilterYear] = useState('');

  useEffect(() => {
    const gid = JSON.parse(localStorage.getItem("groupid")).group_id;
    setGroupid(gid);
    const fetchData = async () => {
      try {
        console.log(gid);
        const response = await axios({
          method: "POST",
          url: BASE_URL + "/get_bills/",
          data: {
            group_id: gid,
          }
        });

        if (response.data.error) {
          alert(response.data.error);
        } else {
          console.log(response.data.bills);
          setBills(response.data.bills);
        }
      } catch (error) {
        alert("User Room List View Error");
      }
    };
    fetchData();
  }, []);

  useEffect(() => {

  }, [filterMonth, filterYear]);

  const updateRoomState = (id, name) => {
    setRoomid(id);
    setRoomname(name);
  };

  const submitAddRegister = (e) => {
    const submit = async () => {
      try {
        const response = await axios({
          method: "POST",
          url: BASE_URL + "/make_a_register/",
          data: {
            group_id: groupid,
            room_id: roomid,
            request: "hire"
          }
        });
        console.log(response.data);
      } catch (error) {
        alert("Add Room Register Failed!");
      }
    }
    submit();
    setRoomDummy(roomDummy ^ 1);
    setRoomRegisterDummy(roomRegisterDummy ^ 1);
  };

  const filt = (day) => {
    const y = filterYear === '' ? true : parseInt(filterYear) === parseInt(day.substring(0, 4));
    const m = filterMonth === '' ? true : parseInt(filterMonth) === parseInt(day.substring(5, 7));
    return y & m;
  }

  return (
    <div className="wrapper">
      <aside id="sidebar" className="js-sidebar user">
        {/* Content For Sidebar */}
        <Logout/>
        <div className="h-100">
          <div className="sidebar-logo">
            <a className="text-black" to="/user">
              Landmark 90
            </a>
          </div>
          <ul className="sidebar-nav">
            <li className="sidebar-item">
              <Link className="link-dark sidebar-link" to="/user">
                <FaHome className="icon-sidebar" />
                Trang chủ
              </Link>
            </li>
            <li className="sidebar-item">
              <Link className="link-dark sidebar-link" to="/udepartment">
                <FaBuilding className="icon-sidebar" />
                Danh sách căn hộ
              </Link>
            </li>

            <li className="sidebar-item">
              <Link className="link-dark sidebar-link" to="/family">
                <MdOutlineFamilyRestroom className="icon-sidebar" />
                Hộ gia đình
              </Link>
            </li>
            <li className="sidebar-item">
              <Link className="link-dark sidebar-link current-site" to="/userbills">
                <MdOutlineCreditCard className="icon-sidebar" />
                Hóa đơn
              </Link>
            </li>
          </ul>
        </div>
      </aside>
      <div className="main">
        <main className="content px-3 py-4 pb-4">
          <h1>
            <strong>Danh sách hóa đơn</strong>
            <form className="d-flex">
              <input
                className="form-control me-2"
                type="text"
                placeholder="Tìm kiếm theo năm🔎"
                aria-label="Search"
                onChange={(e) => setFilterYear(e.target.value)}
              />
              <input
                className="form-control me-2"
                type="text"
                placeholder="Tìm kiếm theo tháng🔎"
                aria-label="Search"
                onChange={(e) => setFilterMonth(e.target.value)}
              />
              {' '}
              <FaSearch size={35} />
            </form>
          </h1>

          <TableContainer component={Paper}>
            <Table
              sx={{ minWidth: 650 }}
              size="small"
              aria-label="a dense table"
            >
              <TableHead>
                <StyledTableRow>
                  <StyledTableCell
                    align="left"
                    style={{ fontSize: "0.9rem", padding: "10px" }}
                  >
                    <strong>#</strong>
                  </StyledTableCell>
                  <StyledTableCell
                    align="left"
                    style={{ fontSize: "0.9rem", padding: "10px" }}
                  >
                    <strong>Ngày tạo đơn</strong>
                  </StyledTableCell>
                  <StyledTableCell
                    align="left"
                    style={{ fontSize: "0.9rem", padding: "10px" }}
                  >
                    <strong>Tiền dịch vụ hàng tháng
                      <br /> (không bao gồm điện, nước)</strong>
                  </StyledTableCell>
                  <StyledTableCell
                    align="left"
                    style={{ fontSize: "0.9rem", padding: "10px" }}
                  >
                    <strong>
                      Tiền điện
                    </strong>
                  </StyledTableCell>
                  <StyledTableCell
                    align="left"
                    style={{ fontSize: "0.9rem", padding: "10px" }}
                  >
                    <strong>
                      Tiền nước
                    </strong>
                  </StyledTableCell>
                  <StyledTableCell
                    align="left"
                    style={{ fontSize: "0.9rem", padding: "10px" }}
                  >
                    <strong>
                      Tổng tiền dịch vụ
                    </strong>
                  </StyledTableCell>
                  <StyledTableCell
                    align="left"
                    style={{ fontSize: "0.9rem", padding: "10px" }}
                  >
                    <strong>
                      Tiền quyên góp
                    </strong>
                  </StyledTableCell>
                  <StyledTableCell
                    align="left"
                    style={{ fontSize: "0.9rem", padding: "10px" }}
                  >
                    <strong>
                      Trạng thái
                    </strong>
                  </StyledTableCell>
                  <StyledTableCell align="right"></StyledTableCell>
                  <StyledTableCell align="left"></StyledTableCell>
                </StyledTableRow>
              </TableHead>
              <TableBody style={{ width: "100%" }}>
                {bills.filter((bill) => filt(bill.create_at)).map((bill, index) => (
                  <StyledTableRow
                    key={bill.id}
                    style={{ fontSize: "1rem", padding: "10px" }}
                  >
                    <StyledTableCell
                      align="left"
                      style={{ fontSize: "0.9rem", padding: "10px" }}
                    >
                      {index + 1}
                    </StyledTableCell>
                    <StyledTableCell
                      align="left"
                      style={{ fontSize: "0.9rem", padding: "10px" }}
                    >
                      {formatDate(bill.create_at)}
                    </StyledTableCell>
                    <StyledTableCell
                      align="left"
                      style={{ fontSize: "0.9rem", padding: "10px" }}
                    >
                      {bill.room_bill}
                    </StyledTableCell>
                    <StyledTableCell
                      align="left"
                      style={{ fontSize: "0.9rem", padding: "10px" }}
                    >
                      {bill.electric_bill}
                    </StyledTableCell>
                    <StyledTableCell
                      align="left"
                      style={{ fontSize: "0.9rem", padding: "10px" }}
                    >
                      {bill.water_bill}
                    </StyledTableCell>
                    <StyledTableCell
                      align="left"
                      style={{ fontSize: "0.9rem", padding: "10px" }}
                    >
                      {parseFloat(bill.room_bill) + parseFloat(bill.electric_bill) + parseFloat(bill.water_bill)}
                    </StyledTableCell>
                    <StyledTableCell
                      align="left"
                      style={{ fontSize: "0.9rem", padding: "10px" }}
                    >
                      {bill.donate}
                    </StyledTableCell>
                    <StyledTableCell
                      align="left"
                      style={{ fontSize: "0.9rem", padding: "10px", backgroundColor: bill.paid === "False" ? "red" : "green" }}
                    >
                      <strong>{bill.paid === "False" ? "Chưa thanh toán" : "Đã thanh toán"}</strong>
                    </StyledTableCell>
                    <StyledTableCell
                      align="left"
                      style={{ fontSize: "0.9rem", padding: "10px" }}
                    >
                      {/* <div>
                      <a
                        data-bs-toggle="modal" data-bs-target="#confirmAddRegister" onClick={() => updateRoomState(room.id, room.name)}
                      >
                        <TiPinOutline
                          style={{ fontSize: "1.5rem", color: "#E32929" }}
                          className="delete-row"
                        />
                      </a>

                      <div className="modal fade" id="confirmAddRegister" aria-labelledby="confirmAddRegister" aria-hidden="true" tabIndex={-1} role="dialog">
                        <div className="modal-dialog modal-sm">
                          <div className="modal-content">
                            <div className="modal-header">
                              <h5 className="modal-title" id="exampleModalLabel"><strong>Xác nhận xóa thành viên</strong> </h5>
                              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                              Xác nhận đăng ký căn hộ số <strong>{roomname}</strong>
                            </div>
                            <div className="modal-footer">
                              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Hủy</button>
                              <button type="button" className="btn btn-primary" data-bs-dismiss="modal" style={{ backgroundColor: "green" }} onClick={() => submitAddRegister()}> Gửi đăng ký </button>
                            </div>
                          </div>
                        </div>
                      </div>

                    </div> */}
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </main>
      </div>
    </div>
  );
};
