import React from 'react'

const Card = () => {
    return (
        <div className="card my-2" style={{ width: "18rem" }}>
            <div className="card-body">
                <h5 className="card-title">Card title</h5>
                <hr />
                <h6 className="card-subtitle mb-2 text-muted">Card Description</h6>
                <p className="card-text" style={{ textAlign: 'justify' }}>Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                <div className="text-center">
                    <button className="btn btn-info btn-sm">Open</button>
                    <button className="btn btn-warning btn-sm mx-3">Delete</button>
                </div>
            </div>
        </div>
    )
}

export default Card
