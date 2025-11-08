import React from 'react'
import Link from 'next/link'

const NavBar = () => {
  return (
    <nav className='bg-primary-700 px-4 py-4 rounded-b-2xl text-center'>
      <Link href="/" className='text-white no-underline text-lg mx-3 transition-colors duration-200 hover:text-primary-400'>
        Inicio
      </Link>
      <Link href="/favorites" className='text-white no-underline text-lg mx-3 transition-colors duration-200 hover:text-primary-400'>
        Favoritos
      </Link>
    </nav>
  )
}

export default NavBar