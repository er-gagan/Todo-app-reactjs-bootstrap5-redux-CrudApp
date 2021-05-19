import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { deleteTodo } from '../../actions';

const Card = () => {
    const todos = useSelector((state) => state.todos.data);
    const dispatch = useDispatch()
    if (todos.length) {
        const taskItems = todos.map((item) => {
            return (
                <div key={item.id} className="col-md-3">
                    <div className="card my-2" style={{ width: "16rem" }}>
                        <div className="card-body">
                            <h5 className="card-title">{item.title}</h5>
                            <hr />
                            <h6 className="card-subtitle mb-2 text-muted">Card Description</h6>
                            <p className="card-text" style={{ textAlign: 'justify' }}>{item.desc}</p>
                            <div className="text-center">
                                <button className="btn btn-info btn-sm">Open</button>
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
