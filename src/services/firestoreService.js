import firestore from '@react-native-firebase/firestore';

// Add new user to Firestore
export const addUserToFirestore = async (user) => {
  await firestore().collection('users').add(user);
};

// Subscribe to real-time updates
export const listenToUsers = (callback) => {
  return firestore()
    .collection('users')
    .orderBy('createdAt', 'desc')
    .onSnapshot((snapshot) => {
      const users = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      callback(users);
    });
};
