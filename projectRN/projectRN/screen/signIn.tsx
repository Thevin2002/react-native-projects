import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';

const LoginScreen = () => {
  const [mobileNumber, setMobileNumber] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Implement login logic here (e.g., send data to the backend API).
  };

  return (
    <View>
      <Text>Mobile Number:</Text>
      <TextInput onChangeText={setMobileNumber} />
      {/* Password input */}
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
};

export default LoginScreen;
