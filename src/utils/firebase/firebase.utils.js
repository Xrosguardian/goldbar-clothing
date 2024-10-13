// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { 
    getAuth,
    signInWithRedirect,
    signInWithPopup,
    GoogleAuthProvider
 } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { 
    getFirestore,
    doc,
    getDoc,
    setDoc
} from "firebase/firestore";




// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBpdZ9Cqis3yLrHrrcuERf2-RmSRxgciNM",
  authDomain: "goldbar-clothing-db.firebaseapp.com",
  projectId: "goldbar-clothing-db",
  storageBucket: "goldbar-clothing-db.appspot.com",
  messagingSenderId: "338079528853",
  appId: "1:338079528853:web:b251d2f34bcfefe86b689c"
};

// Initialize Firebase
const firebaseapp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
    prompt : "select_account"
})

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
    const userDocRef = doc(db, 'users', userAuth.uid);

    //console.log(userDocRef)

    const userSnapshot = await getDoc(userDocRef);
    //console.log(userSnapshot);
    //console.log(userSnapshot.exists());
    
    //pseudo code:
    //if user data exits
    //reutn back userDocRef
    //if user data doesnot exist
    //create / set the document with the data from userAuth in my collection

    if(!userSnapshot.exists()){
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try{
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt
            });
        } catch (error){
            console.log('error creating the user', error.message)
        }
    }

    return userDocRef;

}