import axios from "axios";
import { PokemonListResponse, PokemonSummary } from "../Pokemon";

export const LIMIT = 30;
const getIdFromUrl = (url: string) => Number(url.split('/').filter(Boolean).pop());

export const fetchPokemons = async (offset: number): Promise<PokemonListResponse[]> => {
    await new Promise(resolve => setTimeout(resolve, 500)); // Simula retardo de 500ms
    const res = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${LIMIT}&offset=${offset}`);
    if (res.status !== 200) throw new Error('No se pudo obtener la lista');
    console.log(res.data.results);
    return (res.data.results as { name: string; url: string; }[]).map(p => ({
        ...p,
        id: getIdFromUrl(p.url),
    }));
};

export const fetchPokemonSummary = async (url: string) : Promise<PokemonSummary> => {
    const res = await axios.get(url);
    if (res.status !== 200) throw new Error('No se pudo obtener el Pokémon');
    const result: PokemonSummary = {
        habilities: res.data.abilities,
        sprites: {
            front_default: res.data.sprites.front_default,
            front_shiny: res.data.sprites.front_shiny
        }
    };
    return result;
}
