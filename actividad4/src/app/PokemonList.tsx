"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { PokemonListResponse, UsageMap } from './Pokemon';
import PokemonItem from './PokemonItem';

const PokemonList: React.FC = () => {
    const [pokemons, setPokemons] = useState<PokemonListResponse[]>([]);
    const [usages, setUsages] = useState<UsageMap>({});

    useEffect(() => {
        axios.get('https://pokeapi.co/api/v2/pokemon?limit=22')
            .then(res => {
                console.log(res.data.results);
                const pokemonsWithId = res.data.results.map((pokemon: PokemonListResponse) => {
                    const urlParts = pokemon.url.split('/').filter(Boolean);
                    const id = urlParts[urlParts.length - 1];
                    console.log(id);
                    return { ...pokemon, id };
                });
                
                setPokemons(pokemonsWithId);
            })
            .catch(() => setPokemons([]));
    }, []);

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
            <ul className='pokemon-list'>
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