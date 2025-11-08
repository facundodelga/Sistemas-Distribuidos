// app/favorites/page.tsx
"use client";
import { useFavorites } from "@/app/hooks/useFavorites";
import FavoriteItem from "./FavoriteItem";

export default function FavoritesPage() {
    const { data} = useFavorites();
    if (!data?.length) return <p className="text-center text-white text-xl mt-10">Sin favoritos</p>;

    return (
        <div className="max-w-[800px] mx-auto my-10 bg-gradient-to-br from-pokemon-water to-primary-700 rounded-2xl shadow-custom p-8 border border-gray-300">
            <h2>Listado de Pokemons Favoritos</h2>
            {data &&
                <ul className='list-none p-0 m-0 flex flex-wrap justify-center gap-4'>
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