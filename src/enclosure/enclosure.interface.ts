import { Animal } from "../animal/animal.interface";
import { Species } from "../species/species.interface";

export interface Enclosure {
    uuid: string;
    name: string;
    size: number;
    speiciesAllowed: Species[];
    animals: Animal[];
}
