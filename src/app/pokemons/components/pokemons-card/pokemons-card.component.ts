import { ChangeDetectionStrategy, Component, computed, effect, input } from '@angular/core';
import { SimplePokemon } from '../../interfaces/simple-pokemon';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-pokemons-card',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './pokemons-card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PokemonsCardComponent {
  pokemon = input.required<SimplePokemon>()
  public readonly pokemonImage = computed(() => {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${this.pokemon().id}.png`
  })

  // logEffect =  effect(() =>{})
}
