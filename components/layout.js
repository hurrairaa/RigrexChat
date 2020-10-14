import Footer from './Footer'
import Navbar from './Navbar'
import Head from 'next/head'



const Layout = (props)=>{    
 
    return (<div>
        <Head>
            <title>Chat App</title>
            <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.5.0/css/all.css" integrity="sha384-B4dIYHKNBt8Bc12p+WXckhzcICo0wtJAoU8YZTY5qE0Id1GSseTk6S+L3BlXeVIU" crossorigin="anonymous"></link>
            <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" integrity="sha384-JcKb8q3iqJ61gNV9KGb8thSsNjpSL0n8PARn9HuZOnIxN0hoP+VmmDGMN5t9UJ0Z" crossorigin="anonymous"></link>
        </Head>
            <Navbar/>
            {props.children}
        <Footer/>       
    </div>);
}

export default Layout;