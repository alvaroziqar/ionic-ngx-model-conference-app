import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, AlertController } from 'ionic-angular';
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
    private speakersProv: SpeakersProvider,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController
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

  removeSpeaker(speaker: Speaker) {
    let alert = this.alertCtrl.create({
      title: 'Information',
      subTitle: 'Are you sure?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Ok',
          handler: () => {
            this.speakersProv.removeSpeaker(speaker).subscribe();
          }
        }
      ]
    });

    alert.present();
  }

  updateSpeaker(speaker: Speaker) {
    let modal = this.modalCtrl.create('SpeakerFormPage', { speaker: speaker });
    
    modal.onWillDismiss((data) => {
      if (data && data.speaker) {
        this.speakersProv.updateSpeaker(data.speaker).subscribe();
      }
    });

    modal.present();
  }
  
  createSpeaker() { 
    let modal = this.modalCtrl.create('SpeakerFormPage', { speaker: null });
    
    modal.onWillDismiss((data) => {
      if (data && data.speaker) {
        data.speaker.conferenceId = parseInt(this.conference.id);
        this.speakersProv.createSpeaker(data.speaker).subscribe();
      }
    });

    modal.present();
  }

}
