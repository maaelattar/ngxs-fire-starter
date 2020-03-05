import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { SeoService } from 'src/app/services/seo.service';
import { tap, switchMap } from 'rxjs/operators';
import { CelebrityDataService } from '../celebrity-data.service';
import { Select, Store } from '@ngxs/store';
import { CelebrityState } from '../state/celebrity/celebrity.state';
import { Celebrity } from '../celebrity.model';
import { GetCelebrity } from '../state/celebrity/celebrity.actions';

@Component({
  selector: 'app-detail-page',
  templateUrl: './detail-page.component.html',
  styleUrls: ['./detail-page.component.scss']
})
export class DetailPageComponent implements OnInit {
  @Select(CelebrityState.selected) selectedCelebrity$
  // celebrityId: string;

  constructor(
    private route: ActivatedRoute,
    private seo: SeoService,
    private store: Store,
    public celebrityDataService: CelebrityDataService
  ) { }

  ngOnInit() {
    let celebrityId = this.route.snapshot.paramMap.get('id');
    this.store.dispatch(new GetCelebrity(celebrityId))
  }


}
