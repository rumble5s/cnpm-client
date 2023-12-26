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

export const Family = () => {
  const BASE_URL = "http://localhost:8000";
  const [persons, setPersons] = useState([]);
  const [groupid, setGroupid] = useState("");

  const [dummy, setDummy] = useState(true);

  const [pid, setPid] = useState("");
  const [pcic, setPcic] = useState("");
  const [pname, setPname] = useState("");
  const [pdob, setPdob] = useState("");
  const [pphone, setPphone] = useState("");
  const [pemail, setPemail] = useState("");

  useEffect(() => {
    const gid = JSON.parse(localStorage.getItem("groupid")).group_id;
    setGroupid(gid);
    const fetchData = async () => {
      try {
        console.log(gid);
        const response = await axios({
          method: "POST",
          url: BASE_URL + "/get_persons/",
          data: {
            group_id: gid,
          },
        });

        if (response.data.error) {
          alert(response.data.error);
        } else {
          console.log(response.data.persons);
          setPersons(response.data.persons);
        }
      } catch (error) {
        alert("User Family Error");
      }
    };
    fetchData();
  }, [dummy]);

  const updateState = (id, cic, name, dob, phone, email) => {
    setPid(id);
    setPcic(cic);
    setPname(name);
    setPdob(dob);
    setPphone(phone);
    setPemail(email);
  };

  const submitAdd = (e) => {
    const formData = new FormData();
    formData.append('name', pname);
    formData.append('citizen_identification_card', pcic);
    formData.append('date_of_birth', pdob);
    formData.append('phone', pphone);
    formData.append('email', pemail);
    formData.append('group_id', groupid);
    const submit = async () => {
      try {
        const response = await axios({
          method: "POST",
          url: BASE_URL + "/add_person/",
          data: formData,
          headers: { "Content-Type": "multipart/form-data" },
        });
        console.log(response.data);
      } catch (error) {
        alert("Add User Failed!");
      }
    }
    submit();
    setDummy(dummy ^ 1);
  };

  return (
    <div className="wrapper">
      <aside id="sidebar" className="js-sidebar user">
        {/* Content For Sidebar */}
        <div className="h-100">
          <div className="sidebar-logo">
            <a className="text-center" to="/user">
              Chung cư X
            </a>
          </div>
          <ul className="sidebar-nav">
            <li className="sidebar-item">
              <Link className="link-secondary sidebar-link" to="/user">
                <FaHome className="icon-sidebar" />
                Trang chủ
              </Link>
            </li>
            <li className="sidebar-item">
              <Link className="link-secondary sidebar-link" to="/udepartment">
                <FaBuilding className="icon-sidebar" />
                Danh sách căn hộ
              </Link>
            </li>

            <li className="sidebar-item">
              <Link className="link-secondary sidebar-link current-site" to="/family">
                <MdOutlineFamilyRestroom className="icon-sidebar" />
                Hộ gia đình
              </Link>
            </li>
            <li className="sidebar-item">
              <Link className="link-secondary sidebar-link" to="/userbills">
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
            <strong>Danh sách thành viên gia đình</strong>
          </h1>

          <div className="add-department">
            <button type="button" className="btn btn-success rounded-pill" data-bs-toggle="modal" data-bs-target="#addPerson" onClick={() => updateState('', '', '', '', '', '')}>
              <strong>Thêm thành viên </strong>
              <FaPlus
                style={{
                  fontSize: "1.25rem",
                  color: "black",
                }}
              />
            </button>
          </div>
          <div className="modal fade" id="addPerson" aria-labelledby="addPerson" aria-hidden="true" tabIndex={-1} role="dialog">
            <div className="modal-dialog modal-lg">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel"><strong>Thêm thành viên</strong> </h5>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                  <form onSubmit={submitAdd}>
                    <div className="form-group mt-3">
                      <div className="col">
                        <label>Tên</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Nguyễn Văn A"
                          onChange={(e) => setPname(e.target.value)}
                        />
                      </div>
                      <div className="col">
                        <label>Số CCCD</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="001239182832"
                          onChange={(e) => setPcic(e.target.value)}
                        />
                      </div>
                      <div className="col">
                        <label>Ngày tháng năm sinh</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="2023-12-26"
                          onChange={(e) => setPdob(e.target.value)}
                        />
                      </div>
                      <div className="col">
                        <label>Số điện thoại</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="0123202326"
                          onChange={(e) => setPphone(e.target.value)}
                        />
                      </div>
                      <div className="col">
                        <label>Email</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="0123202326"
                          onChange={(e) => setPemail(e.target.value)}
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
                    <strong>Tên</strong>
                  </StyledTableCell>
                  <StyledTableCell
                    align="left"
                    style={{ fontSize: "0.9rem", padding: "10px" }}
                  >
                    <strong>Số CCCD</strong>
                  </StyledTableCell>
                  <StyledTableCell
                    align="left"
                    style={{ fontSize: "0.9rem", padding: "10px" }}
                  >
                    <strong>
                      Ngày tháng năm sinh
                    </strong>
                  </StyledTableCell>
                  <StyledTableCell
                    align="left"
                    style={{ fontSize: "0.9rem", padding: "10px" }}
                  >
                    <strong>
                      Số điện thoại
                    </strong>
                  </StyledTableCell>
                  <StyledTableCell
                    align="left"
                    style={{ fontSize: "0.9rem", padding: "10px" }}
                  >
                    <strong>
                      Email
                    </strong>
                  </StyledTableCell>
                  <StyledTableCell align="right"></StyledTableCell>
                  <StyledTableCell align="left"></StyledTableCell>
                </StyledTableRow>
              </TableHead>
              <TableBody style={{ width: "100%" }}>
                {persons.map((person, index) => (
                  <StyledTableRow
                    key={person.id}
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
                      {person.name}
                    </StyledTableCell>
                    <StyledTableCell
                      align="left"
                      style={{ fontSize: "0.9rem", padding: "10px" }}
                    >
                      {person.citizen_identification_card}
                    </StyledTableCell>
                    <StyledTableCell
                      align="left"
                      style={{ fontSize: "0.9rem", padding: "10px" }}
                    >
                      {person.date_of_birth}
                    </StyledTableCell>
                    <StyledTableCell
                      align="left"
                      style={{ fontSize: "0.9rem", padding: "10px" }}
                    >
                      {person.phone}
                    </StyledTableCell>
                    <StyledTableCell
                      align="left"
                      style={{ fontSize: "0.9rem", padding: "10px" }}
                    >
                      {person.email}
                    </StyledTableCell>
                    <StyledTableCell
                      align="left"
                      style={{ fontSize: "0.9rem", padding: "10px" }}
                    >
                      <div>
                        <a
                        // data-bs-toggle="modal" data-bs-target="#confirmDelete" onClick={() => updateState(room.id,'','','')}
                        >
                          <FaTrashAlt
                            style={{ fontSize: "1.5rem", color: "#E32929" }}
                            className="delete-row"
                          />
                        </a>

                        {/* <div className="modal fade" id="confirmDelete" aria-labelledby="confirmDelete" aria-hidden="true" tabIndex={-1} role="dialog">
                          <div className="modal-dialog modal-sm">
                            <div className="modal-content">
                              <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel"><strong>Xác nhận xóa phòng</strong> </h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                              </div>
                              <div className="modal-body">
                                Ấn nút <button type="button" className="btn btn-primary" style={{ backgroundColor: "red" }}> Xóa phòng </button> bên dưới để xác nhận.
                              </div>
                              <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Hủy</button>
                                <button type="button" className="btn btn-primary" data-bs-dismiss="modal" style={{ backgroundColor: "red" }} onClick={() => submitDelete()}> Xóa phòng </button>
                              </div>
                            </div>
                          </div>
                        </div> */}

                        <a
                        // data-bs-toggle="modal" data-bs-target="#changeRoom" onClick={() => updateState(room.id, room.name, room.area, room.price)}
                        >
                          <FaEdit
                            style={{ fontSize: "1.5rem", color: "#17a2b8" }}
                          />
                        </a>

                        {/* <div className="modal fade" id="changeRoom" aria-labelledby="changeRoom" aria-hidden="true" tabIndex={-1} role="dialog">
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
                        </div> */}

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
