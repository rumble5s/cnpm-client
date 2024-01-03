import { useEffect } from "react";
import axios from "axios";
import { ReactDOM } from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/Admin.css";

import { Logout } from '../components/Logout.jsx';

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
import { LuClipboardSignature } from "react-icons/lu";

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

export const Register = () => {
  const BASE_URL = "http://localhost:8000";
  const [registers, setRegisters] = useState([]);
  const [auth, setAuth] = useState("");

  const [rid, setRid] = useState("");
  const [ruser, setRuser] = useState("");
  const [rroom, setRroom] = useState("");

  const [dummy, setDummy] = useState(false);

  const [filterUser, setFilterUser] = useState("");
  const [filterRoom, setFilterRoom] = useState("");

  useEffect(() => {
    const auth = JSON.parse(localStorage.getItem("isadmin")).isadmin;
    setAuth(auth);
    const fetchData = async () => {
      try {
        const response = await axios({
          method: "POST",
          url: BASE_URL + "/admin_show_registers/",
          data: {
            auth: auth,
          },
        });

        if (response.data.error) {
          alert(response.data.error);
        } else {
          console.log(response.data.registers);
          setRegisters(response.data.registers);
        }
      } catch (error) {
        alert("Admin Registers Error");
      }
    };
    fetchData();
  }, [dummy]);

  const updateState = (id, user, room) => {
    setRid(id);
    setRuser(user);
    setRroom(room);
  };

  const submitDenyRegister = () => {
    // console.log(typeof (room_id));

    const submit = async () => {
      try {
        const response = await axios({
          method: "POST",
          url: BASE_URL + "/admin_deny_register/",
          data: {
            auth: auth,
            register_id: rid
          }
        });
        console.log(response.data);
      } catch (error) {
        alert("Deny Register Failed!");
      }
    }
    submit();
    setDummy(dummy ^ 1);
  };

  const submitAcceptRegister = () => {
    // console.log(typeof (room_id));

    const submit = async () => {
      try {
        const response = await axios({
          method: "POST",
          url: BASE_URL + "/admin_accept_register/",
          data: {
            auth: auth,
            register_id: rid
          }
        });
        console.log(response.data);
      } catch (error) {
        alert("Accept Register Failed!");
      }
    }
    submit();
    setDummy(dummy ^ 1);
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
              <Link className="link-secondary sidebar-link current-site" to="/register">
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
            <strong>Danh sách căn hộ yêu cầu đăng ký</strong>
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
                  <StyledTableCell
                    align="left"
                    style={{ fontSize: "0.9rem", padding: "10px" }}
                  >
                    <strong>Diện tích (m2)</strong>
                  </StyledTableCell>
                  <StyledTableCell
                    align="left"
                    style={{ fontSize: "0.9rem", padding: "10px" }}
                  >
                    <strong>
                      Giá dịch vụ hàng tháng
                      <br /> (không bao gồm điện, nước)
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
                {registers.filter((register) => register.status === 'pending').filter((register) => register.group.name.startsWith(filterUser) && register.room.name.startsWith(filterRoom)).map((register, index) => (
                  <StyledTableRow
                    key={register.id}
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
                      {register.group.name}
                    </StyledTableCell>
                    <StyledTableCell
                      align="left"
                      style={{ fontSize: "0.9rem", padding: "10px" }}
                    >
                      {register.room.name}
                    </StyledTableCell>
                    <StyledTableCell
                      align="left"
                      style={{ fontSize: "0.9rem", padding: "10px" }}
                    >
                      {register.room.area}
                    </StyledTableCell>
                    <StyledTableCell
                      align="left"
                      style={{ fontSize: "0.9rem", padding: "10px" }}
                    >
                      {register.room.price}
                    </StyledTableCell>
                    <StyledTableCell
                      align="left"
                      style={{ fontSize: "0.9rem", padding: "10px", backgroundColor: register.status === "Accepted" ? "green" : (register.status === "pending" ? "gray" : "red") }}
                    >
                      <strong>{register.status}</strong>
                    </StyledTableCell>
                    <StyledTableCell
                      align="left"
                      style={{ fontSize: "0.9rem", padding: "10px" }}
                    >
                      <div>
                        <a
                          data-bs-toggle="modal" data-bs-target="#denyRegister" onClick={() => updateState(register.id, register.group.name, register.room.name)}
                        >
                          <MdOutlineCancel
                            style={{ fontSize: "1.5rem", color: "#E32929" }}
                            className="delete-row"
                          />
                        </a>

                        <div className="modal fade" id="denyRegister" aria-labelledby="denyRegister" aria-hidden="true" tabIndex={-1} role="dialog">
                          <div className="modal-dialog modal-sm">
                            <div className="modal-content">
                              <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel"><strong>Từ chối đơn đăng ký</strong> </h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                              </div>
                              <div className="modal-body">
                                Xác nhận từ chối đơn đăng ký của tài khoản <strong>{ruser}</strong> <br /> với căn hộ số <strong>{rroom}</strong>
                              </div>
                              <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Hủy</button>
                                <button type="button" className="btn btn-primary" data-bs-dismiss="modal" style={{ backgroundColor: "red" }} onClick={() => submitDenyRegister()}> Từ chối đăng ký </button>
                              </div>
                            </div>
                          </div>
                        </div>

                        <a
                          data-bs-toggle="modal" data-bs-target="#acceptRegister" onClick={() => updateState(register.id, register.group.name, register.room.name)}
                        >
                          <LuClipboardSignature
                            style={{ fontSize: "1.5rem", color: "green" }}
                            className="delete-row"
                          />
                        </a>

                        <div className="modal fade" id="acceptRegister" aria-labelledby="acceptRegister" aria-hidden="true" tabIndex={-1} role="dialog">
                          <div className="modal-dialog modal-sm">
                            <div className="modal-content">
                              <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel"><strong>Chấp nhận đơn đăng ký</strong> </h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                              </div>
                              <div className="modal-body">
                                Chấp nhận đơn đăng ký của tài khoản <strong>{ruser}</strong> <br/> với căn hộ số <strong>{rroom}</strong>
                              </div>
                              <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Hủy</button>
                                <button type="button" className="btn btn-primary" data-bs-dismiss="modal" style={{ backgroundColor: "green" }} onClick={() => submitAcceptRegister()}> Chấp nhận đăng ký </button>
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
