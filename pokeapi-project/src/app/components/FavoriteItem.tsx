import React from 'react'
import { FavoritePokemon } from '../Pokemon'

type FavoriteItemProps = {
    pokemon: FavoritePokemon;
}

const FavoriteItem = ({ pokemon }: FavoriteItemProps) => {
    return (
        <div className="flex items-start gap-3 p-3 border border-gray-300 rounded-lg bg-white min-w-[300px]">
            <img src={pokemon.sprite} alt={pokemon.name} width={56} height={56} className="rounded flex-shrink-0" />
            <div className="flex flex-col gap-1 flex-1">
                <span className="font-semibold text-base text-gray-800 capitalize">{pokemon.nombrePersonalizado || pokemon.name}</span>
                {pokemon.descripcion && (
                    <p className="text-sm text-gray-500 m-0 leading-snug">{pokemon.descripcion}</p>
                )}
            </div>
        </div>
    )
}

export default FavoriteItem