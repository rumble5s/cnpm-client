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

export const AdminViewFamilyTransports = ({transports}) => {
  return (
    <div>
      <h4><strong>Danh sách phương tiện của gia đình</strong></h4>
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
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};
