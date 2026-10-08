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
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function Home({route, navigation}) {
  const [homeusers, setHomeUsers] = useState([]);
  async function m() {
    var userJsonText = await AsyncStorage.getItem('user');
    var request = new XMLHttpRequest();
    var form = new FormData();
    form.append('userJsonText', userJsonText);
    request.onreadystatechange = function () {
      if (request.readyState == 4 && request.status == 200) {
        setHomeUsers(JSON.parse(request.responseText));
      }
    };
    request.open('POST', 'http://192.168.1.187/react_chat/load_user.php', true);
    request.send(form);
  }

  const homeui = (
    <SafeAreaView style={homeStyle.main}>
      <StatusBar backgroundColor="#1C1C1E" barStyle="light-content" />
      <View style={{width:'100%',height:40, backgroundColor:'#1C1C1E',}}></View>
      <FlatList data={homeusers} renderItem={homeItem} />
    </SafeAreaView>
  );
  function start(){
    setInterval(m,5000);
   }
  start();
  return homeui;

  function homeItem({item}) {
    const homeitemUi = (
      <Pressable onPress={GoToChat}>
        <View style={homeStyle.userMainView}>
          <Image
            style={homeStyle.profile}
            source={{uri: 'http://10.0.2.2/react_chat/' + item.pic}}
          />
          <View style={homeStyle.userSubView1}>
          <Text style={homeStyle.userName}>
            {item.name.length > 13 ? item.name.substring(0, 13) + "." : item.name.substring(0, 13)}
          </Text>
          <Text style={homeStyle.latestChat}>
            {item.msg.length > 13 ? item.msg.substring(0, 13) + "..." : item.msg.substring(0, 13)}
          </Text>
          </View>
          <View style={homeStyle.userSubView2}>
            <Text style={homeStyle.time}>{item.time}</Text>
            <View style={homeStyle.countView}>
              <Text style={homeStyle.count}>{item.count}</Text>
            </View>
          </View>
        </View>
      </Pressable>
    );
    return homeitemUi;
    function GoToChat() {
      const Obj = {
        name: item.name,
        id: item.id,
        img: 'http://192.168.42.177/react_chat/' + item.pic,
      };
      // Alert.alert('Success', JSON.stringify(Obj));
      navigation.navigate('Chat', Obj);
      
    }
  }
}

const homeStyle = StyleSheet.create({
  main: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'black',
  },
  inputIcon: {
    position: 'absolute',
    right: 40,
    paddingTop: 20,
  },
  profile: {
    width: 50,
    height: 50,
    borderRadius: 35,
  },
  userMainView: {
    marginVertical: 2,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#d7ffff',
    paddingVertical: 10,
  },
  userSubView1: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    paddingHorizontal: 20,
    width: '53%',
  },
  userSubView2: {
    flexDirection: 'column',
    alignItems: 'flex-end',
    width: '23%',
  },
  countView: {
    width: 27,
    height: 27,
    borderRadius: 20,
    backgroundColor: '#4646ff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  userName: {
    color: 'black',
    fontSize: 20,
  },
  latestChat: {
    color: 'black',
    fontSize: 16,
  },
  time: {
    color: 'black',
    fontSize: 13,
  },
  count: {
    color: 'white',
  },
});
