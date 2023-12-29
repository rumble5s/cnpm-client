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

export const FamilyTransportList = () => {
    const BASE_URL = "http://localhost:8000";
    const [transports, setTransports] = useState([]);
    const [groupid, setGroupid] = useState("");

    const [tdummy, setTdummy] = useState(true);

    const [tid, setTid] = useState("");
    const [tplateNumber, setTplateNumber] = useState("");
    const [ttype, setTtype] = useState("");

    useEffect(() => {
        const gid = JSON.parse(localStorage.getItem("groupid")).group_id;
        setGroupid(gid);
        const fetchData = async () => {
            try {
                console.log(gid);
                const response = await axios({
                    method: "POST",
                    url: BASE_URL + "/get_transports/",
                    data: {
                        group_id: gid,
                    },
                });

                if (response.data.error) {
                    alert(response.data.error);
                } else {
                    console.log(response.data.transports);
                    setTransports(response.data.transports);
                }
            } catch (error) {
                alert("User Family Transport Error");
            }
        };
        fetchData();
    }, [tdummy]);

    const updateStateTransport = (id, number, type, formName) => {
        setTid(id);
        setTplateNumber(number);
        setTtype(type);

        if (formName != '')
            document.getElementById(formName).reset();
    };

    const submitAdd = (e) => {
        const submit = async () => {
            try {
                const response = await axios({
                    method: "POST",
                    url: BASE_URL + "/add_transport/",
                    data: {
                        number_plate: tplateNumber,
                        type: ttype,
                        group_id: groupid
                    }
                });
                console.log(response.data);
            } catch (error) {
                alert("Add User Transport Failed!");
            }
        }
        submit();
        setTdummy(tdummy ^ 1);
    };

    const submitDelete = () => {
        const submit = async () => {
            try {
                const response = await axios({
                    method: "POST",
                    url: BASE_URL + "/delete_transport/",
                    data: {
                        transport_id: tid
                    }
                });
                console.log(response.data);
            } catch (error) {
                alert("Delete User Transport Failed!");
            }
        }
        submit();
        setTdummy(tdummy ^ 1);
    };

    return (
        <div>
            <h1>
                <strong>Danh sách phương tiện của gia đình</strong>
            </h1>

            <div className="add-department">
                <button type="button" className="btn btn-success rounded-pill" data-bs-toggle="modal" data-bs-target="#addTransport" onClick={() => updateStateTransport('', '', '', "addTransportForm")}>
                    <strong>Thêm phương tiện </strong>
                    <FaPlus
                        style={{
                            fontSize: "1.25rem",
                            color: "black",
                        }}
                    />
                </button>
            </div>
            <div className="modal fade" id="addTransport" aria-labelledby="addTransport" aria-hidden="true" tabIndex={-1} role="dialog">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel"><strong>Thêm phương tiện</strong> </h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form id="addTransportForm" onSubmit={submitAdd}>
                                <div className="form-group mt-3">
                                    <div className="col">
                                        <label>Biển số xe</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="30A-010-100"
                                            onChange={(e) => setTplateNumber(e.target.value)}
                                        />
                                    </div>
                                    <div className="col">
                                        <label>Loại phương tiện</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Xe máy"
                                            onChange={(e) => setTtype(e.target.value)}
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
                                <strong>Biển số xe</strong>
                            </StyledTableCell>
                            <StyledTableCell
                                align="left"
                                style={{ fontSize: "0.9rem", padding: "10px" }}
                            >
                                <strong>Loại xe</strong>
                            </StyledTableCell>
                            <StyledTableCell align="right"></StyledTableCell>
                            <StyledTableCell align="left"></StyledTableCell>
                        </StyledTableRow>
                    </TableHead>
                    <TableBody style={{ width: "100%" }}>
                        {transports.map((transport, index) => (
                            <StyledTableRow
                                key={transport.id}
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
                                    {transport.number_plate}
                                </StyledTableCell>
                                <StyledTableCell
                                    align="left"
                                    style={{ fontSize: "0.9rem", padding: "10px" }}
                                >
                                    {transport.type}
                                </StyledTableCell>
                                <StyledTableCell
                                    align="left"
                                    style={{ fontSize: "0.9rem", padding: "10px" }}
                                >
                                    <div>
                                        <a
                                            data-bs-toggle="modal" data-bs-target="#confirmDeleteTransport" onClick={() => updateStateTransport(transport.id, transport.number_plate, transport.type, '')}
                                        >
                                            <FaTrashAlt
                                                style={{ fontSize: "1.5rem", color: "#E32929" }}
                                                className="delete-row"
                                            />
                                        </a>

                                        <div className="modal fade" id="confirmDeleteTransport" aria-labelledby="confirmDeleteTransport" aria-hidden="true" tabIndex={-1} role="dialog">
                                            <div className="modal-dialog modal-sm">
                                                <div className="modal-content">
                                                    <div className="modal-header">
                                                        <h5 className="modal-title" id="exampleModalLabel"><strong>Xác nhận xóa phương tiện</strong> </h5>
                                                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                    </div>
                                                    <div className="modal-body">
                                                        Xác nhận xóa phương tiện <strong>{ttype}</strong> có biển số <strong>{tplateNumber}</strong>
                                                    </div>
                                                    <div className="modal-footer">
                                                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Hủy</button>
                                                        <button type="button" className="btn btn-primary" data-bs-dismiss="modal" style={{ backgroundColor: "red" }} onClick={() => submitDelete()}> Xóa phương tiện </button>
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
