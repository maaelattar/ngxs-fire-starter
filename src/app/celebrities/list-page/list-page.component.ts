import { Component, OnInit } from '@angular/core';
import { SeoService } from 'src/app/services/seo.service';
import { Observable } from 'rxjs';
import { CelebrityDataService } from '../celebrity-data.service';
import { ActivatedRoute } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { CelebrityState } from '../state/celebrity/celebrity.state';
import { GetCelebrities } from '../state/celebrity/celebrity.actions';

@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
  styleUrls: ['./list-page.component.scss']
})
export class ListPageComponent implements OnInit {
  @Select(CelebrityState.celebrities) celebrities$;
  constructor(
    private store: Store,
    private seoService: SeoService,
    public celebrityDataService: CelebrityDataService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.seoService.generateTags({
      title: 'celebrities List',
      description: 'A list filled with celebrities'
    });
  }
}
