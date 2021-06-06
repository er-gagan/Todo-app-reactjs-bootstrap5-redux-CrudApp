import { MainFieldValidationCheck, checkLength, undefinedValueLength, matchPasswordValid, matchPasswordInvalid } from './Validation'
import { deleteAllTodos } from '../../reducers/todos'
import React, { useState, useEffect } from 'react'
import { addToken } from '../../reducers/token'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'

const ChangePassword = () => {
    const dispatch = useDispatch()
    const history = useHistory()

    const [currentPassword, setCurrentPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const [currentPasswordValidate, setCurrentPasswordValidate] = useState(false)
    const [newPasswordValidate, setNewPasswordValidate] = useState(false)
    const [confirmPasswordValidate, setConfirmPasswordValidate] = useState(false)

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
        notify("warning", "Something went wrong, May be network issue or session expiry!", 5000)
    }

    // min 6 and max 15 character | atleast one is number | atleast one is special character
    const currentPasswordValidation = (e) => {
        let Value = e.target.value
        setCurrentPassword(Value)
        let currentPasswordMsg = document.getElementById("currentPasswordMsg")
        let regex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,15}$/
        if (Value) {
            if (Value.match(regex) !== null) {
                setCurrentPassword(Value)
                if (checkLength(Value, 6, 15, e, currentPasswordMsg)) {
                    setCurrentPasswordValidate(true)
                }
                else {
                    setCurrentPasswordValidate(false)
                }
            }
            else {
                setCurrentPassword(Value)
                let msg = "** Password Incorrect"
                MainFieldValidationCheck(e, currentPasswordMsg, msg)
                setCurrentPasswordValidate(false)
            }
        }
        else {
            undefinedValueLength(e, currentPasswordMsg)
        }
    }

    const newPasswordValidation = (e) => {
        let Value = e.target.value
        setNewPassword(Value)
        let newPasswordMsg = document.getElementById("newPasswordMsg")
        let regex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,15}$/
        if (Value) {
            if (Value.match(regex) !== null) {
                setNewPassword(Value)
                if (checkLength(Value, 6, 15, e, newPasswordMsg)) {
                    setNewPasswordValidate(true)
                }
                else {
                    setNewPasswordValidate(false)
                }
            }
            else {
                setNewPassword(Value)
                let msg = "** Password Incorrect"
                MainFieldValidationCheck(e, newPasswordMsg, msg)
                setNewPasswordValidate(false)
            }
        }
        else {
            undefinedValueLength(e, newPasswordMsg)
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
        if (currentPasswordValidate && newPasswordValidate && confirmPasswordValidate) {
            let matchPassword = document.getElementById("matchPassword")
            let newPass1 = document.getElementById("newPass1")
            let newPass2 = document.getElementById("newPass2")
            if (newPassword === confirmPassword) {
                document.getElementById("btnSubmit").disabled = false
                matchPasswordValid(matchPassword, newPass1, newPass2)
            }
            else {
                document.getElementById("btnSubmit").disabled = true
                matchPasswordInvalid(matchPassword, newPass1, newPass2)
            }
        }
        else {
            document.getElementById("btnSubmit").disabled = true
        }
    }, [currentPasswordValidate, newPasswordValidate, confirmPasswordValidate, newPassword, confirmPassword]);

    const submitForm = (e) => {
        e.preventDefault()
        const passwordCredentials = {
            "currentPassword": currentPassword,
            "newPassword": newPassword
        }
        try {
            fetch('http://127.0.0.1:8000/api/change_password', {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    'Authorization': "Bearer " + localStorage.getItem("token")
                },
                body: JSON.stringify(passwordCredentials)
            }).then((result) => {
                if (result.status === 202) {
                    notify("success", `Password has successfully Changed!`, 4000)
                }
                else {
                    notify("error", `Something went wrong! Maybe invallid current password or network issue occurd!`, 5000)
                }
            })
        }
        catch {
            logOut()
        }
    }

    return (
        <div className="container my-2">
            <h3>Change Password</h3>
            <form onSubmit={submitForm} id="myForm">
                <div className="mb-3">
                    <span style={{ color: "red", fontWeight: "bolder" }}>*</span>&nbsp;<label htmlFor="currPass" className="form-label">Current Password</label>
                    <input autoFocus required type="password" className="form-control" id="currPass" placeholder="Enter current password" onChange={(e) => currentPasswordValidation(e)} value={currentPassword} />
                    <div id="currentPasswordMsg"></div>
                </div>

                <div className="mb-3">
                    <span style={{ color: "red", fontWeight: "bolder" }}>*</span>&nbsp;<label htmlFor="newPass1" className="form-label">New Password</label>
                    <input required type="password" className="form-control" id="newPass1" placeholder="Enter new password" onChange={(e) => newPasswordValidation(e)} value={newPassword} />
                    <div id="newPasswordMsg"></div>
                </div>

                <div className="text-center" id="matchPassword" style={{ display: 'block' }}></div>

                <div className="mb-3">
                    <span style={{ color: "red", fontWeight: "bolder" }}>*</span>&nbsp;<label htmlFor="newPass2" className="form-label">Confirm New Password</label>
                    <input required type="password" className="form-control" id="newPass2" placeholder="Re-type new password" onChange={(e) => confirmPasswordValidation(e)} value={confirmPassword} />
                    <div id="confirmPasswordMsg"></div>
                </div>

                <div className="text-center">
                    <input type="submit" value="Submit" id="btnSubmit" className="btn btn-danger btn-sm w-25" />
                </div>
            </form>
        </div>
    )
}

export default ChangePassword