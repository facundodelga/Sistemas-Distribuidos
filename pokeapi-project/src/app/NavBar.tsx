import React from 'react'
import Link from 'next/link'

const NavBar = () => {
  return (
    <div>
        <nav className='nav-bar'>
            <Link href="/" className='nav-bar-item'>
                Inicio
            </Link>
            <Link href="/favorites" className='nav-bar-item'>
                Favoritos
            </Link>
        </nav>
    </div>
        
    
  )
}

export default NavBar