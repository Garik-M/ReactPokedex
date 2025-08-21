export type Proptype = {
  name: string;
  id: string | undefined;
  data: PokeData | undefined;
};

export type PokeData = {
  abilities: Array<{
    ability: {
      name: string;
      url: string;
    };
    is_hidden: boolean;
  }>;
  forms: [
    {
      name: string;
    }
  ];
  sprites: {
    other: {
      ["official-artwork"]: {
        front_default: string;
      };
    };
  };
  stats: Array<{
    base_stat: number;
    effort: number;
    stat: {
      name: string;
    };
  }>;
  types: Array<{
    type: {
      name: string;
    };
  }>;
  species: {
    url: string;
  };
  height: number;
  weight: number;
};

export type SpeciesType = {
  evolution_chain: {
    url: string;
  };
  flavor_text_entries: [
    {
      flavor_text: string;
      language: {
        name: string;
      };
    }
  ];
  genera: Array<{
    genus: string;
    language: {
      name: string;
    };
  }>;
  varieties: Array<{
    isDefault: boolean;
    pokemon: {
      name: string;
      url: string;
    };
  }>;
};
export type EvolveType = {
  chain: {
    evolves_to: Array<{
      evolves_to: Array<{
        evolves_to: Array<null>;
        species: {
          name: string;
          url: string;
        };
      }>;
      species: {
        name: string;
        url: string;
      };
    }>;
    species: {
      name: string;
      url: string;
    };
  };
};
