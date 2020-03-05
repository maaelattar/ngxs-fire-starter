import {
  State,
  NgxsOnInit,
  Selector,
  createSelector,
  Action,
  Actions,
  StateContext,
  Store,
  ofActionSuccessful
} from '@ngxs/store';
import { CelebrityDataService } from 'src/app/celebrities/celebrity-data.service';
import { Celebrity } from 'src/app/celebrities/celebrity.model';
import { GetCelebrities, GetCelebrity } from './celebrity.actions';
import { tap, debounceTime, switchMap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { LoadableStateModel } from 'src/app/shared/loadable-state/loadable';
import { patch, updateItem } from '@ngxs/store/operators';
import { from } from 'rxjs';
import { SeoService } from 'src/app/services/seo.service';
export interface CelebrityStateModel extends LoadableStateModel {
  celebrities: Celebrity[];
  selected: Celebrity
}

@State({
  name: 'celebrity',
  defaults: { celebrities: [], selected: null, loading: true, loaded: false }
})
@Injectable()
export class CelebrityState implements NgxsOnInit {
  ngxsOnInit(ctx: StateContext<CelebrityStateModel>) {
    ctx.dispatch(new GetCelebrities())
  }
  @Selector() static loading(state: CelebrityStateModel) {
    return state.loading;
  }
  @Selector() static loaded(state: CelebrityStateModel) {
    return state.loaded;
  }



  @Selector()
  static celebrities(state: CelebrityStateModel) {
    return state.celebrities;
  }

  @Selector()
  static selected(state: CelebrityStateModel) {
    return state.selected
  }

  constructor(
    private celebrityDataService: CelebrityDataService,
    private seoService: SeoService
  ) { }

  @Action(GetCelebrities)
  getCelebrities({ patchState }: StateContext<CelebrityStateModel>) {
    this.celebrityDataService
      .getCelebrities()
      .pipe(
        tap(celebrities => {
          patchState({ celebrities, loading: false, loaded: true });
        })
      )
      .subscribe();
  }
  @Action(GetCelebrity)
  getCelebrity(ctx: StateContext<CelebrityStateModel>, action: GetCelebrity) {
    let celebrity = ctx.getState().celebrities.find(c => c.id === action.payload)
    if (!!celebrity) {
      ctx.patchState({ selected: celebrity })
      this.seoService.generateTags({
        title: celebrity.name,
        description: celebrity.bio,
        image: celebrity.image
      });
    }
    else {
      this.celebrityDataService.getCelebrity(action.payload).pipe(tap(result => {
        ctx.patchState({ selected: result })
        this.seoService.generateTags({
          title: result.name,
          description: result.bio,
          image: result.image
        });
      })).subscribe()
    }

  }


}
