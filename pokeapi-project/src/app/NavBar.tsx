import React from 'react'
import Link from 'next/link'

const NavBar = () => {
  return (
    <div>
        <nav className='nav-bar'>
            <Link href="/" className='nav-bar-item'>
                Inicio
            </Link>
        </nav>
    </div>
        
    
  )
}

export default NavBar