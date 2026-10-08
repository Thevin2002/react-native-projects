import React, {useState} from 'react';
import {
  Alert,
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Pressable,
  StatusBar,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

export function Home({route, navigation}) {
  const [homeusers, setHomeUsers] = useState([]);
  async function m() {
    var userJsonText = await AsyncStorage.getItem('user');
    var request = new XMLHttpRequest();
    var form = new FormData();
    form.append('userJsonText', userJsonText);
    Alert.alert(userJsonText);
    };

  }

