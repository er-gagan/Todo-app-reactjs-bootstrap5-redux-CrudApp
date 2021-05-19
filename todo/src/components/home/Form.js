import React from 'react'

const Form = () => {
    return (
        <>
            <div className="mb-3">
                <label for="title" className="form-label">Title</label>
                <input type="text" className="form-control" id="title" placeholder="Enter work title" />
            </div>

            <div className="mb-3">
                <label for="desc" className="form-label">Description</label>
                <input type="text" className="form-control" id="desc" placeholder="Enter work description" />
            </div>
            <div className="text-center">
                <button className="btn btn-danger btn-sm w-25">Submit</button>
            </div>
        </>
    )
}

export default Form
