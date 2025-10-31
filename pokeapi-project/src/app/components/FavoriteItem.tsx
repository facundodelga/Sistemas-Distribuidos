import React from 'react'
import { FavoritePokemon } from '../Pokemon'

type FavoriteItemProps = {
    pokemon: FavoritePokemon;
}

const FavoriteItem = ({ pokemon }: FavoriteItemProps) => {
    return (
        <div className="favorite-card">
            <img src={pokemon.sprite} alt={pokemon.name} width={56} height={56} />
            <span>{pokemon.name}</span>
        </div>
    )
}

export default FavoriteItem