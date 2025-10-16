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
        <div className="pokemon-container">
            <h2>Listado de Pokemons</h2>
            {isLoading && <LoadingPage />}
            {pokemons &&
                <ul className='pokemon-list'>
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