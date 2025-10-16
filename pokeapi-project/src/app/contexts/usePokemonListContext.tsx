'use client';

import React, { createContext, useContext } from 'react';
import { useQuery, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { PokemonListResponse, PokemonSummary } from '../Pokemon';
import { fetchPokemons, LIMIT } from '../services/pokemonServices';

type PokemonListContextType = {
    pokemons: PokemonListResponse[] | undefined;
    isLoading: boolean;
    error: unknown;
    offset: number;
    nextPage: () => void;
    prevPage: () => void;
};

const PokemonListContext = createContext<PokemonListContextType | undefined>(undefined);

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
