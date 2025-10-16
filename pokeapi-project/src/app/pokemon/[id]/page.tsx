import { Pokemon } from "@/app/Pokemon";
import PokemonDetail from "../components/PokemonDetail";

export default async function PokemonDetailById({
  params,
}: { params: { id: string } }) {
  const { id } = await params;

  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`, {
    // next: { revalidate: 0 } // opcional: desactivar cache
    cache: 'no-store',
  });
  if (!res.ok) throw new Error('No se pudo obtener el Pokémon');

  const pokemonData: Pokemon = await res.json();

  return (
    <>
      <PokemonDetail pokemon={pokemonData} />
    </>
  );
}

