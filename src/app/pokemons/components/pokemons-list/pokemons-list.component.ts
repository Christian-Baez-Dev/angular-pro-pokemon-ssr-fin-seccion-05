import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { PokemonsCardComponent } from "../pokemons-card/pokemons-card.component";
import { SimplePokemon } from '../../interfaces/simple-pokemon';

@Component({
  selector: 'app-pokemons-list',
  standalone: true,
  imports: [PokemonsCardComponent],
  templateUrl: './pokemons-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PokemonsListComponent {
  pokemons = input.required<SimplePokemon[]>()
}
