'use client';

import React, { createContext, useContext } from 'react';
import { useQuery, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { PokemonSummary } from '../Pokemon';

type PokemonListContextType = {
    pokemons: PokemonSummary[] | undefined;
    isLoading: boolean;
    error: unknown;
    offset: number;
    nextPage: () => void;
    prevPage: () => void;
};

const PokemonListContext = createContext<PokemonListContextType | undefined>(undefined);

const LIMIT = 30;

const fetchPokemons = async (offset: number): Promise<PokemonSummary[]> => {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${LIMIT}&offset=${offset}`, { cache: 'no-store' });
    if (!res.ok) throw new Error('No se pudo obtener la lista');
    const data = await res.json();
    return data.results as PokemonSummary[];
};

export const PokemonListProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [offset, setOffset] = React.useState(0);

    const { data, isLoading, error } = useQuery({
        queryKey: ['pokemons', offset],
        queryFn: () => fetchPokemons(offset),
        staleTime: 60_000,
    });

    const nextPage = () => setOffset((prev) => prev + LIMIT);
    const prevPage = () => setOffset((prev) => Math.max(prev - LIMIT, 0));

    return (
        <PokemonListContext.Provider
            value={{ pokemons: data, isLoading, error, offset, nextPage, prevPage }}
        >
            {children}
        </PokemonListContext.Provider>
    );
};

export const usePokemonList = () => {
    const ctx = useContext(PokemonListContext);
    if (!ctx) throw new Error('usePokemonList must be used within a PokemonListProvider');
    return ctx;
};

const queryClient = new QueryClient();

export const PokemonListRootProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <QueryClientProvider client={queryClient}>
        <PokemonListProvider>{children}</PokemonListProvider>
    </QueryClientProvider>
);
