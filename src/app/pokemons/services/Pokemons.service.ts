import { HttpClient, provideHttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { SimplePokemon } from '../interfaces/simple-pokemon';
import { PokeAPIResponse, Result } from '../interfaces/pokemon-api.response';
import { Pokemon } from '../interfaces/pokemon';

@Injectable({
  providedIn: 'root'
})
export class PokemonsService {

  private httpClient = inject(HttpClient)

  constructor() { }


  public loadPage(page: number): Observable<SimplePokemon[]> {
    if (page !== 0) {
      --page;
    }


    page = Math.max(0, page)

    return this.httpClient.get<PokeAPIResponse>(`https://pokeapi.co/api/v2/pokemon?offset=${page * 20}&limit=20`)
      .pipe(
        map(resp => {
          const simplePokemons: SimplePokemon[] = resp.results.map(pokemon => ({
            id: pokemon.url.split('/').at(-2) ?? '',
            name: pokemon.name
          }))


          return simplePokemons
        })
      )
  }

  public getPokemon(id:string): Observable<Pokemon>{
    return this.httpClient.get<Pokemon>(`https://pokeapi.co/api/v2/pokemon/${id}`)
  }
}
