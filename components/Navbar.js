import React, { useContext } from 'react'
import Link from 'next/link';
import  {useEffect,useState} from 'react';
import {authContext} from './context/authContext'
import axios from 'axios'

const Navbar=()=>{
    const [isLoggedIn,setIsLoggedIn] = useState(null);
    useEffect(()=>{
            axios.post('/api/auth-user')
            .then(response=>{
                setIsLoggedIn(true)
            })
            .catch(error=>{
                setIsLoggedIn(false)
            });
    })

    return  (
        <div className="navbar">
            
            <div className="logo"> RigrexChat</div>
            <div>
                <Link href="/" ><a className="mr-3"> home</a></Link>
                {!isLoggedIn ? <Link href="/login"><a className="mr-3"> login</a></Link> : null}
                {!isLoggedIn ? <Link href="/register"><a className="mr-3"> register</a></Link> : null}
                {isLoggedIn ? <Link href="/chat"><a className="mr-3"> chat</a></Link> : null}
                {isLoggedIn ? <Link href="/logout"><a className="mr-3"> logout</a></Link> : null}
            </div>
    
            <style jsx>{`
                .navbar{
                    display:flex;
                    justify-content:space-arround;
                    background-color:lightgray;
                    color:black;
                }
                .logo{
                    letter-spacing:3px;
                }
            `}</style>
        </div>
    );
    
}

export default Navbar;