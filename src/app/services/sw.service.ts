import { Injectable } from '@angular/core';
import { interval } from 'rxjs';
import { SwUpdate } from '@angular/service-worker';

function promptUser(event): boolean {
  return true;
}

@Injectable()
export class SwService {
  constructor(updates: SwUpdate) {
    // log sw updates
    updates.available.subscribe(event => {
      console.log('current version is', event.current);
      console.log('available version is', event.available);
    });
    updates.activated.subscribe(event => {
      console.log('old version was', event.previous);
      console.log('new version is', event.current);
    });

    // check for updates
    interval(6 * 60 * 60).subscribe(() => updates.checkForUpdate());

    // reload the app after updates
    updates.available.subscribe(event => {
      if (promptUser(event)) {
        updates.activateUpdate().then(() => document.location.reload());
      }
    });
  }
}
