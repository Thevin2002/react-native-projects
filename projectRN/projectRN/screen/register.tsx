import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';

const RegistrationScreen = () => {
  const [mobileNumber, setMobileNumber] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [userType, setUserType] = useState('');
  const [password, setPassword] = useState('');

  const handleRegistration = () => {
    // Implement registration logic here (e.g., send data to the backend API).
  };

  return (
    <View>
      <Text>Mobile Number:</Text>
      <TextInput onChangeText={setMobileNumber} />
      {/* Other input fields for first name, last name, user type, and password */}
      <Button title="Register" onPress={handleRegistration} />
    </View>
  );
};

export default RegistrationScreen;
