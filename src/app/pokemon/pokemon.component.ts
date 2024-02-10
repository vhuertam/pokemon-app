import { Component, OnInit } from '@angular/core';
import { PokeapiService } from '../service/pokeapi.service';
import { forkJoin, map, switchMap } from 'rxjs';

interface AutoCompleteCompleteEvent {
    originalEvent: Event;
    query: string;
}

interface pokeDataImg {
    name: string;
    img: string;
}

@Component({
    selector: 'app-pokemon',
    templateUrl: './pokemon.component.html',
    styleUrl: './pokemon.component.css',
})
export class PokemonComponent implements OnInit {
    pokemonByName: any[] | undefined;
    pokemonSelected: any;
    suggestions: any[] | undefined;

    listPokemon: any[];
    listPokemonWithImg: pokeDataImg[];

    responsiveOptions: any[] | undefined;

    visible: boolean = false;

    //Variables descripcion pokemon
    imgFrontPokemon: string;
    imgBackPokemon: string;
    abilities: any[];
    gameIndices: any[];
    moves: any[];
    stats: any[];
    typesPokemon: any[];
    weight: string;
    height: string;
    namePokemon: string;
    baseExperience: string;
    id: string;

    sprites: any[];

    namePoke2: string;
    hideSearch: boolean;

    constructor(private pokeApiService: PokeapiService) {}

    ngOnInit(): void {
        this.getListPokemons();
        // this.listPokemonWithImg = []
        // this.getListPokemonsWithImage();

        this.responsiveOptions = [
            {
                breakpoint: '1199px',
                numVisible: 1,
                numScroll: 1,
            },
            {
                breakpoint: '991px',
                numVisible: 2,
                numScroll: 1,
            },
            {
                breakpoint: '767px',
                numVisible: 1,
                numScroll: 1,
            },
        ];
    }

    // Obtener lista de pokemons por nombre
    getListPokemons() {
        this.pokeApiService.getAllPokemon().subscribe((data: any) => {
            this.listPokemon = data.results.map((pokemon: any) => pokemon);
        });
    }

    //   async getListPokemonsWithImage() {
    //     // this.pokeApiService.getAllPokemon().subscribe((data: any) => {
    //     //  data.results.forEach((pokemon: any) => {
    //     // //    this.pokeApiService.getPokemon(pokemon.name).subscribe( (pdata: any) => {

    //     // //       const { name, sprites:{ front_default } } = pdata;

    //     // //       let xd: pokeDataImg = {
    //     // //         name: name,
    //     // //         img: front_default
    //     // //       }

    //     // //       this.listPokemonWithImg.push(xd);
    //     // //     })
    //     // this.listPokemonWithImg.push(pokemon);
    //     //  })

    //     // })
    //     // console.log(this.listPokemonWithImg);
    //     //--------------------------------------------------------------------------------------------- jp
    //     // const { results }: any = await this.pokeApiService.getAllPokemon().toPromise()
    //     // const promises =  results.map((pokemon: any) => {
    //     //   return this.pokeApiService.getPokemon(pokemon.name).toPromise();
    //     // });
    //     // const allData: any [] = await Promise.all(promises);

    //     // this.listPokemonWithImg = allData.map((data: any)=> {
    //     //   return {
    //     //     name: data.name,
    //     //     img: data.sprites.front_default
    //     //   }
    //     // })
    //     // ------------------------------

    //     //-------------------------------------------------------------------version observable
    // this.pokeApiService.getAllPokemon().pipe(
    //   switchMap(({ results }: any) => {
    //     const pokemonObservables = results.map((pokemon: any) => {
    //       return this.pokeApiService.getPokemon(pokemon.name);
    //     });
    //     return forkJoin(pokemonObservables);
    //   }),
    //   map((allData: any[]) => {
    //     return allData.map((data: any) => {
    //       return {
    //         name: data.name,
    //         img: data.sprites.front_default
    //       };
    //     });
    //   })
    // ).subscribe((listPokemonWithImg: any[]) => {
    //   this.listPokemonWithImg = listPokemonWithImg;
    // });
    // //-------------------------------------------------------------------version observable

    //   }

    // Obtener info de pokemon mediante modal
    getPokemonDataModal(pokemonModal: string) {
        this.pokeApiService.getPokemon(pokemonModal).subscribe((data: any) => {
            const spritesPoke: any[] = [];

            const {
                sprites: { front_default, back_default, front_shiny, back_shiny },
                base_experience,
                id,
                weight,
                height,
                name,
                abilities,
                game_indices,
                moves,
                stats,
                types,
            } = data;

            this.abilities = abilities.map((ability: any) => ability);
            this.gameIndices = game_indices.map((game: any) => game);
            this.moves = moves.map((move: any) => move);
            this.stats = stats.map((stat: any) => stat);
            this.typesPokemon = types.map((type: any) => type);

            this.weight = weight;
            this.height = height;
            this.namePokemon = name;
            this.baseExperience = base_experience;
            this.id = id;

            spritesPoke.push(front_default, back_default, front_shiny, back_shiny);

            this.sprites = spritesPoke;
        });
    }

    // Obterner Info de un pokemon mediante autocomplete
    getPokemonData() {
        this.pokeApiService.getPokemon(this.pokemonSelected).subscribe((data: any) => {
            const {
                sprites: { front_default, back_default },
                base_experience,
                id,
                weight,
                height,
                name,
                abilities,
                game_indices,
                moves,
                stats,
                types,
            } = data;

            this.abilities = abilities.map((ability: any) => ability);
            this.gameIndices = game_indices.map((game: any) => game);
            this.moves = moves.map((move: any) => move);
            this.stats = stats.map((stat: any) => stat);
            this.typesPokemon = types.map((type: any) => type);

            this.imgFrontPokemon = front_default;
            this.imgBackPokemon = back_default;
            this.weight = weight;
            this.height = height;
            this.namePoke2 = name;
            this.baseExperience = base_experience;
            this.id = id;
        });
    }

    // Método para el componente autocomplete
    search(event: AutoCompleteCompleteEvent) {
        this.pokeApiService.getAllPokemon().subscribe((data: any) => {
            this.pokemonByName = data.results.map((pokemon: any) => pokemon.name);
            this.suggestions = this.pokemonByName.filter((pokemon) =>
                pokemon.includes(event.query.toLowerCase()),
            );
        });
    }

    // Mostrar Modal
    showDialog() {
        this.visible = true;
    }
}
