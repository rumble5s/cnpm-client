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

function formatDate(date) {
  const d = new Date(date);
  const day = d.getDate().toString().padStart(2, '0');
  const month = (d.getMonth() + 1).toString().padStart(2, '0');
  const year = d.getFullYear();
  return `${day}/${month}/${year}`;
}

export const FamilyMemberList = () => {
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

  const updateState = (id, cic, name, dob, phone, email, formName) => {
    setPid(id);
    setPcic(cic);
    setPname(name);
    setPdob(dob);
    setPphone(phone);
    setPemail(email);

    if (formName != '')
      document.getElementById(formName).reset();
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

  const submitDelete = () => {
    const submit = async () => {
      try {
        const response = await axios({
          method: "POST",
          url: BASE_URL + "/delete_person/",
          data: {
            person_id: pid
          }
        });
        console.log(response.data);
      } catch (error) {
        alert("Delete User Failed!");
      }
    }
    submit();
    setDummy(dummy ^ 1);
  };

  const submitChange = (e) => {
    const formData = new FormData();

    formData.append('name', pname);
    formData.append('citizen_identification_card', pcic);
    formData.append('date_of_birth', pdob);
    formData.append('phone', pphone);
    formData.append('email', pemail);
    formData.append('person_id', pid);
    const submit = async () => {
      try {
        const response = await axios({
          method: "POST",
          url: BASE_URL + "/edit_person/",
          data: formData,
          headers: { "Content-Type": "multipart/form-data" },
        });
        console.log(response.data);
      } catch (error) {
        alert("Edit User Failed!");
      }
    }
    submit();
    setDummy(dummy ^ 1);
    e.target.reset();
  };

  return (
    <div>
      <h1>
        <strong>Danh sách thành viên gia đình</strong>
      </h1>

      <div className="add-department">
        <button type="button" className="btn btn-success rounded-pill" data-bs-toggle="modal" data-bs-target="#addPerson" onClick={() => updateState('', '', '', '', '', '', "addForm")}>
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
              <form id="addForm" onSubmit={submitAdd}>
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
                      placeholder={(new Date()).toLocaleDateString('en-GB')}
                      onChange={(e) => setPdob(e.target.value)}
                      onFocus={(e) => (e.target.type = "date")}
                      onBlur={(e) => (e.target.type = "text")}
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
                      placeholder="abcxyz@gmail.com"
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
                  {formatDate(person.date_of_birth)}
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
                      data-bs-toggle="modal" data-bs-target="#confirmDelete" onClick={() => updateState(person.id, '', person.name, '', '', '', '')}
                    >
                      <FaTrashAlt
                        style={{ fontSize: "1.5rem", color: "#E32929" }}
                        className="delete-row"
                      />
                    </a>

                    <div className="modal fade" id="confirmDelete" aria-labelledby="confirmDelete" aria-hidden="true" tabIndex={-1} role="dialog">
                      <div className="modal-dialog modal-sm">
                        <div className="modal-content">
                          <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel"><strong>Xác nhận xóa thành viên</strong> </h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                          </div>
                          <div className="modal-body">
                            Xác nhận xóa thành viên tên <br /> <strong>{pname}</strong>
                          </div>
                          <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Hủy</button>
                            <button type="button" className="btn btn-primary" data-bs-dismiss="modal" style={{ backgroundColor: "red" }} onClick={() => submitDelete()}> Xóa thành viên </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    <a
                      data-bs-toggle="modal" data-bs-target="#changePerson" onClick={() => updateState(person.id, person.citizen_identification_card, person.name, person.date_of_birth, person.phone, person.email, "changeForm")}
                    >
                      <FaEdit
                        style={{ fontSize: "1.5rem", color: "#17a2b8" }}
                      />
                    </a>

                    <div className="modal fade" id="changePerson" aria-labelledby="changePerson" aria-hidden="true" tabIndex={-1} role="dialog">
                      <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                          <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel"><strong>Thay đổi thông tin thành viên</strong> </h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                          </div>
                          <div className="modal-body">
                            <form id="changeForm" onSubmit={submitChange}>
                              <div className="form-group mt-3">
                                <div className="col">
                                  <label>Tên</label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    placeholder={pname}
                                    onChange={(e) => setPname(e.target.value)}
                                  />
                                </div>
                                <div className="col">
                                  <label>Số CCCD</label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    placeholder={pcic}
                                    onChange={(e) => setPcic(e.target.value)}
                                  />
                                </div>
                                <div className="col">
                                  <label>Ngày tháng năm sinh</label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    placeholder={(new Date(pdob)).toLocaleDateString('en-GB')}
                                    onChange={(e) => setPdob(e.target.value)}
                                    onFocus={(e) => (e.target.type = "date")}
                                    onBlur={(e) => (e.target.type = "text")}
                                  />
                                </div>
                                <div className="col">
                                  <label>Số điện thoại</label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    placeholder={pphone}
                                    onChange={(e) => setPphone(e.target.value)}
                                  />
                                </div>
                                <div className="col">
                                  <label>Email</label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    placeholder={pemail}
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

                  </div>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};
