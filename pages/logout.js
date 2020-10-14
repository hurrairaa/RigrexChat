import { useEffect } from 'react'
import router from 'next/router'

import { useCookies } from 'react-cookie';


const logout= ()=> {
    
    const [cookies,removeCookie] = useCookies(['auth']);
    useEffect(()=>{
        removeCookie("auth");
        router.push('/');        
    })
    return (<div></div>)
}

export default logout;

