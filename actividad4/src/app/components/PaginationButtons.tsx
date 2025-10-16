
import React from 'react'
import { usePokemonList } from '../contexts/usePokemonListContext';

const PaginationButtons = () => {
    const { offset, nextPage, prevPage } = usePokemonList();

    return (
        <div className="pagination">
            <button onClick={prevPage} disabled={offset === 0}>Anterior</button>
            <button onClick={nextPage}>Siguiente</button>
        </div>
    )
}

export default PaginationButtons