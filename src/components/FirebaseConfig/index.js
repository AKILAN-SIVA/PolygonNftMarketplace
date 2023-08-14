import { initializeApp } from "firebase/app";
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyBBPUgkyNxirte8Ki2mbPljHFbNZSnsW2M",
    authDomain: "nftmarketplace-343aa.firebaseapp.com",
    databaseURL: "https://nftmarketplace-343aa-default-rtdb.firebaseio.com",
    projectId: "nftmarketplace-343aa",
    storageBucket: "nftmarketplace-343aa.appspot.com",
    messagingSenderId: "54841808616",
    appId: "1:54841808616:web:83447e6cbb81c1d8459b5d"
};


const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);