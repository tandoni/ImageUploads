import { Component } from '@angular/core';
import { AngularFireDatabase, FirebaseObjectObservable } from "angularfire2/database";

import * as firebase from 'firebase';

interface FeaturedPhotoUrls {
  url1?: string;
  url2?: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  featuredPhotoStream: FirebaseObjectObservable<FeaturedPhotoUrls>;

  constructor(private db: AngularFireDatabase) {
    this.featuredPhotoStream = this.db.object('/photos/featured');
  }

  featuredPhotoSelected(event: any, photoName: string) {
    const file: File = event.target.files[0];

    const metaData = { 'contentType': file.type };
    const storageRef: firebase.storage.Reference = firebase.storage().ref(`/photos/featured/${photoName}`);
    const uploadTask: firebase.storage.UploadTask = storageRef.put(file, metaData);
    console.log(`Uploading: ${file.name}`);

    uploadTask.then((uploadSnapshot: firebase.storage.UploadTaskSnapshot) => {
      console.log(`Upload is complete!`);
      const downloadUrl = uploadSnapshot.downloadURL;
      firebase.database().ref(`/photos/featured/${photoName}`).set(downloadUrl);
    });
  }
}
