export type PokemonListResponse = {
    name: string;
    url: string;
};

export type PokemonAbility = {
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