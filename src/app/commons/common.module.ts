import { NgModule } from '@angular/core';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

import { MatCommonModule, MatMenuModule, MatSidenavModule, MatTabsModule, MatChipsModule, MatProgressSpinnerModule, MatProgressBarModule, MatSelectModule, MatButtonToggleModule, MatCardModule, MatToolbarModule, MatFormFieldModule, MatIconModule, MatListModule, MatButtonModule } from '@angular/material';

@NgModule({
    imports: [InfiniteScrollModule, MatCommonModule, MatMenuModule, MatSidenavModule, MatTabsModule, MatChipsModule, MatProgressSpinnerModule, MatProgressBarModule, MatSelectModule, MatButtonToggleModule, MatCardModule, MatToolbarModule, MatFormFieldModule, MatIconModule, MatListModule, MatButtonModule],
    exports: [InfiniteScrollModule, MatCommonModule, MatMenuModule, MatSidenavModule, MatTabsModule, MatChipsModule, MatProgressSpinnerModule, MatProgressBarModule, MatSelectModule, MatButtonToggleModule, MatCardModule, MatToolbarModule, MatFormFieldModule, MatIconModule, MatListModule, MatButtonModule],
    providers: [],
})
export class CommonModule { }
