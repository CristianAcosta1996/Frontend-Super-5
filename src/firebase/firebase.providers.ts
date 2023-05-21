import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { FirebaseAuth } from "./firebase.config";

const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(FirebaseAuth, googleProvider);
    /* const credentials = GoogleAuthProvider.credentialFromResult(result); */
    const { displayName, email, photoURL, uid } = result.user;

    return {
      ok: true,
      displayName,
      email,
      photoURL,
      uid,
    };
  } catch (error: any) {
    console.log(error.message);
    const errorCode = error.code.slice(0, -1);
    const errorMessage = error.message.slice(0, -1);
    return {
      ok: false,
      errorMessage: errorMessage,
    };
  }
};
