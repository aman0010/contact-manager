/* eslint-disable */

// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getStorage, ref, uploadBytes } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyC1jlStYQM2XFIb6bhp1-8y5tcFOutTUkg',
  authDomain: 'contact-manager-fee8f.firebaseapp.com',
  projectId: 'contact-manager-fee8f',
  storageBucket: 'contact-manager-fee8f.appspot.com',
  messagingSenderId: '242335874882',
  appId: '1:242335874882:web:e9294d33ed481d1e2752db',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage();

export const upload = (name, file) => {
  uploadBytes(ref(storage, name), file.buffer).then((snapshot) => {
    console.log('Uploaded a blob or file!');
  });
};
