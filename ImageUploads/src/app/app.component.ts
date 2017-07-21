import { Component } from '@angular/core';
import { AngularFireDatabase, FirebaseObjectObservable, FirebaseListObservable } from "angularfire2/database";

import * as firebase from 'firebase';

interface FeaturedPhotoUrls {
  url1?: string;
  url2?: string;
}

interface Photo {
  url: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  featuredPhotoStream: FirebaseObjectObservable<FeaturedPhotoUrls>;
  photoListStream: FirebaseListObservable<Photo[]>;

  constructor(private db: AngularFireDatabase) {
    this.featuredPhotoStream = this.db.object('/photos/featured');
    this.photoListStream = this.db.list('/photos/list');
  }

  featuredPhotoSelected(event: any, photoName: string) {
    const file: File = event.target.files[0];
    const metaData = { 'contentType': file.type };
    const storageRef: firebase.storage.Reference = firebase.storage().ref(`/photos/featured/${photoName}`);
    const uploadTask: firebase.storage.UploadTask = storageRef.put(file, metaData);
    console.log(`Uploading: ${file.name}`);

    uploadTask.then((uploadSnapshot: firebase.storage.UploadTaskSnapshot) => {
      console.log(`Upload is complete!`);
      firebase.database().ref(`/photos/featured/${photoName}`).set(uploadSnapshot.downloadURL);
    });
  }

  photoSelectedForList(event: any) {
    const file: File = event.target.files[0];
    const metaData = { 'contentType': file.type };
    const nextKey = this.photoListStream.push({}).key;
    const storageRef: firebase.storage.Reference = firebase.storage().ref(`/photos/list/${nextKey}`);
    const uploadTask: firebase.storage.UploadTask = storageRef.put(file, metaData);
    console.log(`Uploading: ${file.name}`);

    uploadTask.then((uploadSnapshot: firebase.storage.UploadTaskSnapshot) => {
      console.log(`Upload is complete!`);
      // firebase.database().ref(`/photos/list/${nextKey}`).set(nextKey);
      const photo = {'url': uploadSnapshot.downloadURL};
      this.photoListStream.update(nextKey, photo);
    });

  }
}
