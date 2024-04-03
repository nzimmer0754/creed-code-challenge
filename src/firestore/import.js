import {
  initializeApp,
  credential as _credential,
  firestore,
} from 'firebase-admin';
import serviceAccount from './serviceAccount.json';
import { databaseURL as _databaseURL } from './config';

initializeApp({
  credential: _credential.cert(serviceAccount),
  databaseURL: _databaseURL,
});

const db = firestore();
// eslint-disable-next-line @typescript-eslint/no-var-requires
const data = JSON.parse(JSON.stringify(require('./sample-api-response.json')));
const importData = async function importData() {
  data.forEach((doc) => {
    db.collection('podcast').doc(doc.id).set(doc);
  });
  console.log('Data imported successfully');
  return snapshot;
};

importData()
  .then(() => {
    console.log('Data imported successfully');
  })
  .catch((error) => {
    console.log('Error importing data', error);
  });
