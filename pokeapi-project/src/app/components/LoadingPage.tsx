
import React from 'react'

type LoadingPageProps = {
  message?: string;
}

const LoadingPage = ({ message }: LoadingPageProps) => {
  return (
    <div className="loading">
      <p>{message || "Cargando Pokemons..."}</p>
    </div>
  )
}

export default LoadingPage