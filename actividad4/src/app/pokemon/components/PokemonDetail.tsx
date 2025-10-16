
import NavBar from '@/app/NavBar';
import { Pokemon } from '@/app/Pokemon';
import React from 'react'

interface PokemonProps {
  pokemon: Pokemon;
}

const PokemonDetail = ({ pokemon }: PokemonProps) => {
  return (
    <>
    <NavBar />
    <main className="pokemon-wrapper">
      <section className="pokemon-card">
        <header className="pokemon-header">
          <div className="pokemon-title">
            <h1 className="pokemon-name">{pokemon.name}</h1>
            <p className="pokemon-subtitle">#{pokemon.id}</p>
            <div className="pokemon-tags">
              {pokemon.types.map(t => (
                <span key={t.type.name} className={`pokemon-tag pokemon-tag-${t.type.name}`}>
                  {t.type.name}
                </span>
              ))}
            </div>
          </div>
          {pokemon.sprites.front_default && (
            <div className="pokemon-avatar">
              <img
                src={pokemon.sprites.front_default}
                alt={pokemon.name}
                width={200}
                height={200}
                loading="eager"
                className="pokemon-img"
              />
            </div>
          )}
        </header>

        <div className="pokemon-grid">
          <div className="pokemon-block">
            <h2 className="pokemon-block-title">Datos</h2>
            <ul className="pokemon-list">
              <li><b>Altura:</b> {pokemon.height}</li>
              <li><b>Peso:</b> {pokemon.weight}</li>
            </ul>
          </div>

          <div className="pokemon-block">
            <h2 className="pokemon-block-title">Habilidades</h2>
            <ul className="pokemon-list">
              {pokemon.abilities.map(a => (
                <li key={a.ability.name}>
                  {a.ability.name} {a.is_hidden ? "(oculta)" : ""}
                </li>
              ))}
            </ul>
          </div>

          <div className="pokemon-block">
            <h2 className="pokemon-block-title">Stats</h2>
            <ul className="pokemon-stats">
              {pokemon.stats.map(s => (
                <li key={s.stat.name} className="pokemon-stat-row">
                  <span className="pokemon-stat-name">{s.stat.name}</span>
                  <div className="pokemon-bar-wrap">
                    <div
                      className="pokemon-bar"
                      style={{ width: `${Math.min(s.base_stat, 150) / 1.5}%` }}
                    />
                  </div>
                  <span className="pokemon-stat-val">{s.base_stat}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </main>
    </>
  )
}

export default PokemonDetail;