import React, { useState } from 'react'
import { checkPassword, checkFieldCharacters, checkLength, undefinedValueLength } from './SignupFormValidation'

const Signup = () => {
    const [name, setName] = useState('')
    const [username, setUsername] = useState('')
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [gender, setGender] = useState('')

    const nameValidation = (e) => {
        let Value = e.target.value
        setName(Value)
        let regex = /[a-zA-Z ]/gi
        let nameMsg = document.getElementById("nameMsg")
        Value = checkFieldCharacters(Value, regex)
        if (Value !== undefined) {
            setName(Value)
            checkLength(Value, 5, 30, e, nameMsg)   // Value, MinValue, MaxValue, event, nameMsg
        }
        else {
            undefinedValueLength(e, nameMsg)
        }
    }

    const usernameValidation = (e) => {
        let Value = e.target.value
        setUsername(Value)
        let regex = /[a-zA-Z0-9@]/gi
        let usernameMsg = document.getElementById("usernameMsg")
        Value = checkFieldCharacters(Value, regex)
        if (Value !== undefined) {
            setUsername(Value)
            checkLength(Value, 5, 15, e, usernameMsg)   // Value, MinValue, MaxValue, event, usernameMsg
        }
        else {
            undefinedValueLength(e, usernameMsg)
        }
    }

    const phoneValidation = (e) => {
        let Value = e.target.value
        setPhone(Value)
        let regex = /[0-9]/gi
        let phoneMsg = document.getElementById("phoneMsg")
        Value = checkFieldCharacters(Value, regex)
        if (Value !== undefined) {
            setPhone(Value)
            checkLength(Value, 10, 10, e, phoneMsg)   // Value, MinValue, MaxValue, event, phoneMsg
        }
        else {
            undefinedValueLength(e, phoneMsg)
        }
    }

    const passwordValidation = (e) => {
        let Value = e.target.value
        setPassword(Value)
        let regex = /[a-zA-Z0-9@$&*]/gi
        let passwordMsg = document.getElementById("passwordMsg")
        Value = checkFieldCharacters(Value, regex)
        if (Value !== undefined) {
            setPassword(Value)
            checkLength(Value, 6, 15, e, passwordMsg)   // Value, MinValue, MaxValue, event, passwordMsg
        }
        else {
            undefinedValueLength(e, passwordMsg)
        }
    }

    const confirmPasswordValidation = (e) => {
        let Value = e.target.value
        setConfirmPassword(Value)
        let regex = /[a-zA-Z0-9@$&*]/gi
        let confirmPasswordMsg = document.getElementById("confirmPasswordMsg")
        Value = checkFieldCharacters(Value, regex)
        if (Value !== undefined) {
            setConfirmPassword(Value)
            checkLength(Value, 6, 15, e, confirmPasswordMsg)   // Value, MinValue, MaxValue, event, confirmPasswordMsg
        }
        else {
            undefinedValueLength(e, confirmPasswordMsg)
        }
    }

    const emailValidation = (e) => {
        let Value = e.target.value
        setEmail(Value)
        let regex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/gi
        let emailMsg = document.getElementById("emailMsg")
        if (Value.match(regex) !== null) {
            Value = Value.match(regex).join("")
            setEmail(Value)
            checkLength(Value, 10, 40, e, emailMsg)   // Value, MinValue, MaxValue, event, emailMsg
        }
        else {
            setEmail(Value)
        }
    }

    const submitForm = (e) => {
        e.preventDefault()
        if (checkPassword(password, confirmPassword)) {
            console.log(name, username, phone, email, password, confirmPassword, gender);
        }
        else {
            console.log("Form Not submit");
        }
    }

    return (
        <div className="container my-2">
            <h3>Signup Form</h3>
            <form onSubmit={submitForm}>
                <div className="row">
                    <div className="col-md-6">
                        <div className="mb-3">
                            <span style={{ color: "red", fontWeight: "bolder" }}>*</span>&nbsp;<label htmlFor="name" className="form-label">Name</label>
                            <input required autoFocus type="text" className="form-control" id="name" placeholder="Please type your name" onChange={(e) => nameValidation(e)} value={name} />
                            <div id="nameMsg"></div>
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="mb-3">
                            <span style={{ color: "red", fontWeight: "bolder" }}>*</span>&nbsp;<label htmlFor="username" className="form-label">Username</label>
                            <input required type="text" className="form-control" id="username" placeholder="Please type a username" onChange={(e) => usernameValidation(e)} value={username} />
                            <div id="usernameMsg"></div>
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="mb-3">
                            <span style={{ color: "red", fontWeight: "bolder" }}>*</span>&nbsp;<label htmlFor="phone" className="form-label">Phone</label>
                            <input required type="text" className="form-control" id="phone" placeholder="Please type your phone number" onChange={(e) => phoneValidation(e)} value={phone} />
                            <div id="phoneMsg"></div>
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="mb-3">
                            <span style={{ color: "red", fontWeight: "bolder" }}>*</span>&nbsp;<label htmlFor="email" className="form-label">Email address</label>
                            <input required type="email" className="form-control" id="email" placeholder="name@example.com" onChange={(e) => emailValidation(e)} value={email} />
                            <div id="emailMsg"></div>
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="mb-3">
                            <span style={{ color: "red", fontWeight: "bolder" }}>*</span>&nbsp;<label htmlFor="pass1" className="form-label">Password</label>
                            <input required type="password" className="form-control" id="pass1" placeholder="Enter a unique password" onChange={(e) => passwordValidation(e)} value={password} />
                            <div id="passwordMsg"></div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="mb-3">
                            <span style={{ color: "red", fontWeight: "bolder" }}>*</span>&nbsp;<label htmlFor="pass2" className="form-label">Confirm Password</label>
                            <input required type="password" className="form-control" id="pass2" placeholder="Re-type password" onChange={(e) => confirmPasswordValidation(e)} value={confirmPassword} />
                            <div id="confirmPasswordMsg"></div>
                        </div>
                    </div>
                </div>

                {/* Gender */}
                <div className="mb-3">
                    <span style={{ color: "red", fontWeight: "bolder" }}>*</span>&nbsp;<label htmlFor="Gender" className="form-label">Gender</label>
                    <select id="Gender" className="form-select" onChange={(e) => setGender(e.target.value)}>
                        <option hidden>Please select your gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Others">Others</option>
                    </select>
                </div>

                <div className="text-center">
                    <input type="submit" value="Submit" className="btn btn-danger btn-sm w-25" />
                </div>
            </form>
        </div>
    )
}

export default Signup
