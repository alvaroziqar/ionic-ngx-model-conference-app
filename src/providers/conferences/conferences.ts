import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { tap } from 'rxjs/operators';

import { ModelFactory, Model } from 'ngx-model';

import { Conference } from './../../interfaces/conference.interface';

@Injectable()
export class ConferencesProvider {

  private model: Model<Conference[]>
  conferences$: Observable<Conference[]>

  endpoint = 'http://5b9204a24c818e001456e89f.mockapi.io/conferences'

  constructor(
    public http: HttpClient,
    private modelFactory: ModelFactory<Conference[]>
  ) {
    
    this.model = this.modelFactory.create([]);
    this.conferences$ = this.model.data$;

  }

  getConferences() {
    return this.http.get(this.endpoint)
      .pipe(
        tap((conferences: Conference[]) => {
          this.model.set(conferences);
        })
      );
  }

}
