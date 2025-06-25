import React, { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AuthService from "./services/auth.service";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Developer from "./pages/Developer";
import Manager from "./pages/Manager";
import SA from "./pages/SA";
import CreateUser from "./pages/CreateUser";
import CreateProject from "./pages/CreateProject";
import ProjectList from "./pages/ProjectList";
import ProjectDetails from "./pages/ProjectDetails";
import ResourceAllocation from "./pages/ResourceAllocation";

const App = () => {
  const [showManagerBoard, setShowManagerBoard] = useState(false);
  const [showSABoard, setShowSABoard] = useState(false);
  const [showDeveloperBoard, setShowDeveloperBoard] = useState(false);
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
      setShowManagerBoard(user.roles.includes("ROLE_MANAGER"));
      setShowSABoard(user.roles.includes("ROLE_SA"));
      setShowDeveloperBoard(user.roles.includes("ROLE_DEVELOPER"));
    }
  }, []);

  const logOut = () => {
    AuthService.logout();
  };

  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <Link to={"/"} className="navbar-brand">
          Project Mgmt
        </Link>
        <div className="navbar-nav me-auto">
          <li className="nav-item">
            <Link to={"/home"} className="nav-link">
              Home
            </Link>
          </li>

          {showManagerBoard && (
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Project Management
              </a>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                <li><Link to={"/manager"} className="dropdown-item">Manager Board</Link></li>
                <li><Link to={"/create-project"} className="dropdown-item">Create Project</Link></li>
                <li><Link to={"/projects"} className="dropdown-item">Project List</Link></li>
                <li><Link to={"/resource-allocation"} className="dropdown-item">Resource Allocation</Link></li>
              </ul>
            </li>
          )}

          {showSABoard && (
            <li className="nav-item">
              <Link to={"/sa"} className="nav-link">
                SA Board
              </Link>
            </li>
          )}

          {showSABoard && (
            <li className="nav-item">
              <Link to={"/createuser"} className="nav-link">
                Create User
              </Link>
            </li>
          )}

          {showDeveloperBoard && !showManagerBoard && (
            <li className="nav-item">
              <Link to={"/dev"} className="nav-link">
                Developer Board
              </Link>
            </li>
          )}
        </div>

        {currentUser ? (
          <div className="navbar-nav ms-auto">
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownUser" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                <img src="/avatar.png" alt="User Avatar" style={{width: '30px', height: '30px', borderRadius: '50%'}} />
              </a>
              <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdownUser">
                <li>
                  <Link to={"/profile"} className="dropdown-item">
                    {currentUser.username}
                  </Link>
                </li>
                <li>
                  <a href="/login" className="dropdown-item" onClick={logOut}>
                    LogOut
                  </a>
                </li>
              </ul>
            </li>
          </div>
        ) : (
          <div className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link to={"/login"} className="nav-link">
                Login
              </Link>
            </li>

            <li className="nav-item">
              <Link to={"/register"} className="nav-link">
                Sign Up
              </Link>
            </li>
          </div>
        )}
      </nav>

      <div className="container mt-3">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/dev" element={<Developer />} />
          <Route path="/manager" element={<Manager />} />
          <Route path="/sa" element={<SA />} />
          <Route path="/createuser" element={<CreateUser />} />
          <Route path="/create-project" element={<CreateProject />} />
          <Route path="/projects" element={<ProjectList />} />
          <Route path="/projects/:id" element={<ProjectDetails />} />
          <Route path="/resource-allocation" element={<ResourceAllocation />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
