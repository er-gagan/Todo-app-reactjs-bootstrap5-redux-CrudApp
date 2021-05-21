import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { deleteTodo, updateTodo } from '../../actions';
import { setDatefun, setTimefun, Datefun } from './setDateTimeModule.js'

const Card = () => {
    const [id, setId] = useState('')
    const [title, setTitle] = useState('')
    const [desc, setDesc] = useState('')
    const [date, setDate] = useState('')
    const [time, setTime] = useState('')

    const todos = useSelector((state) => state.todos.data);
    const dispatch = useDispatch()

    const openbtn = (id, title, desc, date) => {
        setId(id)
        setTitle(title)
        setDesc(desc)
        setDate(Datefun(date))
        setTime(setTimefun(date))
    }

    const todoUpdate = () => {
        let newTitle = document.getElementById("editTitle").value
        let newDesc = document.getElementById("editDesc").value
        let dateObj = setDatefun()
        dispatch(updateTodo({ id: id, title: newTitle, desc: newDesc, date: new Date(dateObj.yyyy, dateObj.mm, dateObj.dd, dateObj.hours, dateObj.minutes, dateObj.seconds) }))
    }

    if (todos.length) {
        const mySortedTodos = todos.slice().sort((a, b) => b.date - a.date) // sort todos date wise
        const taskItems = mySortedTodos.map((item) => {
            return (
                <div key={item.id} className="col-md-3">
                    <div className="card my-2 shadow bg-body rounded" style={{ width: "16rem" }}>
                        <div className="card-body">
                            <h5 className="card-title">{(item.title.length > 15) ? item.title.slice(0, 15) + "..." : item.title}</h5>
                            <hr />
                            <h6 className="card-subtitle mb-2 text-muted">Description</h6>
                            <p className="card-text" style={{ textAlign: 'justify' }}>{(item.desc.length > 100) ? item.desc.slice(0, 100) + "..." : item.desc}</p>

                            {/* Modal for open button start */}
                            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                <div className="modal-dialog">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <span className="modal-title h4" id="exampleModalLabel">Edit Todo&nbsp;</span>
                                            <span className="modal-title h5">{date}&nbsp;</span>
                                            <span className="modal-title h5">{time}</span>
                                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                        </div>
                                        <div className="modal-body">
                                            <div className="mb-3">
                                                <label htmlFor="editTitle" className="form-label">Title</label>
                                                <input type="text" onChange={(e) => setTitle(e.target.value)} className="form-control" id="editTitle" value={title} />
                                            </div>

                                            <div className="mb-3">
                                                <label htmlFor="editDesc" className="form-label">Description</label>
                                                <textarea type="text" className="form-control" id="editDesc" onChange={(e) => setDesc(e.target.value)} value={desc} rows="5" ></textarea>
                                            </div>
                                        </div>
                                        <div className="modal-footer">
                                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                            <button type="button" onClick={todoUpdate} className="btn btn-primary" data-bs-dismiss="modal">Save changes</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* Modal for open button end */}

                            <div className="text-center">
                                <button type="button" data-bs-toggle="modal" data-bs-target="#exampleModal" className="btn btn-info btn-sm" onClick={() => openbtn(item.id, item.title, item.desc, item.date)}>Open</button>

                                <button className="btn btn-warning btn-sm mx-3" onClick={() => dispatch(deleteTodo(item.id))}>Delete</button>
                            </div>
                        </div>
                    </div>
                </div>
            )
        })
        return (
            <>
                {taskItems}
            </>
        )
    }
    else {
        return (
            <>
            </>
        )
    }
}

export default Card