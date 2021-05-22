import React, { useState } from 'react'
const ForgotPassword = () => {
    const [email, setEmail] = useState('')
    const [emailOtp, setEmailOtp] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const emailSubmit = (e) => {
        e.preventDefault()
        console.log(email);
    }
    const otpSubmit = (e) => {
        e.preventDefault()
        console.log(emailOtp);
    }
    const passwordSubmit = (e) => {
        e.preventDefault()
        console.log(password, confirmPassword);
    }

    return (
        <div className="container my-2">
            <h3>Forgot Password</h3>
            <form onSubmit={emailSubmit}>
                <div className="mb-3">
                    <span style={{ color: "red", fontWeight: "bolder" }}>*</span>&nbsp;<label htmlFor="email" className="form-label">Email address</label>
                    <input autoFocus required type="email" className="form-control" id="email" placeholder="name@example.com" onChange={(e) => setEmail(e.target.value)} value={email} />
                </div>

                <div className="text-center">
                    <input type="submit" value="Submit Email" className="btn btn-danger btn-sm w-25" />
                </div>
            </form>

            <form onSubmit={otpSubmit}>
                <div className="mb-3">
                    <span style={{ color: "red", fontWeight: "bolder" }}>*</span>&nbsp;<label htmlFor="emailOtp" className="form-label">Enter Otp</label>
                    <input required type="text" className="form-control" id="emailOtp" placeholder="Otp sent your given email" onChange={(e) => setEmailOtp(e.target.value)} value={emailOtp} />
                </div>

                <div className="text-center">
                    <input type="submit" value="Submit Otp" className="btn btn-danger btn-sm w-25" />
                </div>
            </form>

            <form onSubmit={passwordSubmit}>
                <div className="mb-3">
                    <span style={{ color: "red", fontWeight: "bolder" }}>*</span>&nbsp;<label htmlFor="pass1" className="form-label">Enter new password</label>
                    <input required type="password" className="form-control" id="pass1" placeholder="Enter new password" onChange={(e) => setPassword(e.target.value)} value={password} />
                </div>

                <div className="mb-3">
                    <span style={{ color: "red", fontWeight: "bolder" }}>*</span>&nbsp;<label htmlFor="pass2" className="form-label">Confirm new password</label>
                    <input required type="password" className="form-control" id="pass2" placeholder="Re-type password" onChange={(e) => setConfirmPassword(e.target.value)} value={confirmPassword} />
                </div>

                <div className="text-center">
                    <input type="submit" value="Submit Password" className="btn btn-danger btn-sm w-25" />
                </div>
            </form>
        </div>
    )
}

export default ForgotPassword
