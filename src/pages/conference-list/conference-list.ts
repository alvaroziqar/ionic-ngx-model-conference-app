import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';

import { ConferencesProvider } from './../../providers/conferences/conferences';
import { Conference } from '../../interfaces/conference.interface';

@IonicPage()
@Component({
  selector: 'page-conference-list',
  templateUrl: 'conference-list.html',
})
export class ConferenceListPage {

  conferences$: Observable<Conference[]>

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private conferencesProv: ConferencesProvider
  ) { }

  ionViewWillLoad() {
    
    this.conferences$ = this.conferencesProv.conferences$;

    // Start data flow
    this.conferencesProv.getConferences().subscribe();
    
  }

  goToDetail(conference: Conference) {
    this.navCtrl.push('ConferenceDetailPage', {conference: conference});
  }

}
