import axios from "axios";

const obtenerPokemon = async (id: number) => {
    try{

    
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
    console.log(`Nombre: ${response.data.name}`);
    console.log(`Peso: ${response.data.weight}`);
    console.log(`Altura: ${response.data.height}`);
    console.log(`Habilidades: ${response.data.abilities.map((habilidad: any) => habilidad.ability.name).join(", ")}`);
    console.log(`Tipos: ${response.data.types.map((tipo: any) => tipo.type.name).join(", ")}`);

    return response.data;
    } catch (error) {
        console.error("Error al obtener el Pokémon:", error);
    }
}

obtenerPokemon(1);

