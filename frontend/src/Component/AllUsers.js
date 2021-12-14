import React from 'react';
import { useState, useEffect } from "react";


const AllUser = () => {
   
    const [user, setUser] = useState([])

    useEffect(() => {
        fetch('http://localhost:8000/users').then(res => res.json()).then(user => setUser(user))
    }, [])

    return <>
        <div className='container' >
            {user ? user.map(ele => {
                    return <div class="card" style={{width: '18rem'}}>
                                <div class="card-body">
                                    <h5 class="card-title">{ ele.name}</h5>
                                    <p class="card-text">{ ele.email}</p>
                                    <a href="/" class="btn btn-primary">Back</a>
                                </div>
                            </div>
            }) : ''}
            </div>
        </>

}

export default AllUser;