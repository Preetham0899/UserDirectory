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

const AddUserScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const dispatch = useDispatch();

  const handleAdd = () => {
    if (!name || !email) {
      Alert.alert('Error', 'Please fill in all required fields.');
      return;
    }

    const newUser = { name, email, phone };

    //  Dispatch Redux action
    dispatch(addUser(newUser))
      .unwrap()
      .then(() => {
        Alert.alert('Success', 'User added successfully!');
        navigation.navigate('UserList'); // go back only after success
      })
      .catch((err) => {
        Alert.alert('Error', err.message);
      });
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
