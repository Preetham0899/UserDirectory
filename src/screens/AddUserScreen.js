import React, { useState } from 'react';
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  TouchableOpacity,
  Text,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { addUser } from '../redux/userSlice';
import firestore from '@react-native-firebase/firestore';

const AddUserScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const dispatch = useDispatch();

  const handleAdd = async () => {
    if (!name || !email) {
      Alert.alert('Error', 'Please fill in all required fields.');
      return;
    }

    const newUser = {
      name,
      email,
      phone,
      createdAt: firestore.FieldValue.serverTimestamp(), //  for ordering
    };

    try {
      await firestore().collection('users').add(newUser); //  save to Firestore
      Alert.alert('Success', 'User added successfully!');
      navigation.navigate('UserList'); //  Go back to list
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  return (
    <View style={styles.container}>
      
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.navigate('UserList')}
      >
        <Text style={styles.backText}> Back to Users</Text>
      </TouchableOpacity>

      <TextInput
        placeholder="Name"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        keyboardType="email-address"
      />
      <TextInput
        placeholder="Phone"
        value={phone}
        onChangeText={setPhone}
        style={styles.input}
        keyboardType="phone-pad"
      />

      <Button title="Add User" onPress={handleAdd} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  backButton: {
    alignSelf: 'flex-start',
    marginBottom: 20,
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: '#007AFF',
    borderRadius: 5,
  },
  backText: { color: '#fff', fontSize: 16 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 15,
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
  },
});

export default AddUserScreen;
