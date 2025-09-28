import { use, useEffect, useState } from "react";
import { PokemonAbility, PokemonListResponse } from "./Pokemon";
import axios from "axios";

interface PokemonItemProps {
    pokemonItem: PokemonListResponse;
    onClick: () => void;
    usageCount: number;
}

const PokemonItem: React.FC<PokemonItemProps> = ({ pokemonItem, onClick, usageCount }) => {
    const {name, url} = pokemonItem;
    const [pokemonData, setPokemonData] = useState<PokemonAbility[]>([]);
    useEffect(() => {
        console.log(`Pokemon ${name} renderizado`);
        axios.get(url)
        .then(res => {
            console.log(res.data.abilities);
            setPokemonData(res.data.abilities as PokemonAbility[]);
        })
        .catch(() => console.log("Error fetching pokemon data"));
        console.log()
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
                onClick={onClick}
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
            </button>
        </div>

    );
};

export default PokemonItem;