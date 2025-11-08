
import { FavoriteButton } from '@/app/components/FavoriteButton';
import NavBar from '@/app/NavBar';
import { Pokemon } from '@/app/Pokemon';
import React from 'react'

interface PokemonProps {
  pokemon: Pokemon;
}

const PokemonDetail = ({ pokemon }: PokemonProps) => {
  return (
    <>
    <main className="min-h-screen bg-gradient-to-br from-pokemon-water to-primary-700 py-8 px-4 flex justify-center items-start">
      <section className="relative bg-white rounded-[20px] shadow-custom border border-gray-300 p-8 max-w-[600px] w-full animate-fadeIn">
        <header className="flex justify-between items-start mb-8 pb-6 border-b-2 border-gray-300 md:flex-col md:text-center">
          <div className="flex-1">
            <h1 className="text-4xl font-bold text-gray-800 m-0 mb-2 capitalize md:text-3xl">{pokemon.name}</h1>
            <p className="text-xl text-gray-500 m-0 mb-4 font-medium">#{pokemon.id}</p>
            <div className="flex gap-2 flex-wrap">
              {pokemon.types.map(t => (
                <span key={t.type.name} className={`pokemon-tag pokemon-tag-${t.type.name} px-4 py-1.5 rounded-[20px] text-sm font-semibold capitalize text-white shadow-[0_2px_4px_rgba(0,0,0,0.2)]`}>
                  {t.type.name}
                </span>
              ))}
            </div>
          </div>
          {pokemon.sprites.front_default && (
            <div className="flex-shrink-0 ml-4 md:m-4 md:order-first">
              <img
                src={pokemon.sprites.front_default}
                alt={pokemon.name}
                width={120}
                height={120}
                loading="eager"
                className="w-[120px] h-[120px] object-contain transition-transform duration-300 ease-in-out hover:scale-105 md:w-[100px] md:h-[100px]"
              />
            </div>
          )}
        </header>

        <div className="grid gap-6">
          <div className="bg-gray-50 rounded-xl p-6 border-l-4 border-primary-400 transition-all duration-300 ease-in-out hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(0,0,0,0.1)] md:p-4">
            <h2 className="text-xl font-semibold text-gray-800 m-0 mb-4 border-b-2 border-gray-300 pb-2">Datos</h2>
            <ul className="list-none p-0 m-0">
              <li className="py-2 text-gray-500 border-b border-gray-300 capitalize last:border-b-0"><b className="text-gray-800">Altura:</b> {pokemon.height}</li>
              <li className="py-2 text-gray-500 border-b border-gray-300 capitalize last:border-b-0"><b className="text-gray-800">Peso:</b> {pokemon.weight}</li>
            </ul>
          </div>

          <div className="bg-gray-50 rounded-xl p-6 border-l-4 border-primary-400 transition-all duration-300 ease-in-out hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(0,0,0,0.1)] md:p-4">
            <h2 className="text-xl font-semibold text-gray-800 m-0 mb-4 border-b-2 border-gray-300 pb-2">Habilidades</h2>
            <ul className="list-none p-0 m-0">
              {pokemon.abilities.map(a => (
                <li key={a.ability.name} className="py-2 text-gray-500 border-b border-gray-300 capitalize last:border-b-0">
                  {a.ability.name} {a.is_hidden ? "(oculta)" : ""}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-gray-50 rounded-xl p-6 border-l-4 border-primary-400 transition-all duration-300 ease-in-out hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(0,0,0,0.1)] md:p-4">
            <h2 className="text-xl font-semibold text-gray-800 m-0 mb-4 border-b-2 border-gray-300 pb-2">Stats</h2>
            <ul className="list-none p-0 m-0">
              {pokemon.stats.map(s => (
                <li key={s.stat.name} className="flex items-center py-2.5 border-b border-gray-300 gap-4 last:border-b-0 md:flex-col md:items-start md:gap-2">
                  <span className="flex-none w-[120px] font-semibold text-gray-800 capitalize text-sm md:flex-none">{s.stat.name}</span>
                  <div className="flex-1 bg-gray-200 rounded-[10px] h-2 overflow-hidden md:w-full">
                    <div
                      className="h-full bg-gradient-to-r from-primary-400 to-primary-700 rounded-[10px] transition-all duration-700 ease-out min-w-[8px]"
                      style={{ width: `${Math.min(s.base_stat, 150) / 1.5}%` }}
                    />
                  </div>
                  <span className="flex-none w-10 text-right font-semibold text-gray-800 text-sm md:flex-none md:self-end">{s.base_stat}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <FavoriteButton id={pokemon.id} name={pokemon.name} sprite={pokemon.sprites.front_default} />
      </section>
    </main>
    </>
  )
}

export default PokemonDetail;