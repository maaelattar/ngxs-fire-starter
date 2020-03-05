import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DetailPageComponent } from './detail-page/detail-page.component';
import { ListPageComponent } from './list-page/list-page.component';
import { SharedModule } from '../shared/shared.module';
import { CelebritiesRoutingModule } from './celebrities-routing.module';
import { NgxsModule } from '@ngxs/store';
import { CelebrityState } from './state/celebrity/celebrity.state';

@NgModule({
  declarations: [DetailPageComponent, ListPageComponent],
  imports: [NgxsModule.forFeature([CelebrityState]), CommonModule, SharedModule, CelebritiesRoutingModule]
})
export class CelebritiesModule { }
