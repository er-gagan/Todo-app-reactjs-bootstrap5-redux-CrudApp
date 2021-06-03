import React from 'react'
import { useDispatch } from 'react-redux';
import { Redirect } from "react-router-dom";
import { addToken } from './actions/tokenActions';


const Protected = (props) => {
    let Component = props.component
    let token = localStorage.getItem('token')
    const dispatch = useDispatch()
    dispatch(addToken(token))
    return (
        <div>
            {(token !== null) ? <Component /> : <Redirect to="login"></Redirect>}
        </div>
    )
}

export default Protected