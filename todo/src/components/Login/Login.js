import { checkLength, MainFieldValidationCheck, undefinedValueLength } from './validation';
import { Link, useHistory } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import { addToken } from '../../reducers/token';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { deleteAllTodos } from '../../reducers/todos';

const Login = () => {
    const dispatch = useDispatch()
    const history = useHistory();
    const [userEmailPhone, setUserEmailPhone] = useState('')
    const [password, setPassword] = useState('')
    const [passwordValidate, setPasswordValidate] = useState(false)

    const notify = (type, msg, autoClose) => {
        toast(msg, {
            position: toast.POSITION.BOTTOM_RIGHT,
            className: 'foo-bar',
            autoClose: autoClose,
            type: type,
        });
    }

    const logOut = () => {
        localStorage.clear()
        dispatch(deleteAllTodos([]))
        dispatch(addToken(null))
        history.push("/login");
        notify("warning", "Something went wrong, Please check your internet and credentials!", 3000)
    }

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
        try {
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
                        if (_token) {
                            localStorage.setItem("token", _token)
                            dispatch(addToken(_token))
                            history.push("/");
                            notify("success", "You have successfully logged in", 5000)
                        }
                        else {
                            logOut()
                            setUserEmailPhone("")
                            setPassword("")
                            document.getElementById("name").focus()

                        }
                    })
                }
                else {
                    logOut()
                }
            })
        }
        catch {
            logOut()
        }
    }


    return (
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
    )
}

export default Login