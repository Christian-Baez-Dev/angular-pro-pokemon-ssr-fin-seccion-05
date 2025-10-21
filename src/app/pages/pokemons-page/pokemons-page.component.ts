import { ChangeDetectionStrategy, Component, inject, OnInit, signal, effect } from '@angular/core';
import { AppComponent } from "../../app.component";
import { PokemonsListComponent } from "../../pokemons/components/pokemons-list/pokemons-list.component";
import { PokemonsListSkeletonComponent } from "./ui/pokemons-list-skeleton/pokemons-list-skeleton.component";
import { PokemonsService } from '../../pokemons/services/Pokemons.service';
import { SimplePokemon } from '../../pokemons/interfaces/simple-pokemon';
import { ActivatedRoute, Router } from '@angular/router';
import {toSignal} from '@angular/core/rxjs-interop'
import { map, tap } from 'rxjs';
import { Title } from '@angular/platform-browser';
@Component({
  selector: 'pokemons-page',
  standalone: true,
  imports: [AppComponent, PokemonsListComponent, PokemonsListSkeletonComponent],
  templateUrl: './pokemons-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PokemonsPageComponent implements OnInit {

  private pokemonService = inject(PokemonsService)
  public pokemons = signal<SimplePokemon[]>([])
  private route = inject(ActivatedRoute)
  private router = inject(Router)
  private title = inject(Title)
  public currentPage = toSignal(
    this.route.queryParamMap
    .pipe(
      map(params => params.get('page') ?? '1'),
      map(page => (isNaN(+page) ? 1 : +page)),
      map(page => Math.max(1,page))


    ))


  efecto = effect(() =>{
    console.log(!this.pokemons())
  })

  ngOnInit(): void{
    console.log(!this.pokemons())
    this.loadPokemons()
  }


  public loadPokemons(page = 0){
    const pageToLoad = this.currentPage()! + page
    this.pokemonService.loadPage(pageToLoad)
    .pipe(
      tap(() =>{

        this.router.navigate([], {queryParams: {page:pageToLoad}})
      }),
      tap(() =>{

        this.title.setTitle(`Pokemons SSR - Page ${pageToLoad}`)

      }),
    )
    .subscribe(pokemonsResponse =>{
      console.log('nuevos pokemons: ', {pokemonsResponse})
      this.pokemons.set(pokemonsResponse)
    })
  }
}
