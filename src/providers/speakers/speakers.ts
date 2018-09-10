import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { tap, switchMap } from 'rxjs/operators';

import { ModelFactory, Model } from 'ngx-model';

import { Speaker } from './../../interfaces/speaker.interface';

@Injectable()
export class SpeakersProvider {

  private model: Model<Speaker[]>;
  speakers$: Observable<Speaker[]>;

  endpoint = 'http://5b9204a24c818e001456e89f.mockapi.io/speakers'

  constructor(
    public http: HttpClient,
    private modelFactory: ModelFactory<Speaker[]>
  ) {
    
    this.model = this.modelFactory.create([]);
    this.speakers$ = this.model.data$;

  }

  getSpeakers() {
    return this.http.get(this.endpoint)
      .pipe(
        tap((speakers: Speaker[]) => {
          this.model.set(speakers);
        })
      );
  }


  removeSpeaker(speaker: Speaker) {
    const url = `${this.endpoint}/${speaker.id}`;

    return this.http.delete(url)
      .pipe(
        switchMap(() => {
          return this.getSpeakers();
        })
      );
  }

  updateSpeaker(speaker: Speaker) {
    const url = `${this.endpoint}/${speaker.id}`; 
    
    return this.http.put(url, speaker)
      .pipe(
        switchMap(() => {
          return this.getSpeakers();
        })
      );
  }

  createSpeaker(speaker: any) {
     
    return this.http.post(this.endpoint, speaker)
      .pipe(
        switchMap(() => {
          return this.getSpeakers();
        })
      );
  }

}
