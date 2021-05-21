import React, { useState } from 'react'
import { checkPassword } from './SignupFormValidation'

const Signup = () => {
    const [name, setName] = useState('')
    const [username, setUsername] = useState('')
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    // const [gender, setGender] = useState('')

    const submitForm = (e) => {
        e.preventDefault()
        if(checkPassword(password, confirmPassword)){
            console.log(name, username, phone, email, password, confirmPassword);
        }
        else{
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
                            <label htmlFor="name" className="form-label">Name</label>
                            <input autoFocus type="text" className="form-control" id="name" placeholder="Please type your name" onChange={(e) => setName(e.target.value)} value={name} />
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="mb-3">
                            <label htmlFor="username" className="form-label">Username</label>
                            <input type="text" className="form-control" id="username" placeholder="Please type a username" onChange={(e) => setUsername(e.target.value)} value={username} />
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="mb-3">
                            <label htmlFor="phone" className="form-label">Phone</label>
                            <input type="text" className="form-control" id="phone" placeholder="Please type your phone number" onChange={(e) => setPhone(e.target.value)} value={phone} />
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email address</label>
                            <input type="email" className="form-control" id="email" placeholder="name@example.com" onChange={(e) => setEmail(e.target.value)} value={email} />
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="mb-3">
                            <label htmlFor="pass1" className="form-label">Password</label>
                            <input type="password" className="form-control" id="pass1" placeholder="Enter a unique password" onChange={(e) => setPassword(e.target.value)} value={password} />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="mb-3">
                            <label htmlFor="pass2" className="form-label">Confirm Password</label>
                            <input type="password" className="form-control" id="pass2" placeholder="Re-type password" onChange={(e) => setConfirmPassword(e.target.value)} value={confirmPassword} />
                        </div>
                    </div>
                </div>

                {/* Gender */}
                {/* <div className="mb-3">
                    <label htmlFor="Gender" className="form-label">Gender</label>
                    <select id="Gender" className="form-select" onChange={(e) => setGender(e.target.value)} value={gender}>
                        <option hidden selected>Please select your gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Others">Others</option>
                    </select>
                </div> */}
                <div className="text-center">
                    <input type="submit" value="Submit" className="btn btn-danger" />
                </div>
            </form>
        </div>
    )
}

export default Signup
