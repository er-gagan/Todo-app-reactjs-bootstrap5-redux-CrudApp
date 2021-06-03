import React, { useState, useEffect } from 'react'
import { Link, useHistory, Redirect } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { addToken } from '../../actions/tokenActions';

const Login = () => {
    const dispatch = useDispatch()
    const history = useHistory();
    const [userEmailPhone, setUserEmailPhone] = useState('')
    const [password, setPassword] = useState('')
    const token = localStorage.getItem("token")

    const submitForm = (e) => {
        e.preventDefault()
        // let userLogin = {
        //     "username": userEmailPhone,
        //     "password": password
        // }
        let _token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9'
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
    }
    useEffect(() => {
        if (!token) {
            if ((userEmailPhone.length < 5) || (password.length < 5)) {
                document.getElementById("liveToastBtn").disabled = true
            }
            else {
                document.getElementById("liveToastBtn").disabled = false
            }
        }
    }, [userEmailPhone, password, token]);

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
                            <input required type="password" className="form-control" id="password" placeholder="Please type password" onChange={(e) => setPassword(e.target.value)} value={password} />
                        </div>
                        <div className="text-center">
                            <input type="submit" value="Submit" id="liveToastBtn" className="btn btn-danger btn-sm w-25" />
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