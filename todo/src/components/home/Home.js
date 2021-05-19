import React from 'react'
import Card from './Card'
import Form from './Form'

const Home = () => {
    return (
        <div className="container my-2">
            <h3 className="text-center">Todo App</h3>
            <Form />
            <div className="row my-3">
                <Card />
            </div>
        </div>
    )
}

export default Home