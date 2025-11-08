import React from 'react'

type LoadingPageProps = {
  message?: string;
}

const LoadingPage = ({ message }: LoadingPageProps) => {
  return (
    <div className="text-center text-white text-xl mt-10 animate-fadeIn">
      <p>{message || "Cargando Pokemons..."}</p>
    </div>
  )
}

export default LoadingPage