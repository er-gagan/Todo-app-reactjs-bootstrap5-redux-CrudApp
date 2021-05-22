import React, { useState } from 'react'

const ChangePassword = () => {
    const [currentPassword, setCurrentPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [newConfirmPassword, setNewConfirmPassword] = useState('')

    const submitForm = (e) => {
        e.preventDefault()
        console.log(currentPassword, newPassword, newConfirmPassword);
        document.getElementById("myForm").reset();
    }

    return (
        <div className="container my-2">
            <h3>Change Password</h3>
            <form onSubmit={submitForm} id="myForm">
                <div className="mb-3">
                    <span style={{ color: "red", fontWeight: "bolder" }}>*</span>&nbsp;<label htmlFor="currPass" className="form-label">Current Password</label>
                    <input autoFocus required type="password" className="form-control" id="currPass" placeholder="Enter current password" onChange={(e) => setCurrentPassword(e.target.value)} value={currentPassword} />
                </div>

                <div className="mb-3">
                    <span style={{ color: "red", fontWeight: "bolder" }}>*</span>&nbsp;<label htmlFor="newPass1" className="form-label">New Password</label>
                    <input required type="password" className="form-control" id="newPass1" placeholder="Enter new password" onChange={(e) => setNewPassword(e.target.value)} value={newPassword} />
                </div>

                <div className="mb-3">
                    <span style={{ color: "red", fontWeight: "bolder" }}>*</span>&nbsp;<label htmlFor="newPass2" className="form-label">Confirm New Password</label>
                    <input required type="password" className="form-control" id="newPass2" placeholder="Re-type new password" onChange={(e) => setNewConfirmPassword(e.target.value)} value={newConfirmPassword} />
                </div>
                <div className="text-center">
                    <input type="submit" value="Submit" className="btn btn-danger btn-sm w-25" />
                </div>
            </form>
        </div>
    )
}

export default ChangePassword
