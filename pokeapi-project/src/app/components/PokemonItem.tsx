import { useEffect, useState } from "react";
import { PokemonSummary, PokemonListResponse } from "../Pokemon";
import Link from "next/link";
import { fetchPokemonSummary } from "../services/pokemonServices";

interface PokemonItemProps {
    pokemonItem: PokemonListResponse;
    onClick: (id: number) => void;
    usageCount: number;
}

const PokemonItem: React.FC<PokemonItemProps> = ({ pokemonItem, onClick, usageCount }) => {
    const { id, name, url } = pokemonItem;
    const [pokemonData, setPokemonData] = useState<PokemonSummary[]>([]);

    useEffect(() => {
        fetchPokemonSummary(url)
            .then(res => {
                setPokemonData(res);
            })
            .catch(() => console.log("Error fetching pokemon data"));
    }, []);

    const renderAbilities = () => {
        return pokemonData.map((abilityObj, index) => (
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
        <div>

            <button
                onClick={() => onClick(id)}
                className="boton-pokemon"
            >
                <div>
                    <b>Nombre:</b> {name}
                </div>
                <div>
                    <b>URL:</b> <a href={url} target="_blank" rel="noopener noreferrer">{url}</a>
                </div>
                <div>
                    <b>Habilidades del Pokemon:</b> {pokemonData.length > 0 ? renderAbilities() : "Cargando..."}
                </div>
                <div>
                    <b>Veces usado:</b> {usageCount}
                </div>
                <Link href={`/pokemon/${id}`} className="detalle-button">
                    Ver detalles
                </Link>
                
            </button>
        </div>

    );
};

export default PokemonItem;