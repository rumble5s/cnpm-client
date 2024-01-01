import axios from 'axios';
import React, { useEffect } from "react";
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

export const UserMain = () => {
  const BASE_URL = "http://localhost:8000";
  const [room, setRoom] = useState({});
  const [persons, setPersons] = useState([]);
  const [transports, setTransports] = useState([]);

  const [groupid, setGroupid] = useState("");
  const [fetched, setFetched] = useState(false);

  useEffect(() => {
    const gid = JSON.parse(localStorage.getItem("groupid")).group_id;
    setGroupid(gid);
    const fetchRoomData = async () => {
      try {
        console.log(gid);
        const response = await axios({
          method: "POST",
          url: BASE_URL + "/get_own_room/",
          data: {
            group_id: gid,
          }
        });

        if (response.data.error) {
          alert(response.data.error);
        } else {
          console.log(response.data.room);
          setRoom(response.data.room);
        }
      } catch (error) {
        alert("User Own Room Error");
      }
    };
    const fetchPersonsData = async () => {
      try {
        console.log(gid);
        const response = await axios({
          method: "POST",
          url: BASE_URL + "/get_persons/",
          data: {
            group_id: gid,
          }
        });

        if (response.data.error) {
          alert(response.data.error);
        } else {
          console.log(response.data.persons);
          setPersons(response.data.persons);
        }
      } catch (error) {
        alert("User Family Main Page Error");
      }
    };
    const fetchTransportsData = async () => {
      try {
        console.log(gid);
        const response = await axios({
          method: "POST",
          url: BASE_URL + "/get_transports/",
          data: {
            group_id: gid,
          }
        });

        if (response.data.error) {
          alert(response.data.error);
        } else {
          console.log(response.data.transports);
          setTransports(response.data.transports);
        }
      } catch (error) {
        alert("User Transport Main Page Error");
      }
    };
    fetchRoomData();
    fetchPersonsData();
    fetchTransportsData();
    setFetched(true);
  }, [])

  if (!fetched) {
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
                <Link className="link-secondary sidebar-link current-site" to="/user">
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
                <Link className="link-secondary sidebar-link" to="/family">
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

        </div>
      </div>
    );
  }

  return room === null ? (
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
              <Link className="link-secondary sidebar-link current-site" to="/user">
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
              <Link className="link-secondary sidebar-link" to="/family">
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
        <main className="content px-3 py-2">
          <h1>Xin chào</h1>
          <h5>Hệ thống không xác nhận được thông tin căn hộ bạn sở hữu.</h5>
          <h5>Vui lòng chọn thanh "Danh sách căn hộ" để tiến hành xem và gửi yêu cầu đăng ký</h5>
        </main>
      </div>
    </div>
  ) : (
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
              <Link className="link-secondary sidebar-link current-site" to="/user">
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
              <Link className="link-secondary sidebar-link" to="/family">
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
        <main className="content px-3 py-2">
          <h1>Xin chào gia đình căn hộ số {room.name}</h1>
          <div className="container-fluid">
            <h1 className="content block-item"><strong>Thông tin cơ bản</strong></h1>
            <div className="container text-center">
              <div className="row">
                <div className="col-xl-3 col-md-6 mb-4">
                  <div className="card border-left-primary shadow h-100 py-2">
                    <div className="card-body">
                      <div className="row no-gutters align-items-center">
                        <div className="col mr-2">
                          <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                            <strong>Tên căn hộ <br/> (số phòng)</strong>
                          </div>
                          <div className="h2 mb-0 font-weight-bold text-gray-800">
                            {room.name}
                          </div>
                        </div>
                        <div className="col-auto">
                          <i
                            className="bi bi-house"
                            style={{
                              fontSize: "4rem",
                              color: "cornflowerblue",
                            }}
                          ></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-xl-3 col-md-6 mb-4">
                  <div className="card border-left-success shadow h-100 py-2">
                    <div className="card-body">
                      <div className="row no-gutters align-items-center">
                        <div className="col mr-2">
                          <div className="text-xs font-bold text-success text-uppercase mb-1">
                            <strong>Số thành viên <br/> trong gia đình</strong>
                          </div>
                          <div className="h2 mb-0 font-weight-bold text-gray-800">
                            {persons.length}
                          </div>
                        </div>
                        <div className="col-auto">
                          <i
                            className="bi bi-people"
                            style={{ fontSize: "4rem", color: "green" }}
                          ></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-xl-3 col-md-6 mb-4">
                  <div className="card border-left-info shadow h-100 py-2">
                    <div className="card-body">
                      <div className="row no-gutters align-items-center">
                        <div className="col mr-2">
                          <div className="text-xs font-weight-bold text-info text-uppercase mb-1">
                            <strong>Số Phương tiện</strong>
                          </div>
                          <div className="h2 mb-0 font-weight-bold text-gray-800">
                            {transports.length}
                          </div>
                        </div>
                        <div className="col-auto">
                          <i
                            className="bi bi-truck"
                            style={{ fontSize: "4rem", color: "#17a2b8" }}
                          ></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-xl-3 col-md-6 mb-4">
                  <div className="card border-left-warning shadow h-100 py-2">
                    <div className="card-body">
                      <div className="row no-gutters align-items-center">
                        <div className="col mr-2">
                          <div className="text-xs font-weight-bold text-warning text-uppercase mb-1">
                            <strong>
                              Tiền dịch vụ
                              <br />
                              (không bao gồm điện, nước)
                            </strong>
                          </div>
                          <div className="h3 mb-0 font-weight-bold text-gray-800">
                            {parseInt(room.price)}đ
                          </div>
                        </div>
                        <div className="col-auto">
                          <i
                            className="bi bi-piggy-bank"
                            style={{ fontSize: "4rem", color: "orange" }}
                          ></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            </div>
        </main>
      </div>
    </div>
  );
};
