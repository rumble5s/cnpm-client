import React from "react";
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

//Chart:
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { Data } from "../components/DataLineChart";
import { Line } from "react-chartjs-2";

export const AdminPage = () => {
  return (
    <div className="wrapper">
      <aside id="sidebar" className="js-sidebar">
        {/* Content For Sidebar */}
        <div className="h-100">
          <div className="sidebar-logo">
            <a className="text-center" href="#">
              Admin
            </a>
          </div>
          <ul className="sidebar-nav">
            <li className="sidebar-item">
              <Link className="sidebar_link" to="/admin">
                <button className="btn btn-light current-site">
                  <FaHome className="icon-sidebar" />
                  Trang chủ
                </button>
              </Link>
            </li>
            <li className="sidebar-item">
              <Link className="sidebar-link" to="/department">
                <FaBuilding className="icon-sidebar" />
                Danh sách căn hộ
              </Link>
            </li>

            <li className="sidebar-item">
              <a href="#" className="sidebar-link">
                <MdOutlineFamilyRestroom className="icon-sidebar" />
                Hộ gia đình
              </a>
            </li>
            <li className="sidebar-item">
              <a href="#" className="sidebar-link">
                <MdOutlineCreditCard className="icon-sidebar" />
                Thông tin thu phí
              </a>
            </li>
            <li className="sidebar-item">
              <a href="#" className="sidebar-link">
                <RiComputerFill className="icon-sidebar" />
                Danh sách đăng ký
              </a>
            </li>
            <li className="sidebar-item">
              <a href="#" className="sidebar-link">
                <RiMotorbikeFill className="icon-sidebar" />
                Phí trông xe
              </a>
            </li>
          </ul>
        </div>
      </aside>
      <div className="main">
        <main className="content px-3 py-2">
          <div className="container-fluid">
            <h4 className="block-item">Thống kê</h4>
            <div className="container text-center">
              <div class="row">
                <div class="col-xl-3 col-md-6 mb-4">
                  <div class="card border-left-primary shadow h-100 py-2">
                    <div class="card-body">
                      <div class="row no-gutters align-items-center">
                        <div class="col mr-2">
                          <div class="text-xs font-weight-bold text-primary text-uppercase mb-1">
                            <strong>Căn hộ (đã thuê)</strong>
                          </div>
                          <div class="h2 mb-0 font-weight-bold text-gray-800">
                            40
                          </div>
                        </div>
                        <div class="col-auto">
                          <i
                            class="bi bi-house"
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

                <div class="col-xl-3 col-md-6 mb-4">
                  <div class="card border-left-success shadow h-100 py-2">
                    <div class="card-body">
                      <div class="row no-gutters align-items-center">
                        <div class="col mr-2">
                          <div class="text-xs font-bold text-success text-uppercase mb-1">
                            <strong>Nhân khẩu</strong>
                          </div>
                          <div class="h2 mb-0 font-weight-bold text-gray-800">
                            400
                          </div>
                        </div>
                        <div class="col-auto">
                          <i
                            class="bi bi-people"
                            style={{ fontSize: "4rem", color: "green" }}
                          ></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="col-xl-3 col-md-6 mb-4">
                  <div class="card border-left-info shadow h-100 py-2">
                    <div class="card-body">
                      <div class="row no-gutters align-items-center">
                        <div class="col mr-2">
                          <div class="text-xs font-weight-bold text-info text-uppercase mb-1">
                            <strong>Phương tiện</strong>
                          </div>
                          <div class="h2 mb-0 font-weight-bold text-gray-800">
                            350
                          </div>
                        </div>
                        <div class="col-auto">
                          <i
                            class="bi bi-truck"
                            style={{ fontSize: "4rem", color: "#17a2b8" }}
                          ></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="col-xl-3 col-md-6 mb-4">
                  <div class="card border-left-warning shadow h-100 py-2">
                    <div class="card-body">
                      <div class="row no-gutters align-items-center">
                        <div class="col mr-2">
                          <div class="text-xs font-weight-bold text-warning text-uppercase mb-1">
                            <strong>
                              Doanh thu
                              <br />
                              (năm ngoái)
                            </strong>
                          </div>
                          <div class="h3 mb-0 font-weight-bold text-gray-800">
                            1,000 Tr VND
                          </div>
                        </div>
                        <div class="col-auto">
                          <i
                            class="bi bi-piggy-bank"
                            style={{ fontSize: "4rem", color: "orange" }}
                          ></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className="card shadow mb-4" style={{width: "70rem", height: "25rem"}}>
                <div className="card-header py-3">
                  <h6 className="m-0 font-weight-bold text-primary">
                    Doanh thu chung cư (2050)
                  </h6>
                </div>
                <div className="card-body">
                  <div className="chart-area">
                    <Line
                      options={{ maintainAspectRatio: false }}
                      data={{
                        labels: Data.map((data) => data.label),
                        datasets: [
                          {
                            label: "Đơn vị: Triệu VND",
                            data: Data.map((data) => data.value),
                            backgroundColor: [
                              "rgba(75,192,192,1)",
                              "#ecf0f1",
                              "#50AF95",
                              "#f3ba2f",
                              "#2a71d0",
                            ],
                            borderColor: "black",
                            borderWidth: 2,
                          },
                        ],
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
        <a href="#" className="theme-toggle">
          <i className="fa-regular fa-moon" />
          <i className="fa-regular fa-sun" />
        </a>
      </div>
    </div>
  );
};
