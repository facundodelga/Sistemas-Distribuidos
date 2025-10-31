// app/favorites/page.tsx
"use client";
import { useFavorites } from "@/app/hooks/useFavorites";
import FavoriteItem from "./FavoriteItem";

export default function FavoritesPage() {
    const { data} = useFavorites();
    if (!data?.length) return <p>Sin favoritos</p>;

    return (
        <div className="pokemon-container">
            <h2>Listado de Pokemons Favoritos</h2>
            {data &&
                <ul className='pokemon-list'>
                    {data?.map(pokemon => (
                        <li key={pokemon.name}>
                            <FavoriteItem
                                pokemon={pokemon}
                            />
                        </li>
                    ))}
                </ul>
            }

        </div>
    );
}