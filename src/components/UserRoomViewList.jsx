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

export const UserRoomViewList = ({dummy, refresh}) => {
  const BASE_URL = "http://localhost:8000";
  const [rooms, setRooms] = useState([]);
  const [groupid, setGroupid] = useState("");

  const [roomDummy, setRoomDummy] = useState(true);

  const [roomid, setRoomid] = useState("");
  const [roomname, setRoomname] = useState("");

  const [filter, setFilter] = useState('');

  useEffect(() => {
    const gid = JSON.parse(localStorage.getItem("groupid")).group_id;
    setGroupid(gid);
    const fetchData = async () => {
      try {
        console.log(gid);
        const response = await axios({
          method: "GET",
          url: BASE_URL + "/get_rooms/",
        });

        if (response.data.error) {
          alert(response.data.error);
        } else {
          console.log(response.data.rooms);
          setRooms(response.data.rooms);
        }
      } catch (error) {
        alert("User Room List View Error");
      }
    };
    fetchData();
  }, [roomDummy, dummy]);

  useEffect(() => {

  }, [filter]);

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
    refresh();
    setRoomRegisterDummy(roomRegisterDummy ^ 1);
  };

  return (
    <div>
      <h1>
        <strong>Danh sách căn hộ có thể đăng ký</strong>
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
                            <h5 className="modal-title" id="exampleModalLabel"><strong>Xác nhận đăng k</strong> </h5>
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
