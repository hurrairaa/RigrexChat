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
            <div className="link-container">
                <Link href="/" ><a className=" nav-link"> home</a></Link>
                {!isLoggedIn ? <Link href="/login"><a className=" nav-link"> login</a></Link> : null}
                {!isLoggedIn ? <Link href="/register"><a className=" nav-link"> register</a></Link> : null}
                {isLoggedIn ? <Link href="/chat"><a className=" nav-link"> chat</a></Link> : null}
                {isLoggedIn ? <Link href="/logout"><a className=" nav-link"> logout</a></Link> : null}
            </div>
    
            <style jsx>{`
                .navbar{
                    display:flex;
                    justify-content:space-arround;
                    background-color:#36405c;
                    color:black;
                }
                .logo{
                    letter-spacing:3px;
                    color:white;
                    font-weight:1000;
                }
                .navbar .link-container{
                    display:flex;
                    flex-direction:row;
                }
                .nav-link{
                    text-decoration: none;
                    color:white;
                  }
            `}</style>
        </div>
    );
    
}

export default Navbar;