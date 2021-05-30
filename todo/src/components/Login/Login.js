import React, { useState, useEffect } from 'react'
import { showToast, toastContentForSuccess, toastContentForFailure } from './validation'

const Login = () => {
    const [userEmailPhone, setUserEmailPhone] = useState('')
    const [password, setPassword] = useState('')
    const [toastTrigger, setToastTrigger] = useState(false)

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
                    let token = response.access
                    localStorage.setItem("token", token)
                    toastContentForSuccess()
                })
            }
            else {
                toastContentForFailure()
            }
            setToastTrigger(true)
        })
    }

    useEffect(() => {
        showToast()
    }, [toastTrigger]);

    return (

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
            <span ></span>

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
    )
}

export default Login
