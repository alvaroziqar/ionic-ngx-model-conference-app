import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';

import { SpeakersProvider } from './../../providers/speakers/speakers';
import { Conference } from '../../interfaces/conference.interface';
import { Speaker } from '../../interfaces/speaker.interface';

@IonicPage()
@Component({
  selector: 'page-conference-detail',
  templateUrl: 'conference-detail.html',
})
export class ConferenceDetailPage {

  conference: Conference;
  speakers$: Observable<Speaker[]>;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private speakersProv: SpeakersProvider
  ) { }

  ionViewWillLoad() {

    this.conference = this.navParams.get('conference');

    this.speakers$ = this.speakersProv.speakers$
      .pipe(
        map((speakers: Speaker[]) => {
          return speakers.filter((speaker: Speaker) => speaker.conferenceId === parseInt(this.conference.id));          
        })
      );

    // Start speakers data flow
    this.speakersProv.getSpeakers().subscribe();
  }

}
