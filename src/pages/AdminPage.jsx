import React from "react";
import { ReactDOM } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/Admin.css";

export const AdminPage = () => {
  return (
    <div className="bg">
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
                <a href="#" className="sidebar-link">
                  Trang chủ
                </a>
              </li>
              <li className="sidebar-item">
                <a href="#" className="sidebar-link">
                  Danh sách căn hộ
                </a>
              </li>

              <li className="sidebar-item">
                <a href="#" className="sidebar-link">
                  Danh sách hộ gia đình
                </a>
              </li>
              <li className="sidebar-item">
                <a href="#" className="sidebar-link">
                  Thông tin thu phí
                </a>
              </li>
              <li className="sidebar-item">
                <a href="#" className="sidebar-link">
                  Danh sách đăng ký
                </a>
              </li>
              <li className="sidebar-item">
                <a href="#" className="sidebar-link">
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
                              1,000 M VND
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
              <div class="col-lg-7">
                <div class="card z-index-2">
                  <div class="card-header pb-0">
                    <h6>Sales overview</h6>
                    <p class="text-sm">
                      <i class="fa fa-arrow-up text-success"></i>
                      <span class="font-weight-bold">4% more</span> in 2021
                    </p>
                  </div>
                  <div class="card-body p-3">
                    <div class="chart">
                      <canvas
                        id="chart-line"
                        class="chart-canvas"
                        height="300"
                      ></canvas>
                    </div>
                  </div>
                </div>
              </div>
              {/* Table Element */}
              {/* <div className="card border-0">
                <div className="card-header">
                  <h5 className="card-title" style={{ fontSize: "1.25rem" }}>
                    Thống kê
                  </h5>
                </div>
                <div className="card-body">
                  <table className="table">
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">First</th>
                        <th scope="col">Last</th>
                        <th scope="col">Handle</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th scope="row">1</th>
                        <td>Mark</td>
                        <td>Otto</td>
                        <td>@mdo</td>
                      </tr>
                      <tr>
                        <th scope="row">2</th>
                        <td>Jacob</td>
                        <td>Thornton</td>
                        <td>@fat</td>
                      </tr>
                      <tr>
                        <th scope="row">3</th>
                        <td colSpan={2}>Larry the Bird</td>
                        <td>@twitter</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div> */}
            </div>
          </main>
          <a href="#" className="theme-toggle">
            <i className="fa-regular fa-moon" />
            <i className="fa-regular fa-sun" />
          </a>
        </div>
      </div>
    </div>
  );
};
