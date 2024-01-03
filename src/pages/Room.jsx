import { useEffect } from "react";
import axios from "axios";
import { ReactDOM } from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/Admin.css";

import { Logout } from '../components/Logout.jsx';
import { AdminViewFamily } from "../components/AdminViewFamily";
import { AdminViewFamilyTransports } from "../components/AdminViewFamilyTransports";

import { FaHome } from "react-icons/fa";
import { MdOutlineFamilyRestroom } from "react-icons/md";
import { FaBuilding } from "react-icons/fa6";
import { MdOutlineCreditCard } from "react-icons/md";
import { RiComputerFill } from "react-icons/ri";
import { RiMotorbikeFill } from "react-icons/ri";
import { MdOutlineCancel } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { FaMoneyBillWave } from "react-icons/fa6";
import { FaInfoCircle } from "react-icons/fa";

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
import { useStepContext } from "@mui/material";

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

export const Room = () => {
  const BASE_URL = "http://localhost:8000";
  const [rooms, setRooms] = useState([]);
  const [auth, setAuth] = useState("");

  const [rid, setRid] = useState("");
  const [ruser, setRuser] = useState("");
  const [rroom, setRroom] = useState("");
  const [roomName, setRoomName] = useState("");

  const [title, setTitle] = useState("");
  const [electricBill, setElectricBill] = useState("");
  const [waterBill, setWaterBill] = useState("");

  const [persons, setPersons] = useState([]);
  const [transports, setTransports] = useState([]);

  const [dummy, setDummy] = useState(false);

  const [childDummy, setChildDummy] = useState(false);

  const [filterUser, setFilterUser] = useState("");
  const [filterRoom, setFilterRoom] = useState("");


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
          const occupied_rooms = response.data.rooms.filter((room) => room.group !== "null");
          console.log(occupied_rooms)
          setRooms(occupied_rooms);
        }
      } catch (error) {
        alert("Admin Family+Room Error");
      }
    };
    fetchData();
  }, [dummy]);

  const updateState = (user, room) => {
    setRuser(user);
    setRroom(room);

    const fetchDataFamily = async () => {
      try {
        const response = await axios({
          method: "POST",
          url: BASE_URL + "/get_persons/",
          data: {
            group_id: user,
          },
        });

        if (response.data.error) {
          alert(response.data.error);
        } else {
          console.log(response.data.persons);
          setPersons(response.data.persons);
        }
      } catch (error) {
        alert("Admin View Family Persons Error");
      }
    };

    const fetchDataTransport = async () => {
      try {
        const response = await axios({
          method: "POST",
          url: BASE_URL + "/get_transports/",
          data: {
            group_id: user,
          },
        });

        if (response.data.error) {
          alert(response.data.error);
        } else {
          console.log(response.data.transports);
          setTransports(response.data.transports);
        }
      } catch (error) {
        alert("Admin View Family Transports Error");
      }
    };

    fetchDataFamily();
    fetchDataTransport();

  };

  const submitAdd = (e) => {
    const submit = async () => {
      try {
        const response = await axios({
          method: "POST",
          url: BASE_URL + "/admin_create_bill/",
          data: {
            auth: auth,
            title: title,
            room_id: rroom,
            electric_bill: electricBill,
            water_bill: waterBill
          }
        });
        console.log(response.data);
        alert("Thêm hóa đơn thành công");
      } catch (error) {
        alert("Add Bill Failed!");
      }
    }
    submit();
  };

  return (
    <div className="wrapper">
      <aside id="sidebar" className="js-sidebar">
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
              <Link className="link-secondary sidebar-link current-site" to="/room">
                <MdOutlineFamilyRestroom className="icon-sidebar" />
                Hộ gia đình
              </Link>
            </li>
            <li className="sidebar-item">
              <Link className="link-secondary sidebar-link" to="/bill" s>
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
        <main className="content px-3 py-2">
          <h1>
            <strong>Danh sách các hộ gia đình trong chung cư</strong>
            <form className="d-flex">
              <input
                className="form-control me-2"
                type="text"
                placeholder="Tìm kiếm theo tên tài khoản🔎"
                aria-label="Search"
                onChange={(e) => setFilterUser(e.target.value)}
              />
              <input
                className="form-control me-2"
                type="text"
                placeholder="Tìm kiếm theo số phòng🔎"
                aria-label="Search"
                onChange={(e) => setFilterRoom(e.target.value)}
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
                    <strong>Tài khoản đăng ký</strong>
                  </StyledTableCell>
                  <StyledTableCell
                    align="left"
                    style={{ fontSize: "0.9rem", padding: "10px" }}
                  >
                    <strong>Số phòng</strong>
                  </StyledTableCell>
                  <StyledTableCell align="right"></StyledTableCell>
                  <StyledTableCell align="left"></StyledTableCell>
                </StyledTableRow>
              </TableHead>
              <TableBody style={{ width: "100%" }}>
                {rooms.filter((room) => room.group.name.startsWith(filterUser) && room.name.startsWith(filterRoom)).map((room, index) => (
                  <StyledTableRow
                    key={room.id}
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
                      {room.group.name}
                    </StyledTableCell>
                    <StyledTableCell
                      align="left"
                      style={{ fontSize: "0.9rem", padding: "10px" }}
                    >
                      {room.name}
                    </StyledTableCell>
                    <StyledTableCell
                      align="left"
                      style={{ fontSize: "0.9rem", padding: "10px" }}
                    >
                      <div>
                        <a
                          data-bs-toggle="modal" data-bs-target="#viewFamily" onClick={() => updateState(room.group.id, room.id)}
                        >
                          <FaInfoCircle
                            style={{ fontSize: "1.5rem", color: "black" }}
                            className="delete-row"
                          />
                        </a>
                        <div className="modal fade" id="viewFamily" aria-labelledby="viewFamily" aria-hidden="true" tabIndex={-1} role="dialog">
                          <div className="modal-dialog modal-lg">
                            <div className="modal-content">
                              <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel"><strong>Thông tin hộ gia đình</strong> </h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                              </div>
                              <div className="modal-body">
                                <AdminViewFamily persons={persons} />
                                <br />
                                <AdminViewFamilyTransports transports={transports} />
                              </div>
                              <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
                                {/* <button type="button" className="btn btn-primary" data-bs-dismiss="modal" style={{ backgroundColor: "red" }} onClick={() => submitDenyRegister()}> Từ chối đăng ký </button> */}
                              </div>
                            </div>
                          </div>
                        </div>

                        <a
                          data-bs-toggle="modal" data-bs-target="#addBill" onClick={() => {updateState(room.group.id, room.id); setRoomName(room.name)} }
                        >
                          <FaMoneyBillWave
                            style={{ fontSize: "1.5rem", color: "green" }}
                            className="delete-row"
                          />
                        </a>

                        <div className="modal fade" id="addBill" aria-labelledby="addBill" aria-hidden="true" tabIndex={-1} role="dialog">
                          <div className="modal-dialog modal-lg">
                            <div className="modal-content">
                              <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel"><strong>Thêm hóa đơn cho phòng {roomName} </strong> </h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                              </div>
                              <div className="modal-body">
                                <form onSubmit={submitAdd}>
                                  <div className="form-group mt-3">
                                    <div className="col-xs-2">
                                      <label>Tiêu đề hóa đơn</label>
                                      <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Hóa đơn tháng 1"
                                        onChange={(e) => setTitle(e.target.value)}
                                      />
                                    </div>
                                    <div className="col-xs-3">
                                      <label>Tiền điện</label>
                                      <input
                                        type="text"
                                        className="form-control"
                                        placeholder="100000"
                                        onChange={(e) => setElectricBill(e.target.value)}
                                      />
                                    </div>
                                    <div className="col-xs-4">
                                      <label>Tiền nước</label>
                                      <input
                                        type="text"
                                        className="form-control"
                                        placeholder="250000"
                                        onChange={(e) => setWaterBill(e.target.value)}
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
