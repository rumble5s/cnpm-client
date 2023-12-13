import React from "react";
import { ReactDOM } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/Admin.css";
import "../components/AdminNavBar";

export const AdminPage = () => {
  return (
    <div className="wrapper">
      <aside id="sidebar" className="js-sidebar">
        {/* Content For Sidebar */}
        <div className="h-100">
          <div className="sidebar-logo">
            <a href="#">Admin</a>
          </div>
          <ul className="sidebar-nav">
            <li className="sidebar-header">Admin Elements</li>
            <li className="sidebar-item">
              <a href="#" className="sidebar-link">
                <i className="fa-solid fa-list pe-2" />
                Dashboard
              </a>
            </li>
            <li className="sidebar-item">
              <a href="#" className="sidebar-link">
                <i className="fa-solid fa-file-lines pe-2" />
                Pages
              </a>
              {/* <ul id="pages" className="sidebar-dropdown list-unstyled collapse" data-bs-parent="#sidebar">
                  <li className="sidebar-item">
                    <a href="#" className="sidebar-link">Page 1</a>
                  </li>
                  <li className="sidebar-item">
                    <a href="#" className="sidebar-link">Page 2</a>
                  </li>
                </ul> */}
            </li>
            <li className="sidebar-item">
              <a href="#" className="sidebar-link">
                <i className="fa-solid fa-sliders pe-2" />
                Posts
              </a>
              {/* <ul id="posts" className="sidebar-dropdown list-unstyled collapse" data-bs-parent="#sidebar">
                  <li className="sidebar-item">
                    <a href="#" className="sidebar-link">Post 1</a>
                  </li>
                  <li className="sidebar-item">
                    <a href="#" className="sidebar-link">Post 2</a>
                  </li>
                  <li className="sidebar-item">
                    <a href="#" className="sidebar-link">Post 3</a>
                  </li>
                </ul> */}
            </li>
            <li className="sidebar-item">
              <a href="#" className="sidebar-link">
                <i className="fa-regular fa-user pe-2" />
                Auth
              </a>
              {/* <ul id="auth" className="sidebar-dropdown list-unstyled collapse" data-bs-parent="#sidebar">
                  <li className="sidebar-item">
                    <a href="#" className="sidebar-link">Login</a>
                  </li>
                  <li className="sidebar-item">
                    <a href="#" className="sidebar-link">Register</a>
                  </li>
                  <li className="sidebar-item">
                    <a href="#" className="sidebar-link">Forgot Password</a>
                  </li>
                </ul> */}
            </li>
          </ul>
        </div>
      </aside>
      <div className="main">
        {/* <nav className="navbar navbar-expand px-3 border-bottom">
            <button className="btn" id="sidebar-toggle" type="button">
              <span className="navbar-toggler-icon" />
            </button>
            <div className="navbar-collapse navbar">
              <ul className="navbar-nav">
                <li className="nav-item dropdown">
                  <a href="#" data-bs-toggle="dropdown" className="nav-icon pe-md-0">
                    <img src="image/profile.jpg" className="avatar img-fluid rounded" alt="" />
                  </a>
                  <div className="dropdown-menu dropdown-menu-end">
                    <a href="#" className="dropdown-item">Profile</a>
                    <a href="#" className="dropdown-item">Setting</a>
                    <a href="#" className="dropdown-item">Logout</a>
                  </div>
                </li>
              </ul>
            </div>
          </nav> */}
        <main className="content px-3 py-2">
          <div className="container-fluid">
            <div className="mb-3">
              <h4>Admin Dashboard</h4>
            </div>
            <div className="container text-center">
              <div class="row">
                <div class="col">
                  <div className="card" style={{ width: "20rem", height: "13rem" }}>
                    <div className="card-body">
                      <h5 className="card-title">32</h5>
                      <h6 className="card-subtitle mb-2 text-body-secondary">
                        Căn hộ
                      </h6>
                      <i className="bi bi-house" style={{fontSize: '4rem', color: 'cornflowerblue'}}></i>
                    </div>
                  </div>
                </div>
                <div class="col">
                <div className="card" style={{ width: "20rem", height: "13rem" }}>
                    <div className="card-body">
                      <h5 className="card-title">73</h5>
                      <h6 className="card-subtitle mb-2 text-body-secondary">
                        Cư dân
                      </h6>
                      <i class="bi bi-people" style={{fontSize: '4rem', color: 'cornflowerblue'}}></i>
                    </div>
                  </div>
                </div>
                <div class="col">
                <div className="card" style={{ width: "20rem", height: "13rem" }}>
                    <div className="card-body">
                      <h5 className="card-title">9</h5>
                      <h6 className="card-subtitle mb-2 text-body-secondary">
                        Phương tiện
                      </h6>
                      <p className="card-text">
                      <i class="bi bi-bicycle" style={{fontSize: '4rem', color: 'cornflowerblue'}}></i>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Table Element */}
            <div className="card border-0">
              <div className="card-header">
                <h5 className="card-title">Thống kê</h5>
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
            </div>
          </div>
        </main>
        <a href="#" className="theme-toggle">
          <i className="fa-regular fa-moon" />
          <i className="fa-regular fa-sun" />
        </a>
        <footer className="footer">
          <div className="container-fluid">
            <div className="row text-muted">
              <div className="col-6 text-start">
                <p className="mb-0">
                  <a href="#" className="text-muted">
                    <strong>CodzSwod</strong>
                  </a>
                </p>
              </div>
              <div className="col-6 text-end">
                <ul className="list-inline">
                  <li className="list-inline-item">
                    <a href="#" className="text-muted">
                      Contact
                    </a>
                  </li>
                  <li className="list-inline-item">
                    <a href="#" className="text-muted">
                      About Us
                    </a>
                  </li>
                  <li className="list-inline-item">
                    <a href="#" className="text-muted">
                      Terms
                    </a>
                  </li>
                  <li className="list-inline-item">
                    <a href="#" className="text-muted">
                      Booking
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};
