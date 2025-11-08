"use client";
import React, { useState } from 'react';
import { UsageMap } from '../Pokemon';
import PokemonItem from './PokemonItem';
import { usePokemonList } from '../contexts/usePokemonListContext';
import LoadingPage from './LoadingPage';
import PaginationButtons from './PaginationButtons';

const PokemonList: React.FC = () => {
    const { pokemons, isLoading } = usePokemonList();
    const [usages, setUsages] = useState<UsageMap>({});

    const handleItemClick = (name: string) => {
        setUsages(prev => ({
            ...prev,
            [name]: (prev[name] || 0) + 1
        }));
        console.log(`Pokemon ${name} clickeado`);

    };

    return (
        <div className="max-w-[800px] mx-auto my-10 bg-gradient-to-br from-pokemon-water to-primary-700 rounded-2xl shadow-custom p-8 border border-gray-300">
            <h2>Listado de Pokemons</h2>
            {isLoading && <LoadingPage />}
            {pokemons &&
                <ul className='list-none p-0 flex flex-wrap justify-center gap-4'>
                    {pokemons?.map(pokemon => (
                        <li key={pokemon.name}>
                            <PokemonItem
                                pokemonItem={pokemon}
                                onClick={() => handleItemClick(pokemon.name)}
                                usageCount={usages[pokemon.name] || 0}
                            />
                        </li>
                    ))}
                </ul>
            }

            <PaginationButtons />
        </div>
    );
};

export default PokemonList;