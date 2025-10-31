import PokemonList from "./components/PokemonList";
import NavBar from "./NavBar";
import Footer from "./Footer";
import { PokemonListProvider } from "./contexts/usePokemonListContext";

export default function Home() {
  return (
    <>
      <PokemonListProvider>
        <PokemonList />
      </PokemonListProvider>

    </>
  );
}
