
import { initializeApp } from 'firebase/app'; import { getAuth } from 'firebase/auth'; import { getFirestore } from 'firebase/firestore';
const cfg={apiKey:process.env.NEXT_PUBLIC_FB_API_KEY,authDomain:'enerjettix.firebaseapp.com',projectId:'enerjettix',storageBucket:'enerjettix.appspot.com',messagingSenderId:process.env.NEXT_PUBLIC_FB_MSG,appId:process.env.NEXT_PUBLIC_FB_APP_ID};
const app=initializeApp(cfg as any); export const auth=getAuth(app); export const db=getFirestore(app);
