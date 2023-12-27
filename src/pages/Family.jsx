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

export const Family = () => {
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
        
        </div>
    </div>
  );
};
