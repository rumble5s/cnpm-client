import axios from 'axios';
import React, { useEffect } from "react";
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

import { UserRoomRegisters } from '../components/UserRoomRegisters';
import { UserRoomViewList } from '../components/UserRoomViewList';

export const UserDepartment = () => {
  const [dummy, setDummy] = useState(false);

  return (
    <div className="wrapper">
    <aside id="sidebar" className="js-sidebar user">
        {/* Content For Sidebar */}
        <Logout/>
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
              <Link className="link-secondary sidebar-link current-site" to="/udepartment">
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
        <main className="content px-3 py-4 pb-4">
          <UserRoomRegisters dummy={dummy} refresh={() => setDummy(dummy ^ 1)}/>
          <br/>
          <UserRoomViewList dummy={dummy} refresh={() => setDummy(dummy ^ 1)}/>
        </main>
      </div>
    </div>
  );
};
