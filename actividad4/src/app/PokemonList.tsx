"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { PokemonListResponse, UsageMap } from './Pokemon';
import PokemonItem from './PokemonItem';

const PokemonList: React.FC = () => {
    const [pokemons, setPokemons] = useState<PokemonListResponse[]>([]);
    const [usages, setUsages] = useState<UsageMap>({});

    useEffect(() => {
        axios.get('https://pokeapi.co/api/v2/pokemon?limit=20')
            .then(res => setPokemons(res.data.results))
            .catch(() => setPokemons([]));
    }, []);

    const handleItemClick = (name: string) => {
        setUsages(prev => ({
            ...prev,
            [name]: (prev[name] || 0) + 1
        }));
    };

    return (
        <div>
            <h2>Listado de Pokemons</h2>
            <ul>
                {pokemons.map(pokemon => (
                    <li key={pokemon.name}>
                        <PokemonItem
                            pokemonItem={pokemon}
                            onClick={() => handleItemClick(pokemon.name)}
                            usageCount={usages[pokemon.name] || 0}
                        />
                    </li>
                ))}
            </ul>

        </div>
    );
};

export default PokemonList;