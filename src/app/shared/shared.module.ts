import { NgModule } from '@angular/core';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

import {
  MatCommonModule,
  MatMenuModule,
  MatSidenavModule,
  MatTabsModule,
  MatChipsModule,
  MatProgressSpinnerModule,
  MatProgressBarModule,
  MatSelectModule,
  MatButtonToggleModule,
  MatCardModule,
  MatToolbarModule,
  MatFormFieldModule,
  MatIconModule,
  MatListModule,
  MatButtonModule,
  MatDialogModule
} from '@angular/material';

@NgModule({
  imports: [
    InfiniteScrollModule,
    MatCommonModule,
    MatMenuModule,
    MatSidenavModule,
    MatTabsModule,
    MatChipsModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatSelectModule,
    MatButtonToggleModule,
    MatCardModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatIconModule,
    MatListModule,
    MatButtonModule
  ],
  exports: [
    InfiniteScrollModule,
    MatCommonModule,
    MatMenuModule,
    MatSidenavModule,
    MatTabsModule,
    MatChipsModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatSelectModule,
    MatButtonToggleModule,
    MatCardModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatIconModule,
    MatListModule,
    MatButtonModule,
    MatDialogModule
  ],
  providers: []
})
export class SharedModule {}
