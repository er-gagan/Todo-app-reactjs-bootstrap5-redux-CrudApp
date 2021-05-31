import React, { useState, useEffect } from 'react'
// import { showToast, toastContentForSuccess, toastContentForFailure } from './validation'
import { showToast, toastContentForFailure } from './validation'
import { Link, Redirect } from "react-router-dom";
import Navbar from '../navbar/Navbar';

const Login = () => {
    const [userEmailPhone, setUserEmailPhone] = useState('')
    const [password, setPassword] = useState('')
    const [toastTrigger, setToastTrigger] = useState(false)
    const [token, setToken] = useState(localStorage.getItem('token'))

    const submitForm = (e) => {
        e.preventDefault()
        let userLogin = {
            "username": userEmailPhone,
            "password": password
        }
        fetch('http://127.0.0.1:8000/api/login', {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userLogin)
        }).then((result) => {
            if (result.status === 200) {
                result.json().then((response) => {
                    let _token = response.access
                    localStorage.setItem("token", _token)
                    setToken(_token)
                })
            }
            else {
                toastContentForFailure()
                localStorage.clear()
            }
            setToastTrigger(true)
        })
    }
    useEffect(() => {
        if (token === null) {
            if ((userEmailPhone.length < 5) || (password.length < 5)) {
                document.getElementById("liveToastBtn").disabled = true
            }
            else {
                document.getElementById("liveToastBtn").disabled = false
            }
        }
    }, [userEmailPhone, password, token]);

    useEffect(() => {
        if (token === null) {
            showToast()
        }
    }, [toastTrigger, token]);

    return (
        <>
        <Navbar/>
            {(token !== null) ?
                <Redirect to="/"></Redirect>
                :
                <div className="container my-2">
                    <h3>Login Form</h3>
                    <form onSubmit={submitForm}>
                        <div className="mb-3">
                            <span style={{ color: "red", fontWeight: "bolder" }}>*</span>&nbsp;<label htmlFor="name" className="form-label">Enter Username, Email or Phone</label>
                            <input required autoFocus type="text" className="form-control" id="name" placeholder="Please type your username, email or phone" onChange={(e) => setUserEmailPhone(e.target.value)} value={userEmailPhone} />
                        </div>

                        <div className="mb-3">
                            <span style={{ color: "red", fontWeight: "bolder" }}>*</span>&nbsp;<label htmlFor="password" className="form-label">Password</label>
                            <input required type="password" className="form-control" id="password" placeholder="Please type password" onChange={(e) => setPassword(e.target.value)} value={password} />
                        </div>
                        <div className="text-center">
                            <input type="submit" value="Submit" id="liveToastBtn" className="btn btn-danger btn-sm w-25" />
                        </div>
                    </form>
                    <div className="text-center">
                        <Link to="/signup">You don't have an account? Sign up</Link>
                    </div>

                    {/* Show Toast */}
                    <div className="position-fixed bottom-0 end-0 p-3" style={{ zIndex: 5 }}>
                        <div id="liveToast" className="toast hide">
                            <div style={{ fontSize: "5px" }} id="toastLine" className="px-1">&nbsp;</div>
                            <div className="toast-header">
                                <i className="material-icons rounded me-2" id="setIcon"></i>
                                <strong id="toastTitle" className="me-auto"></strong>
                                <small>1 seconds ago</small>
                                <input type="button" id="closeId" className="btn-close" />
                            </div>
                            <div id="toastDesc" className="toast-body">
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default Login
