import React, { useCallback, useEffect, useState } from 'react';
import { deleteAllTodos } from '../../reducers/todos';
import { addToken } from '../../reducers/token';
import { useHistory } from 'react-router-dom';
import { baseUrl } from '../../Environment';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

const UserProfile = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const [name, setName] = useState('')
    const [username, setUsername] = useState('')
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('')
    const [gender, setGender] = useState('')
    const [profilePic, setProfilePic] = useState('')
    const [newProfilePic, setNewProfilePic] = useState('')

    const notify = (type, msg, autoClose) => {
        toast(msg, {
            position: toast.POSITION.BOTTOM_RIGHT,
            className: 'foo-bar',
            autoClose: autoClose,
            type: type,
        });
    }

    const logOut = useCallback(() => {
        localStorage.clear()
        dispatch(deleteAllTodos([]))
        dispatch(addToken(null))
        notify("warning", "Something went wrong, Please check your internet and information!", 4000)
    }, [dispatch])

    useEffect(() => {
        try {
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
                    logOut()
                }
            })
        }
        catch {
            logOut()
        }
    }, [history, logOut])

    useEffect(() => {
        document.getElementById("deleteBtn").addEventListener("click", (e) => {
            e.preventDefault()
            confirmAlert({
                title: 'Delete Account',
                message: 'Are you sure to delete your account permanently.',
                buttons: [
                    {
                        label: 'Yes',
                        onClick: () => {
                            fetch(`${baseUrl}api/deleteUser`, {
                                method: "POST",
                                headers: {
                                    "Accept": "application/json",
                                    "Content-Type": "application/json",
                                    'Authorization': "Bearer " + localStorage.getItem("token")
                                }
                            }).then((result) => {
                                if (result.status === 200) {
                                    localStorage.clear()
                                    dispatch(deleteAllTodos([]))
                                    dispatch(addToken(null))
                                    history.push('/')
                                    notify("success", "Your account is deleted permanently!", 5000)
                                }
                                else {
                                    console.log(result);
                                    history.push('/')
                                    notify("error", "Something went wrong!", 5000)
                                }
                            })
                        }
                    },
                    {
                        label: 'No'
                    }
                ]
            });
        })
    }, [dispatch, history]);

    const submitForm = (e) => {
        e.preventDefault()
        try {
            let data = new FormData();
            data.append("name", name)
            data.append("username", username)
            data.append("phone", phone)
            data.append("email", email)
            data.append("gender", gender)
            if (newProfilePic) {
                data.append("profilePic", newProfilePic, newProfilePic.name)
            }
            else {
                let sameProfilePic = profilePic.replace("/media/", "")
                data.append("profilePic", sameProfilePic)
            }

            fetch(`${baseUrl}api/updateUser`, {
                method: "PUT",
                headers: {
                    'Authorization': "Bearer " + localStorage.getItem("token")
                },
                body: data
            }).then((result) => {
                if (result.status === 200) {
                    result.json().then((response) => {
                        setName(response.data['name'])
                        setUsername(response.data['username'])
                        setPhone(response.data['phone'])
                        setEmail(response.data['email'])
                        setGender(response.data['gender'])
                        setProfilePic(response.data['user_pic'])
                        notify("success", "Your account information is updated successfully!", 4000)
                    })
                }
                else {
                    console.log(result);
                    notify("error", "Your account information isn't update!", 4000)
                }
            })
        }
        catch {
            notify("error", "Your account information isn't update!", 4000)
        }
    }
    useEffect(() => {
        if(profilePic.includes("/media/https%3A/")){
            let newprofilePic = profilePic.replace("/media/https%3A/","https://")
            setProfilePic(newprofilePic)
        }
    }, [profilePic]);
    return (
        <div className="container my-2">
            <h3>Your Information</h3>
            <img src={profilePic} id="showImg" alt="NoImg" width="10%" />
            <form onSubmit={(e) => submitForm(e)}>
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
                                    (gender === "Male") ?
                                        <>
                                            <option selected value="Male">Male</option>
                                            <option value="Female">Female</option>
                                            <option value="Others">Others</option>
                                        </>
                                        : (gender === "Female") ?
                                            <>
                                                <option value="Male">Male</option>
                                                <option selected value="Female">Female</option>
                                                <option value="Others">Others</option>
                                            </>
                                            : (gender === "Others") ?
                                                <>
                                                    <option value="Male">Male</option>
                                                    <option value="Female">Female</option>
                                                    <option selected value="Others">Others</option>
                                                </>
                                                :
                                                <>
                                                    <option hidden>Please select your gender</option>
                                                    <option value="Male">Male</option>
                                                    <option value="Female">Female</option>
                                                    <option value="Others">Others</option>
                                                </>
                                }
                            </select>
                            {/* <div id="genderMsg"></div> */}
                        </div>
                    </div>

                    <div className="col-md-6">
                        <span style={{ color: "red", fontWeight: "bolder" }}>*</span>&nbsp;
                        <label htmlFor="formFile" className="form-label">Update profile pic</label>
                        <div className="mb-3 input-group">
                            <input className="form-control" type="file" id="formFile" accept="image/*" onChange={(e) => setNewProfilePic(e.target.files[0])} />
                            {newProfilePic ?
                                <img src={URL.createObjectURL(newProfilePic)} width="8%" className="input-group-text" alt="No Img" />
                                :
                                <img src={profilePic} width="8%" className="input-group-text" alt="No Img" />
                            }
                        </div>
                    </div>
                </div>

                <div className="text-center">
                    <input type="submit" value="Update Information" id="submitBtn" className="btn btn-danger btn-sm w-25" />
                </div>
            </form>
            <div>
                <input type="submit" id="deleteBtn" value="Delete Account" className="btn btn-info btn-sm" />
            </div>
        </div>
    )
}

export default UserProfile
