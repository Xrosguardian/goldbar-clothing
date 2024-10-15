// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { 
    getAuth,
    // signInWithRedirect,
    signInWithPopup,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged
 } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { 
    getFirestore,
    doc,
    getDoc,
    setDoc,
    collection,
    writeBatch,
    query,
    getDocs
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

const googleprovider = new GoogleAuthProvider();
googleprovider.setCustomParameters({
    prompt : "select_account"
})
//we can make diferent signin method just import them make a provider and export them
export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, googleprovider);
// export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleprovider);

const db = getFirestore();

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
    const collectionRef = collection(db, collectionKey);
    const batch = writeBatch(db);

    objectsToAdd.forEach((object)=>{
        const docRef = doc(collectionRef, object.title.toLowerCase());
        batch.set(docRef, object)
    });

    await batch.commit();
    console.log('Done')
};

export const getCategoriesAndDocuments = async () => {
    const collectionRef = collection(db, 'categories');
    const q = query(collectionRef);

    const querySnapshot = await getDocs(q);
    const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
        const{title, items} =docSnapshot.data();
        acc[title.toLowerCase()] = items;
        return acc;
    },{}) 

    return categoryMap;
}

export const createUserDocumentFromAuth = async (userAuth, additionalInformation) => {
    if(!userAuth) return;
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
                createdAt,
                ...additionalInformation
            });
        } catch (error){
            console.log('error creating the user', error.message)
        }
    }

    return userDocRef;

}

export const createAuthUserWithEmailAndPassword = async(email,password) => {
    if(!email||!password) return;
    return await createUserWithEmailAndPassword(auth, email, password);
}

export const signInAuthUserWithEmailAndPassword = async(email,password) => {
    if(!email||!password) return;
    return await signInWithEmailAndPassword(auth, email, password);
}

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback) => {
    
    onAuthStateChanged(auth, callback)
}