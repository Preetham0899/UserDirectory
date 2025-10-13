import auth from '@react-native-firebase/auth';

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
