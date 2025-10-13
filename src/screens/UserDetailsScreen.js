import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const UserDetailScreen = ({ route, navigation }) => {
  const { user } = route.params;

  return (
    <View style={styles.container}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('UserList')}>
        <Text style={styles.backText}> Back</Text>
      </TouchableOpacity>
      <Text style={styles.label}>Name:</Text>
      <Text style={styles.value}>{user.name}</Text>

      <Text style={styles.label}>Email:</Text>
      <Text style={styles.value}>{user.email}</Text>

      <Text style={styles.label}>Phone:</Text>
      <Text style={styles.value}>{user.phone}</Text>

      <Text style={styles.label}>Company:</Text>
      <Text style={styles.value}>{user.company?.name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  backButton: {
    marginBottom: 20,
    padding: 10,
    alignSelf: 'flex-start',
    backgroundColor: '#007AFF',
    borderRadius: 5,
  },
  backText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  label: { fontSize: 16, fontWeight: 'bold', marginTop: 10 },
  value: { fontSize: 15, color: '#555', marginBottom: 5 },
});

export default UserDetailScreen;
