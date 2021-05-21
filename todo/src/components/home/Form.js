import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addTodo } from '../../actions'
import cuid from 'cuid'
import { setDatefun } from './setDateTimeModule.js'

const Form = () => {
    const [title, setTitle] = useState('')
    const [desc, setDesc] = useState('')
    const dispatch = useDispatch()
    const handleFormSubmit = (e) => {
        e.preventDefault()
        let dateObj = setDatefun()
        dispatch(addTodo({ id: cuid(), title: title, desc: desc, date: new Date(dateObj.yyyy, dateObj.mm, dateObj.dd, dateObj.hours, dateObj.minutes, dateObj.seconds)}))
        document.getElementById("myForm").reset();
        document.getElementById("title").focus()
    }

    return (
        <>
            <form onSubmit={handleFormSubmit} id="myForm">
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input required autoFocus type="text" className="form-control" onChange={(e) => setTitle(e.target.value)} id="title" placeholder="Enter work title" />
                </div>

                <div className="mb-3">
                    <label htmlFor="desc" className="form-label">Description</label>
                    <input required type="text" className="form-control" onChange={(e) => setDesc(e.target.value)} id="desc" placeholder="Enter work description" />
                </div>
                <div className="text-center">
                    <button type="submit" className="btn btn-danger btn-sm w-25">Submit</button>
                </div>
            </form>
        </>
    )
}

export default Form
