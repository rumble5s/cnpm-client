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
import { PiHandCoins } from "react-icons/pi";

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

export const BillInformation = () => {
  const BASE_URL = "http://localhost:8000";
  const [bills, setBills] = useState([]);
  const [auth, setAuth] = useState("");

  const [roomid, setRoomid] = useState("");
  const [roomname, setRoomname] = useState("");

  const [donate, setDonate] = useState("");

  const [dummy, setDummy] = useState(false);

  const [billDate, setBillDate] = useState("");
  const [billId, setBillId] = useState("");

  const [filterMonth, setFilterMonth] = useState('');
  const [filterYear, setFilterYear] = useState('');
  const [filterStatus, setFilterStatus] = useState('');

  useEffect(() => {
    const auth = JSON.parse(localStorage.getItem("isadmin")).isadmin;
    setAuth(auth);
    const fetchData = async () => {
      try {
        const response = await axios({
          method: "POST",
          url: BASE_URL + "/admin_get_bills/",
          data: {
            auth: auth,
          }
        });

        if (response.data.error) {
          alert(response.data.error);
        } else {
          console.log(response.data.bills);
          setBills(response.data.bills);
        }
      } catch (error) {
        alert("Admin Bills Error");
      }
    };
    fetchData();
  }, [dummy]);

  useEffect(() => {

  }, [filterMonth, filterYear]);

  const updateRoomState = (id, name) => {
    setRoomid(id);
    setRoomname(name);
  };

  const submitDeleteBill = () => {
    const submit = async () => {
      try {
        const response = await axios({
          method: "POST",
          url: BASE_URL + "/admin_delete_bill/",
          data: {
            auth: auth,
            bill_id: billId
          }
        });
        console.log(response.data);
      } catch (error) {
        alert("Delete Bill Failed!");
      }
    }
    submit();
    setDummy(dummy ^ 1);
  };

  const submitConfirm = (e) => {
    const submit = async () => {
      try {
        const response = await axios({
          method: "POST",
          url: BASE_URL + "/admin_accept_bill/",
          data: {
            auth: auth,
            bill_id: billId, 
            donate: donate
          }
        });
        console.log(response.data);
      } catch (error) {
        alert("Confirm Bill Failed!");
      }
    }
    submit();
    setDummy(dummy ^ 1);
  };

  const filt = (day, status) => {
    const y = filterYear === '' ? true : parseInt(filterYear) === parseInt(day.substring(0, 4));
    const m = filterMonth === '' ? true : parseInt(filterMonth) === parseInt(day.substring(5, 7));
    const s = filterStatus === '' ? true : filterStatus === status;
    return y & m & s;
  }

  return (
    <div className="wrapper">
      <aside id="sidebar" className="js-sidebar user">
        {/* Content For Sidebar */}
        <Logout />
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
              <Link className="link-secondary sidebar-link current-site" to="/bill">
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
              <Link className="link-secondary sidebar-link" to="/parking">
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
            <strong>Danh sách hóa đơn</strong></h1>
            {/* <form id="billFilter" className="d-flex">
              <div className="p-2 flex-fill">
                <input
                className="form-control me-2"
                type="text"
                placeholder="Tìm kiếm theo năm🔎"
                aria-label="Search"
                onChange={(e) => setFilterYear(e.target.value)}
              />
              </div>
              <div className="p-2 flex-fill">
                <input
                className="form-control me-2"
                type="text"
                placeholder="Tìm kiếm theo tháng🔎"
                aria-label="Search"
                onChange={(e) => setFilterMonth(e.target.value)}
              />
              </div>
              <div className="p-2 flex-fill">
                <select form="billFilter" onChange={(e) => setFilterStatus(e.target.value)}>
                <option value="">Trạng thái thanh toán bất kỳ</option>
                <option value="True">Đã thanh toán</option>
                <option value="False">Chưa thanh toán</option>
              </select>
              {' '}
              <FaSearch size={35} />
              </div>
              
              
              
            </form> */}
            <form id="billFilter" className="d-flex">
            <div className="p-2 flex-fill">
              <input
                className="form-control me-2"
                type="text"
                placeholder="Tìm kiếm theo năm🔎"
                aria-label="Search"
                onChange={(e) => setFilterYear(e.target.value)}
              />
            </div>
            <div className="p-2 flex-fill">
              <input
                className="form-control me-2"
                type="text"
                placeholder="Tìm kiếm theo tháng🔎"
                aria-label="Search"
                onChange={(e) => setFilterMonth(e.target.value)}
              />
            </div>
            <div className="p-2 search-bar-1">
              <select
                className="form-select"
                aria-label="Default select example"
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <option value="">Trạng thái thanh toán bất kỳ</option>
                <option value="True">Đã thanh toán</option>
                <option value="False">Chưa thanh toán</option>
              </select>
              {/* <FaSearch size={35} /> */}
            </div>
          </form>
          

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
                    <strong>Số phòng</strong>
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
                {bills.filter((bill) => filt(bill.create_at, bill.paid)).map((bill, index) => (
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
                      {bill.room.name}
                    </StyledTableCell>
                    <StyledTableCell
                      align="left"
                      style={{ fontSize: "0.9rem", padding: "10px" }}
                    >
                      {(new Date(bill.create_at)).toLocaleDateString('en-GB')}
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
                      <div>
                        <a
                          data-bs-toggle="modal" data-bs-target="#deleteBill" onClick={() => { setRoomname(bill.room.name); setBillDate(bill.create_at); setBillId(bill.id) }}
                        >
                          <FaTrashAlt
                            style={{ fontSize: "1.5rem", color: "#E32929" }}
                            // className="delete-row"
                          />
                        </a>

                        <div className="modal fade" id="deleteBill" aria-labelledby="deleteBill" aria-hidden="true" tabIndex={-1} role="dialog">
                          <div className="modal-dialog modal-sm">
                            <div className="modal-content">
                              <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel"><strong>Xác nhận xóa hóa đơn</strong> </h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                              </div>
                              <div className="modal-body">
                                Xác nhận xóa hóa đơn được tạo trong ngày <strong>{(new Date(billDate)).toLocaleDateString('en-GB')}</strong> của căn hộ số <strong>{roomname}</strong>
                              </div>
                              <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Hủy</button>
                                <button type="button" className="btn btn-primary" data-bs-dismiss="modal" style={{ backgroundColor: "red" }} onClick={() => submitDeleteBill()}> Xóa hóa đơn </button>
                              </div>
                            </div>
                          </div>
                        </div>

                        <a
                          data-bs-toggle="modal" data-bs-target="#confirmBill" onClick={() => { setRoomname(bill.room.name); setBillDate(bill.create_at); setBillId(bill.id) }}
                        >
                          <PiHandCoins
                            style={{ fontSize: "1.5rem", color: "green" }}
                            className="delete-row"
                          />
                        </a>

                        <div className="modal fade" id="confirmBill" aria-labelledby="confirmBill" aria-hidden="true" tabIndex={-1} role="dialog">
                          <div className="modal-dialog modal-lg">
                            <div className="modal-content">
                              <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel"><strong>Xác nhận thanh toán hóa đơn ngày {(new Date(billDate)).toLocaleDateString('en-GB')} của phòng {roomname} </strong> </h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                              </div>
                              <div className="modal-body">
                                <form onSubmit={submitConfirm}>
                                  <div className="form-group mt-3">
                                    <div className="col-xs-2">
                                      <label>Tiền quyên góp, ủng hộ</label>
                                      <input
                                        type="text"
                                        className="form-control"
                                        placeholder="100000"
                                        onChange={(e) => setDonate(e.target.value)}
                                      />
                                    </div>
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

                      </div>
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
