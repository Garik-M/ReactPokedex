export type Proptype = {
  name: string;
  id: string;
  data: PokeData;
};

export type PokeData = {
  forms: [
    {
      name: string,
    }
  ]
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
};
