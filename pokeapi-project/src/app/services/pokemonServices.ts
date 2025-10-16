import axios from "axios";
import { PokemonListResponse, PokemonSummary } from "../Pokemon";

export const LIMIT = 30;
const getIdFromUrl = (url: string) => Number(url.split('/').filter(Boolean).pop());

export const fetchPokemons = async (offset: number): Promise<PokemonListResponse[]> => {
    await new Promise(resolve => setTimeout(resolve, 500)); // Simula retardo de 500ms
    const res = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${LIMIT}&offset=${offset}`);
    if (res.status !== 200) throw new Error('No se pudo obtener la lista');
    return (res.data.results as { name: string; url: string }[]).map(p => ({
        ...p,
        id: getIdFromUrl(p.url),
    }));
};

export const fetchPokemonSummary = async (url: string) : Promise<PokemonSummary[]> => {
    const res = await axios.get(url);
    if (res.status !== 200) throw new Error('No se pudo obtener el Pokémon');
    return res.data.abilities as PokemonSummary[];
}
