import { useEffect, useState } from "react";
import { PokemonSummary, PokemonListResponse, Ability } from "../Pokemon";
import Link from "next/link";
import { fetchPokemonSummary } from "../services/pokemonServices";
import { FavoriteButton } from "./FavoriteButton";

interface PokemonItemProps {
    pokemonItem: PokemonListResponse;
    onClick: (id: number) => void;
    usageCount: number;
}

const PokemonItem: React.FC<PokemonItemProps> = ({ pokemonItem, onClick, usageCount }) => {
    const { id, name, url } = pokemonItem;
    const [pokemonData, setPokemonData] = useState<PokemonSummary | null>(null);

    useEffect(() => {
        fetchPokemonSummary(url)
            .then(res => {
                setPokemonData(res);
            })
            .catch(() => console.log("Error fetching pokemon data"));
    }, []);

    const renderAbilities = (habilities: Ability[]) => {
        return habilities.map((abilityObj, index) => (
            <div key={index}>
                <b>Habilidad:</b> {abilityObj.ability.name}
                <br />
                <b>(Oculta: {abilityObj.is_hidden ? "Sí" : "No"})</b>
                <br />
                <b>Slot: {abilityObj.slot}</b>
            </div>
        ));
    };

    return (
        <div className="relative bg-primary-600 border border-primary-700 text-white inline-block text-lg my-2 mx-1 cursor-pointer rounded-2xl shadow-[0_2px_8px_rgba(0,0,0,0.08)] transition-all duration-200 capitalize w-[600px] h-[700px] p-6 hover:bg-primary-700 hover:-translate-y-0.5 hover:scale-[1.02] hover:shadow-[0_6px_16px_rgba(0,0,0,0.12)]">
            <b>Nombre:</b> {name}
            <br />
            <b>URL:</b> <a href={url} target="_blank" rel="noopener noreferrer" className="text-white underline">{url}</a>
            <br />
            <b>Habilidades del Pokemon:</b> {pokemonData?.habilities.length! > 0 ? renderAbilities(pokemonData?.habilities!) : "Cargando..."}
            <b>Veces usado:</b> {usageCount}
            <div>
                <b>Sprite default:</b><br />
                {pokemonData?.sprites.front_default && (
                    <img src={pokemonData.sprites.front_default} alt={name} width={96} height={96} />
                )}
            </div>
            <div>
                <b>Sprite shiny:</b><br />
                {pokemonData?.sprites.front_shiny && (
                    <img src={pokemonData.sprites.front_shiny} alt={name} width={96} height={96} />
                )}
            </div>
            <Link 
              href={`/pokemon/${id}`} 
              className="bg-primary-400 border border-primary-700 text-white text-center inline-block text-base mt-2 cursor-pointer rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.08)] transition-all duration-200 px-4 no-underline hover:bg-primary-100 hover:text-gray-800 hover:-translate-y-0.5 hover:scale-[1.02] hover:shadow-[0_6px_16px_rgba(0,0,0,0.12)]"
            >
                Ver detalles
            </Link>
            <FavoriteButton id={id} name={name} sprite={pokemonData?.sprites.front_default!} />
        </div>

    );
};

export default PokemonItem;