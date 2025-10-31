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
        <div className="boton-pokemon">
            <b>Nombre:</b> {name}
            <b>URL:</b> <a href={url} target="_blank" rel="noopener noreferrer">{url}</a>
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
            <Link href={`/pokemon/${id}`} className="detalle-button">
                Ver detalles
            </Link>
            <FavoriteButton id={id} name={name} sprite={pokemonData?.sprites.front_default!} />
        </div>

    );
};

export default PokemonItem;