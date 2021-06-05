import { checkLength, MainFieldValidationCheck, undefinedValueLength } from './validation';
import { Link, useHistory, Redirect } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import { addToken } from '../../reducers/token';
import { useDispatch } from 'react-redux';

const Login = () => {
    const dispatch = useDispatch()
    const history = useHistory();
    const [userEmailPhone, setUserEmailPhone] = useState('')
    const [password, setPassword] = useState('')
    const [passwordValidate, setPasswordValidate] = useState(false)
    const token = localStorage.getItem("token")

    // min 6 and max 15 character | atleast one is number | atleast one is special character
    const passwordValidation = (e) => {
        let Value = e.target.value
        setPassword(Value)
        let passwordMsg = document.getElementById("passwordMsg")
        let regex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,15}$/
        if (Value) {
            if (Value.match(regex) !== null) {
                setPassword(Value)
                if (checkLength(Value, 6, 15, e, passwordMsg)) {   // Value, MinValue, MaxValue, event, passwordMsg
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

    useEffect(() => {
        if (passwordValidate) {
            document.getElementById("loginBtn").disabled = false
        }
        else {
            document.getElementById("loginBtn").disabled = true
        }
    }, [passwordValidate]);

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
                    console.log(_token);
                    if (_token) {
                        localStorage.setItem("token", _token)
                        dispatch(addToken(_token))
                        history.push("/");
                        console.log("You have successfully logged in");
                    }
                    else {
                        setUserEmailPhone("")
                        setPassword("")
                        dispatch(addToken(''))
                        document.getElementById("name").focus()
                        localStorage.clear()
                        console.log("Something went wrong, Please check your internet and credentials!");
                    }
                })
            }
            else {
                localStorage.clear()
            }
        })
    }


    return (
        <>
            {token ?
                <Redirect to="/" />
                :
                <div className="container my-2">
                    <h3>Login Form</h3>
                    <form onSubmit={submitForm} id="myForm1">
                        <div className="mb-3">
                            <span style={{ color: "red", fontWeight: "bolder" }}>*</span>&nbsp;<label htmlFor="name" className="form-label">Enter Username, Email or Phone</label>
                            <input required autoFocus type="text" className="form-control" id="name" placeholder="Please type your username, email or phone" onChange={(e) => setUserEmailPhone(e.target.value)} value={userEmailPhone} />
                        </div>

                        <div className="mb-3">
                            <span style={{ color: "red", fontWeight: "bolder" }}>*</span>&nbsp;<label htmlFor="password" className="form-label">Password</label>
                            <input required type="password" className="form-control" id="password" placeholder="Please type password" onChange={(e) => passwordValidation(e)} value={password} />
                            <div id="passwordMsg"></div>
                        </div>
                        <div className="text-center">
                            <input type="submit" value="Login" id="loginBtn" className="btn btn-danger btn-sm w-25" />
                        </div>
                    </form>
                    <div className="text-center">
                        <Link to="/signup">You don't have an account? Sign up</Link>
                    </div>
                </div>
            }
        </>
    )
}

export default Login