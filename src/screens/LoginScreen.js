import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { loginUser } from '../services/authService';
import { signInWithGoogle, signInWithFacebook } from '../services/authService';

const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async () => {
        try {
            await loginUser(email, password);
            navigation.replace('Home'); // Navigate after login
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <View style={styles.container}>
            <TextInput placeholder="Email" value={email} onChangeText={setEmail} style={styles.input} />
            <TextInput placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry style={styles.input} />
            {error ? <Text style={styles.error}>{error}</Text> : null}
            <Button title="Login" onPress={handleLogin} />
            <Button title="Go to Register" onPress={() => navigation.navigate('Register')} />
            <TouchableOpacity onPress={signInWithGoogle}>
                <Text>Sign in with Google</Text>
            </TouchableOpacity>

            
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', padding: 20 },
    input: { borderWidth: 1, padding: 10, marginBottom: 10, borderRadius: 6 },
    error: { color: 'red', textAlign: 'center', marginBottom: 10 }
});

export default LoginScreen;
