import React, { useEffect, useState } from 'react'
import { baseUrl } from '../../Environment'

const UserProfile = () => {
    const [name, setName] = useState('')
    const [username, setUsername] = useState('')
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('')
    const [gender, setGender] = useState('')
    const [profilePic, setProfilePic] = useState('')


    useEffect(() => {
        fetch(`${baseUrl}api/getUser`, {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                'Authorization': "Bearer " + localStorage.getItem("token")
            }
        }).then((result) => {
            if (result.status === 200) {
                result.json().then((response) => {
                    console.log(response.data);
                    setName(response.data['name'])
                    setUsername(response.data['username'])
                    setPhone(response.data['phone'])
                    setEmail(response.data['email'])
                    setGender(response.data['gender'])
                    setProfilePic(response.data['user_pic'])
                })
            }
            else {
                console.log(result);

            }
        })
    }, [])

    const submitForm = () => {
        console.log("Form Submitted");
    }

    return (
        <div className="container my-2">
            <h3>Your Information</h3>
            <img src={profilePic} alt="NoImg" width="10%" />
            <form onSubmit={submitForm}>
                <div className="row">
                    <div className="col-md-6">
                        <div className="mb-3">
                            <span style={{ color: "red", fontWeight: "bolder" }}>*</span>&nbsp;<label htmlFor="name" className="form-label">Name</label>
                            <input required type="text" className="form-control" id="name" placeholder="Please type your name" onChange={(e) => setName(e.target.value)} value={name} />
                            {/* <div id="nameMsg"></div> */}
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="mb-3">
                            <span style={{ color: "red", fontWeight: "bolder" }}>*</span>&nbsp;<label htmlFor="username" className="form-label">Username</label>
                            <input required type="text" className="form-control" id="username" placeholder="Please type a username" onChange={(e) => setUsername(e.target.value)} value={username} />
                            {/* <div id="usernameMsg"></div> */}
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="mb-3">
                            <span style={{ color: "red", fontWeight: "bolder" }}>*</span>&nbsp;<label htmlFor="phone" className="form-label">Phone</label>
                            <input required type="text" className="form-control" id="phone" placeholder="Please type your phone number" onChange={(e) => setPhone(e.target.value)} value={phone} />
                            {/* <div id="phoneMsg"></div> */}
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="mb-3">
                            <span style={{ color: "red", fontWeight: "bolder" }}>*</span>&nbsp;<label htmlFor="email" className="form-label">Email address</label>
                            <input required type="email" className="form-control" id="email" placeholder="name@example.com" onChange={(e) => setEmail(e.target.value)} value={email} />
                            {/* <div id="emailMsg"></div> */}
                        </div>
                    </div>


                    {/* Gender */}
                    <div className="col-md-6">
                        <div className="mb-3">
                            <span style={{ color: "red", fontWeight: "bolder" }}>*</span>&nbsp;<label htmlFor="Gender" className="form-label">Gender</label>
                            <select id="Gender" className="form-select" onChange={(e) => setGender(e.target.value)}>
                                {
                                    (gender==="Male")?
                                    <>
                                    <option selected value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Others">Others</option>
                                    </>
                                    :(gender==="Female")?
                                    <>
                                    <option value="Male">Male</option>
                                    <option selected value="Female">Female</option>
                                    <option value="Others">Others</option>
                                    </>
                                    :(gender==="Others")?
                                    <>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option selected value="Others">Others</option>
                                    </>
                                    :
                                    <>
                                    <option selected hidden>Please select your gender</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Others">Others</option>
                                    </>
                                }
                            </select>
                            {/* <div id="genderMsg"></div> */}
                        </div>
                    </div>


                    {/* <div className="col-md-6">
                        <div className="mb-3">
                            <label htmlFor="formFile" className="form-label">Update profile pic</label>
                            <input className="form-control" type="file" id="formFile" accept="image/*" />
                        </div>
                    </div> */}
                </div>

                <div className="text-center">
                    <input type="submit" value="Signup" id="submitBtn" className="btn btn-danger btn-sm w-25" />
                </div>
            </form>
        </div>
    )
}

export default UserProfile
