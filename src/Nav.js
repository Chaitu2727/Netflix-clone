import React, { useEffect, useState } from 'react'
import './Nav.css'
function Nav() {
    const [handleShow,setHandleShow] = useState(false)

    useEffect(()=>{
        window.addEventListener("scroll",()=>{
            if(window.scrollY >100){
                setHandleShow(true)
            } else {
                setHandleShow(false)
            }
        })
        return () =>{
            window.removeEventListener('scroll',null);
        }
    },[])

  return (
    <div className={`navbar ${handleShow && "nabarBg"}`}>
        <img className='nav__log' src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/512px-Netflix_2015_logo.svg.png" alt='Netflix Logo'/>

        <img className='nav__avatar' src='https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png' alt='Netflix-avatar' />
    </div>
  )
}

export default Nav