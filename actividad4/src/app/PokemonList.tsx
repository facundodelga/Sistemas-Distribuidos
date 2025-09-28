"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';

type Pokemon = {
    name: string;
    url: string;
};

type UsageMap = {
    [name: string]: number;
};

const PokemonItem: React.FC<{
    pokemon: Pokemon;
    onClick: () => void;
    usageCount: number;
}> = ({ pokemon, onClick, usageCount }) => (
    <button
        onClick={onClick}
        style={{
            display: 'block',
            width: '100%',
            margin: '8px 0',
            padding: '10px',
            border: '1px solid #ccc',
            borderRadius: '6px',
            textAlign: 'left',
            background: '#fafafa',
            cursor: 'pointer'
        }}
    >
        <div>
            <b>Nombre:</b> {pokemon.name}
        </div>
        <div>
            <b>URL:</b> <a href={pokemon.url} target="_blank" rel="noopener noreferrer">{pokemon.url}</a>
        </div>
        <div>
            <b>Veces usado:</b> {usageCount}
        </div>
    </button>
);

const PokemonList: React.FC = () => {
    const [pokemons, setPokemons] = useState<Pokemon[]>([]);
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
            {pokemons.map(pokemon => (
                <PokemonItem
                    key={pokemon.name}
                    pokemon={pokemon}
                    onClick={() => handleItemClick(pokemon.name)}
                    usageCount={usages[pokemon.name] || 0}
                />
            ))}
        </div>
    );
};

export default PokemonList;