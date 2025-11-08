import React from 'react'
import { usePokemonList } from '../contexts/usePokemonListContext';

const PaginationButtons = () => {
    const { offset, nextPage, prevPage } = usePokemonList();

    return (
        <div className="flex justify-center gap-4 mt-6">
            <button 
              onClick={prevPage} 
              disabled={offset === 0}
              className="bg-primary-600 border border-primary-700 text-white cursor-pointer rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.08)] transition-all duration-200 px-4 py-2 text-base hover:bg-primary-700 hover:-translate-y-0.5 hover:scale-[1.02] hover:shadow-[0_6px_16px_rgba(0,0,0,0.12)] disabled:bg-gray-300 disabled:border-gray-300 disabled:text-gray-500 disabled:cursor-default disabled:transform-none disabled:shadow-none"
            >
              Anterior
            </button>
            <button 
              onClick={nextPage}
              className="bg-primary-600 border border-primary-700 text-white cursor-pointer rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.08)] transition-all duration-200 px-4 py-2 text-base hover:bg-primary-700 hover:-translate-y-0.5 hover:scale-[1.02] hover:shadow-[0_6px_16px_rgba(0,0,0,0.12)]"
            >
              Siguiente
            </button>
        </div>
    )
}

export default PaginationButtons