import React, { useState, useEffect } from 'react'
import { checkLength, undefinedValueLength, MainFieldValidationCheck, matchPasswordValid, matchPasswordInvalid } from './Validation'
import { Redirect } from "react-router-dom";
import Navbar from '../navbar/Navbar';

const ForgotPassword = () => {
    let token = localStorage.getItem('token')
    const [email, setEmail] = useState('')
    const [emailOtp, setEmailOtp] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    // state for validation
    const [emailValidate, setEmailValidate] = useState(false)
    const [otpValidate, setOtpValidate] = useState(false)
    const [passwordValidate, setPasswordValidate] = useState(false)
    const [confirmPasswordValidate, setConfirmPasswordValidate] = useState(false)

    const emailValidation = (e) => {
        let Value = e.target.value
        setEmail(Value)
        let regex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/gi
        let emailMsg = document.getElementById("emailMsg")
        if (Value) {
            if (Value.match(regex) !== null) {
                Value = Value.match(regex).join("")
                setEmail(Value)
                if (checkLength(Value, 10, 40, e, emailMsg)) {
                    setEmailValidate(true)
                }
                else {
                    setEmailValidate(false)
                }
            }
            else {
                setEmail(Value)
                let msg = "** Invallid Email"
                MainFieldValidationCheck(e, emailMsg, msg)
                setEmailValidate(false)
            }
        }
        else {
            undefinedValueLength(e, emailMsg)
        }
    }
    useEffect(() => {
        if (token === null) {
            if (emailValidate) {
                document.getElementById('emailBtn').disabled = false
            }
            else {
                document.getElementById('emailBtn').disabled = true
            }
        }
    }, [token, emailValidate]);

    const otpValidation = (e) => {
        let Value = e.target.value
        setEmailOtp(Value)
        let regex = /^[0-9]{6}(\s*,*,\s*[0-9]{6})*$/
        let otpMsg = document.getElementById("otpMsg")
        if (Value) {
            if (Value.match(regex) !== null) {
                Value = Value.match(regex).join("")
                setEmailOtp(Value)
                if (checkLength(Value, 6, 6, e, otpMsg)) {
                    setOtpValidate(true)
                }
                else {
                    setOtpValidate(false)
                }
            }
            else {
                setEmailOtp(Value)
                let msg = "** Invallid Otp | Otp must be digits"
                MainFieldValidationCheck(e, otpMsg, msg)
                setOtpValidate(false)
            }
        }
        else {
            undefinedValueLength(e, otpMsg)
        }
    }
    useEffect(() => {
        if (token === null) {
            if (otpValidate) {
                document.getElementById('otpBtn').disabled = false
            }
            else {
                document.getElementById('otpBtn').disabled = true
            }
        }
    }, [token, otpValidate]);

    // min 6 and max 15 character | atleast one is number | atleast one is special character
    const passwordValidation = (e) => {
        let Value = e.target.value
        setPassword(Value)
        let passwordMsg = document.getElementById("passwordMsg")
        let regex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,15}$/
        if (Value) {
            if (Value.match(regex) !== null) {
                setPassword(Value)
                if (checkLength(Value, 6, 15, e, passwordMsg)) {
                    setPasswordValidate(true)
                }
                else {
                    setPasswordValidate(false)
                }
            }
            else {
                setPassword(Value)
                let msg = "** Password Incorrect"
                MainFieldValidationCheck(e, passwordMsg, msg)
                setPasswordValidate(false)
            }
        }
        else {
            undefinedValueLength(e, passwordMsg)
        }
    }

    const confirmPasswordValidation = (e) => {
        let Value = e.target.value
        setConfirmPassword(Value)
        let confirmPasswordMsg = document.getElementById("confirmPasswordMsg")
        let regex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,15}$/
        if (Value) {
            if (Value.match(regex) !== null) {
                setConfirmPassword(Value)
                if (checkLength(Value, 6, 15, e, confirmPasswordMsg)) {
                    setConfirmPasswordValidate(true)
                }
                else {
                    setConfirmPasswordValidate(false)
                }
            }
            else {
                setConfirmPassword(Value)
                let msg = "** Password Incorrect"
                MainFieldValidationCheck(e, confirmPasswordMsg, msg)
                setConfirmPasswordValidate(false)
            }
        }
        else {
            undefinedValueLength(e, confirmPasswordMsg)
        }
    }
    useEffect(() => {
        if (token === null) {
            let passwordBtn = document.getElementById("passwordBtn")
            let matchPassword = document.getElementById("matchPassword")
            let pass1 = document.getElementById("pass1")
            let pass2 = document.getElementById("pass2")
            if (passwordValidate && confirmPasswordValidate) {
                if (password === confirmPassword) {
                    passwordBtn.disabled = false
                    matchPasswordValid(matchPassword, pass1, pass2)
                }
                else {
                    passwordBtn.disabled = true
                    matchPasswordInvalid(matchPassword, pass1, pass2)
                }
            }
            else {
                passwordBtn.disabled = true
                // matchPasswordInvalid(matchPassword, pass1, pass2)
            }
        }
    }, [passwordValidate, confirmPasswordValidate, password, confirmPassword, token])

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
        <>
        <Navbar/>
            {(token !== null) ?
                <Redirect to="/"></Redirect>
                :
                <div className="container my-2">
                    <h3>Forgot Password</h3>
                    <form onSubmit={emailSubmit}>
                        <div className="mb-3">
                            <span style={{ color: "red", fontWeight: "bolder" }}>*</span>&nbsp;<label htmlFor="email" className="form-label">Email address</label>
                            <input autoFocus required type="email" className="form-control" id="email" placeholder="name@example.com" onChange={(e) => emailValidation(e)} value={email} />
                            <div id="emailMsg"></div>
                        </div>

                        <div className="text-center">
                            <input type="submit" id="emailBtn" value="Submit Email" className="btn btn-danger btn-sm w-25" />
                        </div>
                    </form>

                    <form onSubmit={otpSubmit}>
                        <div className="mb-3">
                            <span style={{ color: "red", fontWeight: "bolder" }}>*</span>&nbsp;<label htmlFor="emailOtp" className="form-label">Enter Otp</label>
                            <input required type="text" className="form-control" id="emailOtp" placeholder="Otp sent your given email" onChange={(e) => otpValidation(e)} value={emailOtp} />
                            <div id="otpMsg"></div>
                        </div>

                        <div className="text-center">
                            <input type="submit" id="otpBtn" value="Submit Otp" className="btn btn-danger btn-sm w-25" />
                        </div>
                    </form>

                    <form onSubmit={passwordSubmit}>
                        <div className="mb-3">
                            <span style={{ color: "red", fontWeight: "bolder" }}>*</span>&nbsp;<label htmlFor="pass1" className="form-label">Enter new password</label>
                            <input required type="password" className="form-control" id="pass1" placeholder="Enter new password" onChange={(e) => passwordValidation(e)} value={password} />
                            <div id="passwordMsg"></div>
                        </div>

                        <div className="text-center" id="matchPassword" style={{ display: 'block' }}></div>
                        <div className="mb-3">
                            <span style={{ color: "red", fontWeight: "bolder" }}>*</span>&nbsp;<label htmlFor="pass2" className="form-label">Confirm new password</label>
                            <input required type="password" className="form-control" id="pass2" placeholder="Re-type password" onChange={(e) => confirmPasswordValidation(e)} value={confirmPassword} />
                            <div id="confirmPasswordMsg"></div>
                        </div>

                        <div className="text-center">
                            <input type="submit" id="passwordBtn" value="Submit Password" className="btn btn-danger btn-sm w-25" />
                        </div>
                    </form>
                </div>
            }
        </>
    )
}

export default ForgotPassword
