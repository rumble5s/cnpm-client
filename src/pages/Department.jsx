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
import { FaTrashAlt } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";

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

export const Department = () => {
  const BASE_URL = "http://localhost:8000";
  const [rooms, setRooms] = useState([]);
  const [auth, setAuth] = useState("");

  const [dummy, setDummy] = useState(true);

  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [area, setArea] = useState('');
  const [price, setPrice] = useState('');

  const [filter, setFilter] = useState('');

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
  }, [dummy]);

  useEffect(() => {

  }, [filter]);

  const submitDelete = () => {
    // console.log(typeof (room_id));

    const submit = async () => {
      try {
        const response = await axios({
          method: "POST",
          url: BASE_URL + "/admin_delete_room/",
          data: {
            auth: auth,
            room_id: id
          }
        });
        console.log(response.data);
      } catch (error) {
        alert("Delete Failed!");
      }
    }
    submit();
    setDummy(dummy ^ 1);
  };

  const updateState = (id, name, area, price) => {
    setId(id);
    setName(name);
    setArea(area);
    setPrice(price);
  }

  const submitChange = (e) => {
    const submit = async () => {
      try {
        const response = await axios({
          method: "POST",
          url: BASE_URL + "/admin_edit_room/",
          data: {
            auth: auth,
            room_id: id,
            name: name,
            area: area,
            price: price,
            description: "This room was editted"
          }
        });
        // console.log(response.data);
      } catch (error) {
        alert("Edit Failed!");
      }
    }
    submit();
    setDummy(dummy ^ 1);
  };

  const submitAdd = (e) => {
    const submit = async () => {
      try {
        const response = await axios({
          method: "POST",
          url: BASE_URL + "/admin_create_room/",
          data: {
            auth: auth,
            name: name,
            area: area,
            price: price,
            description: "This room was added"
          }
        });
        console.log(response.data);
      } catch (error) {
        alert("Add Failed!");
      }
    }
    submit();
    setDummy(dummy ^ 1);
  };

  const index = 0;

  return (
    <div className="wrapper">
      <aside id="sidebar" className="js-sidebar">
        {/* Content For Sidebar */}
        <Logout/>
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
            <strong>Danh sách căn hộ</strong>
            <form className="d-flex">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Tìm kiếm số phòng🔎"
                aria-label="Search"
                onChange={(e) => setFilter(e.target.value)}
              />
              {' '}
              <FaSearch size={35}/>
            </form>
          </h1>
          <div className="add-department">
          <button type="button" className="btn btn-success rounded-pill" data-bs-toggle="modal" data-bs-target="#addRoom" onClick={() => updateState('','','','')}>
            <strong>Thêm căn hộ </strong>
            <FaPlus
              style={{
                fontSize: "1.25rem",
                color: "black",
              }}
            />
          </button>
          </div>
          <div className="modal fade" id="addRoom" aria-labelledby="addRoom" aria-hidden="true" tabIndex={-1} role="dialog">
            <div className="modal-dialog modal-lg">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel"><strong>Thêm căn hộ</strong> </h5>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                  <form onSubmit={submitAdd}>
                    <div className="form-group mt-3">
                      <div className="col-xs-2">
                        <label>Số phòng</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="175"
                          onChange={(e) => setName(e.target.value)}
                        />
                      </div>
                      <div className="col-xs-3">
                        <label>Diện tích (m2)</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="100.00"
                          onChange={(e) => setArea(e.target.value)}
                        />
                      </div>
                      <div className="col-xs-4">
                        <label>Giá dịch vụ hàng tháng <br /> (không bao gồm điện, nước)</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="250000"
                          onChange={(e) => setPrice(e.target.value)}
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
                  <StyledTableCell align="right"></StyledTableCell>
                  <StyledTableCell align="left"></StyledTableCell>
                </StyledTableRow>
              </TableHead>
              <TableBody style={{ width: "100%" }}>
                {rooms.filter((room) => room.name.startsWith(filter)).map((room, index) => (
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
                      {room.name}
                    </StyledTableCell>
                    <StyledTableCell
                      align="left"
                      style={{ fontSize: "0.9rem", padding: "10px" }}
                    >
                      {room.area}
                    </StyledTableCell>
                    <StyledTableCell
                      align="left"
                      style={{ fontSize: "0.9rem", padding: "10px" }}
                    >
                      {room.price}
                    </StyledTableCell>
                    <StyledTableCell
                      align="left"
                      style={{ fontSize: "0.9rem", padding: "10px" }}
                    >
                      <div>
                        <a data-bs-toggle="modal" data-bs-target="#confirmDelete" onClick={() => updateState(room.id,'','','')}>
                          <FaTrashAlt
                            style={{ fontSize: "1.5rem", color: "#E32929" }}
                            className="delete-row"
                          />
                        </a>

                        <div className="modal fade" id="confirmDelete" aria-labelledby="confirmDelete" aria-hidden="true" tabIndex={-1} role="dialog">
                          <div className="modal-dialog modal-sm">
                            <div className="modal-content">
                              <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel"><strong>Xác nhận xóa phòng</strong> </h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                              </div>
                              {/* <div className="modal-body">
                                Ấn nút <button type="button" className="btn btn-primary" style={{ backgroundColor: "red" }}> Xóa phòng </button> bên dưới để xác nhận.
                              </div> */}
                              <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Hủy</button>
                                <button type="button" className="btn btn-primary" data-bs-dismiss="modal" style={{ backgroundColor: "red" }} onClick={() => submitDelete()}> Xóa phòng </button>
                              </div>
                            </div>
                          </div>
                        </div>

                        <a data-bs-toggle="modal" data-bs-target="#changeRoom" onClick={() => updateState(room.id, room.name, room.area, room.price)}>
                          <FaEdit
                            style={{ fontSize: "1.5rem", color: "#17a2b8" }}
                          />
                        </a>

                        <div className="modal fade" id="changeRoom" aria-labelledby="changeRoom" aria-hidden="true" tabIndex={-1} role="dialog">
                          <div className="modal-dialog modal-lg">
                            <div className="modal-content">
                              <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel"><strong>Thay đổi thông tin phòng</strong> </h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                              </div>
                              <div className="modal-body">
                                <form onSubmit={submitChange}>
                                  <div className="form-group mt-3">
                                    <div className="col-xs-2">
                                      <label>Số phòng</label>
                                      <input
                                        type="text"
                                        className="form-control"
                                        placeholder={name}
                                        onChange={(e) => setName(e.target.value)}
                                      />
                                    </div>
                                    <div className="col-xs-3">
                                      <label>Diện tích (m2)</label>
                                      <input
                                        type="text"
                                        className="form-control"
                                        placeholder={area}
                                        onChange={(e) => setArea(e.target.value)}
                                      />
                                    </div>
                                    <div className="col-xs-4">
                                      <label>Giá dịch vụ hàng tháng <br /> (không bao gồm điện, nước)</label>
                                      <input
                                        type="text"
                                        className="form-control"
                                        placeholder={price}
                                        onChange={(e) => setPrice(e.target.value)}
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
