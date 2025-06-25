import React, { useState } from "react";
import AdminService from "../services/admin.service";

const CreateUser = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [userFunction, setUserFunction] = useState("Programmer");
    const [phone, setPhone] = useState("");
    const [role, setRole] = useState("developer");
    const [successful, setSuccessful] = useState(false);
    const [message, setMessage] = useState("");

    const handleCreateUser = (e) => {
        e.preventDefault();

        setMessage("");
        setSuccessful(false);

        AdminService.createUser(username, email, password, [role], firstName, lastName, userFunction, phone).then(
            (response) => {
                setMessage(response.data.message);
                setSuccessful(true);
            },
            (error) => {
                const resMessage =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();

                setMessage(resMessage);
                setSuccessful(false);
            }
        );
    };

    return (
        <div className="col-md-12">
            <div className="card card-container">
                <form onSubmit={handleCreateUser}>
                    <div>
                        <div className="form-group">
                            <label htmlFor="username">Username</label>
                            <input
                                type="text"
                                className="form-control"
                                name="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                className="form-control"
                                name="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                className="form-control"
                                name="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="firstName">First Name</label>
                            <input
                                type="text"
                                className="form-control"
                                name="firstName"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="lastName">Last Name</label>
                            <input
                                type="text"
                                className="form-control"
                                name="lastName"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="phone">Phone Number</label>
                            <input
                                type="text"
                                className="form-control"
                                name="phone"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="userFunction">Function</label>
                            <select name="userFunction" className="form-control" value={userFunction} onChange={(e) => setUserFunction(e.target.value)}>
                                <option value="Programmer">Programmer</option>
                                <option value="Tester">Tester</option>
                                <option value="Lead">Lead</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label htmlFor="role">Role</label>
                            <select name="role" className="form-control" value={role} onChange={(e) => setRole(e.target.value)}>
                                <option value="developer">Developer</option>
                                <option value="manager">Manager</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <button className="btn btn-primary btn-block">Create User</button>
                        </div>
                    </div>

                    {message && (
                        <div className="form-group">
                            <div
                                className={successful ? "alert alert-success" : "alert alert-danger"}
                                role="alert"
                            >
                                {message}
                            </div>
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
};

export default CreateUser;
