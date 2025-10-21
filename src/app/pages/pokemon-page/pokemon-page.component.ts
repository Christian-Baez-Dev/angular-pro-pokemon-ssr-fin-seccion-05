import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { sign } from 'crypto';
import { Pokemon } from '../../pokemons/interfaces/pokemon';
import { ActivatedRoute } from '@angular/router';
import { PokemonsService } from '../../pokemons/services/Pokemons.service';
import { Meta, Title } from '@angular/platform-browser';
import { tap } from 'rxjs';

@Component({
  selector: 'app-pokemon-page',
  standalone: true,
  imports: [],
  templateUrl: './pokemon-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PokemonPageComponent implements OnInit {


  pokemon = signal<Pokemon | null>(null)
  private route = inject(ActivatedRoute)
  private pokemonService = inject(PokemonsService)
  private title = inject(Title)
  private meta = inject(Meta)

  ngOnInit(): void {
    const pokemonId = this.route.snapshot.paramMap.get('id')

    if (!pokemonId) return;


    this.pokemonService.getPokemon(pokemonId)
      .pipe(
        tap(({ name, id }) => {
          const pageTitle = `#${id} - ${name}`
          const pageDescription = `Pagina del Pokemon ${name}`


          this.title.setTitle(pageTitle)
          this.meta.updateTag({ name: 'description', content: pageDescription })
          this.meta.updateTag({ name: 'og:title', content: pageTitle })
          this.meta.updateTag({ name: 'og:description', content: pageDescription })
          this.meta.updateTag({ name: 'og:img',
            content: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png` })

        })
      )
      .subscribe(this.pokemon.set)

  }
}
