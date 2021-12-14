import React from "react";
import { Link, useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import { useParams } from "react-router";

const User = () => {

    const [user, setUser] = useState([])
    const { id } = useParams()
    
    useEffect(() => {
        fetch('http://localhost:8000/users').then(res => res.json()).then(user => setUser(user))
    }, [])

    return <>
        <div className='container' >
            {user ? user.map(ele => {
                console.log(ele.email,id);
                if (ele.email == id) {
                    return <div class="card" style={{width: '18rem'}}>
                                <div class="card-body">
                            <h5 class="card-title">{ ele.name}</h5>
                            <p class="card-text">{ ele.email}</p>
                                <a href="/" class="btn btn-primary">Back</a>
                                </div>
                            </div>
                }
            }) : <p>User Not found !</p>}
            </div>
        </>
}

export default User;