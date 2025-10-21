import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';


GoogleSignin.configure({
  webClientId: '549777638425-ssbo7p1oo5bhaevnfvutnl8pnl7dqptp.apps.googleusercontent.com',
});

export const registerUser = async (email, password) => {
  try {
    const userCredential = await auth().createUserWithEmailAndPassword(email, password);
    console.log(' User registered:', userCredential.user.email);
    return userCredential.user;
  } catch (error) {
    console.error('Registration error:', error.message);
    throw error;
  }
};


export const loginUser = async (email, password) => {
  try {
    const userCredential = await auth().signInWithEmailAndPassword(email, password);
    console.log('User logged in:', userCredential.user.email);
    return userCredential.user;
  } catch (error) {
    console.error('Login error:', error.message);
    throw error;
  }
};

export const logoutUser = async () => {
  try {
    await auth().signOut();
    console.log('User logged out successfully');
  } catch (error) {
    console.error('Logout error:', error.message);
    throw error;
  }
};


export const onAuthStateChangedListener = (callback) => {
  try {
    return auth().onAuthStateChanged(callback);
  } catch (error) {
    console.error('Auth listener error:', error.message);
    throw error;
  }
};

export const signInWithGoogle = async () => {
  try {
    // Ensure Play Services are available
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });

    // Sign in and get the user's ID token
    const { idToken } = await GoogleSignin.signIn();

    // Create a Firebase credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    // Sign in with credential
    return await auth().signInWithCredential(googleCredential);
  } catch (error) {
    console.error('Google Sign-In Error:', error);
    throw error;
  }
};


