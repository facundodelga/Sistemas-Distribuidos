export type PokemonListResponse = {
    id: number;
    name: string;
    url: string;

};

export type PokemonSumary = {
    id: number;
    ability: {
        name: string;
        url: string;
    };
    is_hidden: boolean;
    slot: number;
};


export type UsageMap = {
    [name: string]: number;
};


export type Ability = {
  ability: { name: string; url: string };
  is_hidden: boolean;
  slot: number;
};

export type Pokemon = {
  id: number;
  name: string;
  height: number;
  weight: number;
  abilities: Ability[];
  sprites: { front_default: string | null };
  types: { type: { name: string } }[];
  stats: { base_stat: number; stat: { name: string } }[];
};