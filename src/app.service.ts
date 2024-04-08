import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { Country, Podcast, PodcastFilter } from './interface/CodeChallengeApi';
import * as fs from 'fs';

// this is the service account key that will be used to authenticate the firebase admin
const serviceAccountKey = {
  type: 'service_account',
  project_id: 'swiftlogistic-app',
  private_key_id: '1492c863751c4d170ea47cae8b786c0b13f5a586',
  private_key:
    '-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCi7i6rdTHd3IzW\n7LSB+OCD5n2LkGvFs04OguA1CqJaKnh0Ms2zwO03lMrFzduE7LX5nYhZlxrKgskJ\nSP5mSS0wZctgdz3V2I4cX5MVbX7IgA8si2RzY6/ax2vSi57wj/dD2LaqX2QBQYmj\nJCz9BJN60AZfit6ytSN36+oRURDQm6n+IL/Pos6+Ro/K3lv625fblK3WiOoMwpLO\n/Ola1mlh0rfJNisCwWHMwnF3IIBCjMgs0adg2m7GJlo7BJxGbDfHFjplWaKfcUUJ\n7fFKQ07Non8dNlpnSpNPOOnbqo33Dviphy+UYphvvn1dXmxpCGXnJy0flcOS0RpR\nt7XI22BNAgMBAAECggEAQdND1K6pAm8gEZcZSGdx4ahF8ZRcDkgmUZOLnLJarF37\nQ0rhM23PCQUatTa5qSbvUFVWaIe1YbrcGN2+Njn7QVHnDGawe0yeAZWVeXM+5Sdj\nugXpA/ty6UtnYu1Yve0UI3uTNRsL7rv5LQmpCWIHaXdRE9mppn6rQUB1VSCwz+5m\n3r5I/tlgfuwMDiPQkkNzA4mqTNXEbbiUaIDWCk5UQf5Ev7r1DMrH8fMawxXzJAtt\nqVzlOvutyKDQ/5aOklFUXGLKFQEjiCW4nxMCEYwxMubRhmfOIT0t/r2TpLA1j05O\nI9Fp/dTlGsGLbJxcJJRoBIeYz87B7/GCYtLEUxF4iwKBgQDVNJ834vp+L2cvveoV\nFWKvxUe34LU9YOmb8alDjCsV/TQx3vELNu+G4r6rY+P5sZRz7CDQy4gifR2c34dg\nB7vfj3zvSnjsh4jXLdt7l2NCsjUUs0N9apQ0tXoNaYJZfYu1v6YpL7Rkpb3ZcRyT\nNESVeHBCL4ZUbHa5z9Q21x90WwKBgQDDojdXceHVqGWvxCubtCDizGvVip70OAv5\neqbRAo/SpdpZmCXbrbahhOevN33YLI5nJaqhTQaHDEkSvxWz2y5C/1S9E1CXS9Iq\nJJIc278iDwqx/jpPFLTyLEguKsZ6MxQRfc2S2LHn7saJA4HmgEG6LQ8Sla64xi9Z\nPPvnHX7+dwKBgHTEdjMQf+peIeBW3f4gEUV9AZNmYTy1eBwtVWumN+66Fzz9Af0H\nYFX6lzyc373gERMQDsTrw6pH5dEF50mj0rRVDLKtkd7ROBPJjLx6pCViHoowx9TH\na1YW0jrIP1it1rd6uBE0jFLXJ0wQk/rXFHzcUncdOi/Am6GWfn5ugU6jAoGAT445\nCSNznipT581Tmob+1Jwiwf0UNOZR4EtDaT2sdRIjIEoiIxqaaUad3QAo+e7snf+Q\nSvYC0IprcOcqETDxuCcTM6yWGmCn/6FNldS6/kO1qrpixeP6zXy6gaO9gNYitBY/\nshbTCilsrS0y9yRzFh3awkkCe3uEp7qICe1RxnMCgYEAoy8ei6eeYyDKyy3K7OoQ\npQvzOCBlfJZPx6QUVwfFw2tolh7GEE+yoVLBpLJ8jwjwI0AlIBfKP4NmtLc7UAmI\nRx9teC1SxzZyJfStrItghl2mJm34w4ZDc2DtsrrgK7VRzcibnDaU5VXAe0RQVlad\nKi3HWqna7Y8m7O2KmKLml3s=\n-----END PRIVATE KEY-----\n',
  client_email:
    'firebase-adminsdk-sre42@swiftlogistic-app.iam.gserviceaccount.com',
  client_id: '106183588528422559566',
  auth_uri: 'https://accounts.google.com/o/oauth2/auth',
  token_uri: 'https://oauth2.googleapis.com/token',
  auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
  client_x509_cert_url:
    'https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-sre42%40swiftlogistic-app.iam.gserviceaccount.com',
  universe_domain: 'googleapis.com',
};

// this service will call the database to retreive the data for the best_podcasts endpoint
@Injectable() // this decorator is used to define a class as a provider
export class AppService {
  // db is a private variable that will store the firestore database for AppService
  private db: FirebaseFirestore.Firestore;

  // using the constructor to initialize firebase fireStore to get the data from the database
  // also using this to log the initialization of firebase
  constructor() {
    fs.appendFileSync('log.txt', 'Initializing Firebase\n');
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccountKey as any),
      databaseURL: 'https://swiftlogistic-app-default-rtdb.firebaseio.com',
    });
    fs.appendFileSync('log.txt', 'Firebase Initialized\n');

    // store the firestore database in the db variable
    this.db = admin.firestore();
  }

  // getPodcasts function will be used to get the data for the best_podcasts endpoint
  async getPodcasts(
    page: number,
    region: string,
    safe_mode: string,
    genre_id: string,
  ): Promise<PodcastFilter> {
    // define the pagination Values
    // define the page start and page end variables
    const pageStart = (page - 1) * 10;
    const pageEnd = page * 10;

    // get podcasts test data from firestore
    const podcasts = this.db.collection('podcast').get();

    const pagination = await podcasts
      .then((snapshot) => {
        const podcastData = snapshot.docs.map((doc) => doc.data());

        // we need to filter through the data returned from the database to get the data for the best_podcasts endpoint
        // looking at the gnre and region properties of the podcast object
        const filteredPodcasts = podcastData
          .filter((podcast: Podcast) => {
            return (
              podcast.genre_ids.includes(parseInt(genre_id, 10)) &&
              podcast.country === Country[region]
            );
          })
          .slice(pageStart, pageEnd);
        const total = filteredPodcasts.length;
        // pagination logic below
        const has_next = total > pageEnd;
        const has_previous = pageStart > 0;
        const page_number = page;
        const previous_page_number = has_previous ? page - 1 : 0;
        const next_page_number = has_next ? page + 1 : 0;

        const mappedPodcasts = {
          id: parseInt(genre_id, 10),
          name: 'Best Podcasts',
          parent_id: 0,
          podcasts: filteredPodcasts,
          total,
          has_next,
          has_previous,
          page_number,
          previous_page_number,
          next_page_number,
          listennotes_url:
            'https://www.listennotes.com/c/3d2f7f1fba2e4e6f8c3d8f0c3e9e5624/',
        } as PodcastFilter;

        return mappedPodcasts;
      })
      .catch((error) => {
        fs.appendFileSync('log.txt', `Error: ${error}\n`);
        return error;
      });

    // return the data for the best_podcasts endpoint
    return pagination as PodcastFilter;
  }

  // filter the podcasts by genre and region
}
