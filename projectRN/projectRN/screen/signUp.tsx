import React, {useState} from 'react';
import { StyleSheet, View, StatusBar, Text, Image, SafeAreaView, TextInput, TouchableOpacity, Alert, } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';


export function SignUp({navigation}) {
  async function checkState() {
    const user = await AsyncStorage.getItem('user');
    if (user != null) {
        navigation.navigate('Home');
    }
  }
  checkState();

  const [mobile, setemail] = useState(null);
  const [password, setpassword] = useState(null);

  const signupUi = (
    <SafeAreaView style={signupStyles.container}>
      <StatusBar backgroundColor="#35063e" barStyle="light-content" />
      <View style={signupStyles.section1}>
        <Image source={require('./assets/box.png')} style={signupStyles.SignInboxArt}/>
        <View style={{ alignSelf: 'flex-start',margin:6, }}>
            <Text style={{ color: 'white', fontSize:30,}}>SignUp</Text>
            <Text style={{color:"white" , fontSize:18,}}>Dear user, welcome back.</Text>
        </View>
      </View>
      <View style={signupStyles.section2}>
      <View style={signupStyles.box}>
          <Image source={require('./assets/logo.png')} style={signupStyles.logo}/>
      </View>
      <View style={signupStyles.view1}>
        <TextInput
          style={signupStyles.mobileInput}
          placeholder={'Enter your name'}
          keyboardType={'name-phone-pad'}
          autoCapitalize={'none'}
          autoCorrect={false}
          maxLength={12}
          placeholderTextColor="rgba(255, 255, 255, 0.5)"
          onChangeText={setpassword}
        />
        <Icon
          name="user"
          size={20}
          color={'white'}
          style={signupStyles.inputIcon1}
        />
      </View>
      <View style={signupStyles.view1}>
        <TextInput
          style={signupStyles.mobileInput}
          placeholder={'Enter your email'}
          keyboardType={'email-address'}
          autoCapitalize={'none'}
          autoCorrect={false}
          maxLength={12}
          placeholderTextColor="rgba(255, 255, 255, 0.5)"
          onChangeText={setemail}
        />
        <Icon
          name="at"
          size={20}
          color={'white'}
          style={signupStyles.inputIcon1}
        />
        
      </View>
      <View style={signupStyles.view1}>
        <TextInput
          style={signupStyles.mobileInput}
          placeholder={'Enter your password'}
          keyboardType={'phone-pad'}
          autoCapitalize={'none'}
          autoCorrect={false}
          maxLength={12}
          placeholderTextColor="rgba(255, 255, 255, 0.5)"
          onChangeText={setpassword}
        />
        <Icon
          name="lock"
          size={20}
          color={'white'}
          style={signupStyles.inputIcon1}
        />
      </View>
      <View style={signupStyles.view1}>
        <TextInput
          style={signupStyles.mobileInput}
          placeholder={'Enter your password again'}
          keyboardType={'phone-pad'}
          autoCapitalize={'none'}
          autoCorrect={false}
          maxLength={12}
          placeholderTextColor="rgba(255, 255, 255, 0.5)"
          onChangeText={setpassword}
        />
        <Icon
          name="lock"
          size={20}
          color={'white'}
          style={signupStyles.inputIcon1}
        />
      </View>
        <TouchableOpacity style={signupStyles.button} onPress={signupprocess}>
            <Text style={signupStyles.buttonText}>Sign In</Text>
        </TouchableOpacity>
        <View style={{ flexDirection: 'row', alignItems: 'center', top:110,}}>
            <Text style={{color:'white', fontSize:16,}}>Don't have a profile? </Text>
            <Text style={{color:'green', fontSize:16, fontWeight:'bold',}}>Sign Up</Text>
        </View>
      </View>
    </SafeAreaView>
  );
  return signupUi;

  function signupprocess() {
    var jsRequestObject = {mobile: mobile, password: password};
    var jsonRequestText = JSON.stringify(jsRequestObject);

    var request = new XMLHttpRequest();
    var form = new FormData();
    form.append('jsonRequestText', jsonRequestText);
    request.onreadystatechange = function () {
      if (request.readyState == 4 && request.status == 200) {
        var jsResponseobject = JSON.parse(request.responseText);
        if (jsResponseobject.msg == 'error') {
          Alert.alert('Message', 'Invalid Details');
        } else {
          Alert.alert('Message', 'Hello' + ' ' + jsResponseobject.user.name);
          AsyncStorage.setItem('user', JSON.stringify(jsResponseobject.user));
        }
      }
    };
    request.open('POST', 'http://192.168.1.187/react_chat/signin.php', true);
    request.send(form);
  }
};


const signupStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#181D3D',
    alignItems: 'center',
  },
  section1: {
    textAlign: 'center',
    width: '100%',
    alignItems: 'center',
    backgroundColor:'#35063e',
    height:250,
    position:'absolute',
    borderBottomStartRadius:5,
    borderBottomEndRadius:5,
  },
  section2: {
    textAlign: 'center',
    width: '95%',
    alignItems: 'center',
    backgroundColor:'black',
    height:530,
    top:"10%",
    borderRadius:25,
  },
  box: {
    width: 80,
    height: 80,
    borderRadius: 20,
    position: 'absolute',
    top: 10,
  },
  button: {
    backgroundColor: '#181D3D',
    padding: 12,
    borderRadius: 8,
    width: '85%',
    alignItems: 'center',
    marginBottom: 16,
    top:90,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color:'white',
  }, 
  SignInboxArt:{
    width:'100%',
    opacity:0.4,
    position:'absolute',
  },
  logo:{
    width:80,
    height:80,
    opacity:0.8,
  },
  view1: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    top:90,
  },
  mobileInput: {
    width: '85%',
    height: 55,
    paddingLeft: 40,
    color: 'white',
    borderBottomWidth: 1,
    borderBottomColor: 'white',
    fontSize: 18,
    opacity:0.8,
  },
  inputIcon1: {
    position: 'absolute',
    left: 40,
    opacity:0.6,
  },
});

