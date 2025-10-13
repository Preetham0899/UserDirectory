import auth from '@react-native-firebase/auth';

/**
 * ✅ Register a new user with email and password
 * @param {string} email 
 * @param {string} password 
 * @returns {Promise<firebase.User>} user object
 */
export const registerUser = async (email, password) => {
  try {
    const userCredential = await auth().createUserWithEmailAndPassword(email, password);
    console.log('✅ User registered:', userCredential.user.email);
    return userCredential.user;
  } catch (error) {
    console.error('❌ Registration error:', error.message);
    throw error;
  }
};

/**
 * ✅ Log in an existing user with email and password
 * @param {string} email 
 * @param {string} password 
 * @returns {Promise<firebase.User>} user object
 */
export const loginUser = async (email, password) => {
  try {
    const userCredential = await auth().signInWithEmailAndPassword(email, password);
    console.log('✅ User logged in:', userCredential.user.email);
    return userCredential.user;
  } catch (error) {
    console.error('❌ Login error:', error.message);
    throw error;
  }
};

/**
 * ✅ Log out the current user
 * @returns {Promise<void>}
 */
export const logoutUser = async () => {
  try {
    await auth().signOut();
    console.log('✅ User logged out successfully');
  } catch (error) {
    console.error('❌ Logout error:', error.message);
    throw error;
  }
};

/**
 * ✅ Listen for authentication state changes
 * - This function notifies when user logs in, logs out, or state changes
 * @param {Function} callback 
 * @returns {Function} unsubscribe function
 */
export const onAuthStateChangedListener = (callback) => {
  try {
    return auth().onAuthStateChanged(callback);
  } catch (error) {
    console.error('❌ Auth listener error:', error.message);
    throw error;
  }
};
