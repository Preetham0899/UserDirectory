import React, { useEffect, useCallback, memo, useState, useMemo } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  Alert,
  TextInput,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, deleteUser } from '../redux/userSlice';
import { logoutUser } from '../services/authService'; //  import logout

//  Memoized row for performance
const UserRow = memo(({ user, onPress, onDelete }) => {
  return (
    <View style={styles.itemContainer}>
      <TouchableOpacity style={{ flex: 1 }} onPress={() => onPress(user)}>
        <Text style={styles.name}>{user.name}</Text>
        <Text style={styles.email}>{user.email}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.deleteButton} onPress={() => onDelete(user.id)}>
        <Text style={styles.deleteText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );
});

const UserListScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { data, loading, page, hasMore } = useSelector((state) => state.users);
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch first page of users when component mounts
  useEffect(() => {
    dispatch(fetchUsers(1));
  }, [dispatch]);

  // Delete user handler
  const handleDelete = useCallback(
    (id) => {
      Alert.alert('Confirm Delete', 'Are you sure you want to delete this user?', [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', style: 'destructive', onPress: () => dispatch(deleteUser(id)) },
      ]);
    },
    [dispatch]
  );

  // Navigate to user detail screen
  const handleUserPress = useCallback(
    (user) => navigation.navigate('UserDetail', { user }),
    [navigation]
  );

  // Pull-to-refresh
  const handleRefresh = useCallback(() => {
    dispatch(fetchUsers(1));
  }, [dispatch]);

  // Load next page
  const handleLoadMore = useCallback(() => {
    if (!loading && hasMore) {
      dispatch(fetchUsers(page + 1));
    }
  }, [loading, hasMore, dispatch, page]);

  // Search handler
  const handleSearchChange = useCallback((text) => {
    setSearchQuery(text);
  }, []);

  // Filter users by name/email
  const filteredData = useMemo(() => {
    if (!searchQuery.trim()) return data;
    return data.filter(
      (user) =>
        user.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [data, searchQuery]);

  // Logout handler
  const handleLogout = async () => {
    try {
      await logoutUser();
      navigation.replace('Login'); // 👈 navigate back to login screen
    } catch (error) {
      Alert.alert('Logout Error', error.message);
    }
  };

  // Render each row
  const renderItem = useCallback(
    ({ item }) => <UserRow user={item} onPress={handleUserPress} onDelete={handleDelete} />,
    [handleUserPress, handleDelete]
  );

  // Footer loading spinner
  const renderFooter = () =>
    loading ? (
      <View style={styles.footer}>
        <ActivityIndicator size="small" color="blue" />
      </View>
    ) : null;

  return (
    <View style={styles.container}>
      
      <TextInput
        style={styles.searchInput}
        placeholder="Search by name or email..."
        value={searchQuery}
        onChangeText={handleSearchChange}
      />

      
      {filteredData.length === 0 && !loading ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No users found</Text>
        </View>
      ) : (
        <FlatList
          data={filteredData}
          renderItem={renderItem}
          keyExtractor={(item, index) => item.id?.toString() ?? index.toString()}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.5}
          ListFooterComponent={renderFooter}
          refreshing={loading}
          onRefresh={handleRefresh}
          initialNumToRender={5}
          maxToRenderPerBatch={5}
          windowSize={10}
          removeClippedSubviews
        />
      )}

      
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('AddUser')}
      >
        <Text style={styles.addButtonText}>Add User</Text>
      </TouchableOpacity>

      
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default UserListScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  searchInput: {
    margin: 10,
    padding: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    fontSize: 16,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  name: { fontSize: 16, fontWeight: 'bold' },
  email: { color: '#666' },
  deleteButton: {
    backgroundColor: '#ff3b30',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  deleteText: { color: '#fff', fontWeight: '600' },
  footer: { paddingVertical: 20 },
  addButton: {
    position: 'absolute',
    bottom: 60,
    left: 0,
    right: 0,
    backgroundColor: '#007AFF',
    padding: 15,
  },
  addButtonText: { color: '#fff', fontSize: 16, textAlign: 'center' },
  logoutButton: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#ff3b30',
    padding: 15,
  },
  logoutText: { color: '#fff', fontSize: 16, textAlign: 'center', fontWeight: '600' },
  emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 50 },
  emptyText: { fontSize: 16, color: '#888' },
});
