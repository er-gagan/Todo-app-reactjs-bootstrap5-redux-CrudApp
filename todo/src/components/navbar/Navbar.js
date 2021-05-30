import React from 'react'
import userImage from './user.png'
import { Link } from "react-router-dom";
const Navbar = () => {
    
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">Home</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            
                        </ul>
                        <div className="btn-group">
                            <Link to="/" className="dropdown" data-bs-toggle="dropdown" data-bs-display="static" aria-expanded="false">
                                <img style={{ width: "40px", border: "2px solid white", borderRadius: "50%", backgroundColor: "white" }} src={userImage} alt="NoImage" />
                            </Link>
                            <ul className="dropdown-menu dropdown-menu-lg-end dropdown-menu-dark">
                                <li><Link className="dropdown-item" to="/login">Login</Link></li>
                                <li><Link className="dropdown-item" to="/signup">Signup</Link></li>
                                <li><Link className="dropdown-item" to="/changePassword">Change Password</Link></li>
                                <li><Link className="dropdown-item" to="/forgotPassword">Forgot Password</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar
