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
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
      setShowManagerBoard(user.roles.includes("ROLE_MANAGER"));
      setShowSABoard(user.roles.includes("ROLE_SA"));
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
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/home"} className="nav-link">
              Home
            </Link>
          </li>

          {showManagerBoard && (
            <li className="nav-item">
              <Link to={"/manager"} className="nav-link">
                Manager Board
              </Link>
            </li>
          )}

          {showManagerBoard && (
            <li className="nav-item">
              <Link to={"/create-project"} className="nav-link">
                Create Project
              </Link>
            </li>
          )}

          {showManagerBoard && (
            <li className="nav-item">
              <Link to={"/projects"} className="nav-link">
                Project List
              </Link>
            </li>
          )}

          {showManagerBoard && (
            <li className="nav-item">
              <Link to={"/resource-allocation"} className="nav-link">
                Resource Allocation
              </Link>
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

          {currentUser && (
            <li className="nav-item">
              <Link to={"/dev"} className="nav-link">
                Developer Board
              </Link>
            </li>
          )}
        </div>

        {currentUser ? (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/profile"} className="nav-link">
                {currentUser.username}
              </Link>
            </li>
            <li className="nav-item">
              <a href="/login" className="nav-link" onClick={logOut}>
                LogOut
              </a>
            </li>
          </div>
        ) : (
          <div className="navbar-nav ml-auto">
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
