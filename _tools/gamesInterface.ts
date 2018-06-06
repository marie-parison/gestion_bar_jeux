export interface IGames {
    price_tax_exc: string;
    descriptions: {
        fr: string;
        en: string;
    };
    brand: string;
    id: string;
    category: string;
    price: string;
    url_fr: string;
    url_en: string;
    pics: {
        large: string;
        thickbox: string;
        small: string;
    }[];
    name: string;
    contents: string[],
    caracteristic: {
        authors: string[];
        editor: string[];
        language: string[];
        theme: string[];
        mecanisms: string[];
        extension: string[];
        nb_players: {
            min: number;
            max: number;
        };
        age: {
            min: number;
            max: number;
        };
        duration: {
            min: number;
            max: number;
        };
    }
}