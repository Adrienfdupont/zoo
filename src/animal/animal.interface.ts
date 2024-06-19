import { Species } from "src/species/species.interface";

export interface Animal {
    uuid: string;
    name: string;
    species: Species;
    age: number;
}
