import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class PokeapiService {
    private urlPokeApi = 'https://pokeapi.co/api/v2/pokemon';

    constructor(private http: HttpClient) {}

    getAllPokemon() {
        return this.http.get(`${this.urlPokeApi}/?limit=1000&offset=0`);
    }

    getPokemon(namePokemon: string) {
        if (namePokemon === undefined || namePokemon === '' || namePokemon === null) {
            console.log('Ingrese pokemon valido');
        }
        return this.http.get(`${this.urlPokeApi}/${namePokemon.toLowerCase()}`);
    }
}
