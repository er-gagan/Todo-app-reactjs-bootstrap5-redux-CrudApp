import React, { useState } from 'react'
const Login = () => {
    const [userEmailPhone, setUserEmailPhone] = useState('')
    const [password, setPassword] = useState('')

    const submitForm = (e) => {
        e.preventDefault()
        console.log(userEmailPhone, password);
    }
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
                    <input required type="text" className="form-control" id="password" placeholder="Please type password" onChange={(e) => setPassword(e.target.value)} value={password} />
                </div>
            </form>
            <div className="text-center">
                <input type="submit" value="Submit" className="btn btn-danger" />
            </div>
        </div>
    )
}

export default Login
