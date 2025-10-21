import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-pokemons-list-skeleton',
  standalone: true,
  imports: [],
  templateUrl: './pokemons-list-skeleton.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PokemonsListSkeletonComponent { }
