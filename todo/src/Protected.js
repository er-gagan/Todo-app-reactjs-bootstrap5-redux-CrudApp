import React from 'react'
// import { useSelector } from 'react-redux';
import { Redirect } from "react-router-dom";
// import { addToken } from './actions';

const Protected = (props) => {
    let Component = props.component
    let token = localStorage.getItem('token')

    return (
        <div>
            {(token !== null) ? <Component /> : <Redirect to="login"></Redirect>}
        </div>
    )
}

export default Protected