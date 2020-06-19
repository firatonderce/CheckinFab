import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
 // AsyncStorage,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from '../components/style';
//import axios from 'axios';

let name, email, role, token, id, password
export default class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profile: {
        data: {
          email: ' ',
          name: ' ',
          role: ' ',
          passwd: ' ',
          company: [
            { name: ' ' }
          ],
          group: [
            { name: ' ' },
            { name: ' ' }
          ]
        }
      },
      caption: 'Profilim',
      style: 'red',
      edit1: false,
      edit2: false,
      edit3: false,
    }
    this.getData();
  }
  async getData() {
    try {
     // token = await AsyncStorage.getItem('Token');
     // id = await AsyncStorage.getItem('Id');
      this._request();
    }
    catch (error) {
      console.log("err", error);
    }
  }
  _request = () => {
    axios(
      {
        method: 'GET',
        url: `https://blablabla.com/api/profile/${id}`,
        headers: { 'X-Client-Token': token },
        params: { populate: 'company group' }
      })
      .then(res => {
        this.setState({ profile: res })
        name = this.state.profile.data.name;
        email = this.state.profile.data.email,
          role = this.state.profile.data.role,
          password = this.state.profile.data.passwd
      })
      .catch((err) => {
        console.log(err);
      })
  }
  _sendData() {
    axios(
      {
        method: 'PUT',
        url: `https://shepherd.efabsrv.com/api/profile/${id}`,
        headers: { 'X-Client-Token': token },
        data: {
          name,
          email,
          password
        }
      })
      .then(res => {
        console.log(res);
        console.log(token);
        this.state.profile.data.passwd = password
      })
      .catch((err) => {
        console.log(err);
      })
  }
  _renderItems =() => {
    console.log("naber")
    return this.state.profile.data.group.map((group, i) => {
      return (
        <View style={styles.textProfile} key={i}>
        <View style={styles.titleProfile}>
          <Text> Kullanıcı Grubu</Text>
        </View>
        <View style={styles.infoProfile}>
          <Text> {group.name}</Text>
        </View>
      </View>
      );
    })
  }
  _logOut=()=>{
 //   AsyncStorage.removeItem('Token');
 //   AsyncStorage.removeItem('Id');
 //   AsyncStorage.removeItem('Company');
    this.props.navigation.navigate('LoginPage');

  }
  render() {
    return (
      <View style={styles.containerProfile}>
        <View style={styles.captionProfile}>
          <Text> {this.state.captionProfile} </Text>
        </View>
        <ScrollView>
          <View style={styles.profileIconProfile}>
          <Icon name="user" size={80} />
          </View>
          <View style={styles.textProfile}>
            <View style={styles.titleProfile}>
              <Text> Kullanıcının ismi </Text>
            </View>
            <View style={styles.infoProfile}>
              <TextInput
                editable={this.state.edit1}
                value={this.state.profile.data.name}
                onChangeText={(text) => name = text}
              />
            </View>
            <View style={styles.iconsProfile}>
              <TouchableOpacity onPress={() => this.setState({ edit1: !this.state.edit1 })}>
              <Icon name="edit" size={30} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.textProfile}>
            <View style={styles.titleProfile}>
              <Text> Şifre </Text>
            </View>
            <View style={styles.infoProfile}>
              <TextInput
                editable={this.state.edit3}
                value={this.state.profile.data.passwd}
                onChangeText={(text) => password = text}
                secureTextEntry={true}
              />
            </View>
            <View style={styles.iconsProfile}>
              <TouchableOpacity onPress={() => this.setState({ edit3: !this.state.edit3 })}>
              <Icon name="edit" size={30} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.textProfile}>
            <View style={styles.titleProfile}>
              <Text> Kullanıcının Maili </Text>
            </View>
            <View style={styles.infoProfile}>
              <Text>  
                {this.state.profile.data.email}
              </Text>
            </View>
          </View>
          <View style={styles.textProfile}>
            <View style={styles.titleProfile}>
              <Text> Kullanıcının rolü </Text>
            </View>
            <View style={styles.infoProfile}>
              <Text>{this.state.profile.data.role}</Text>
            </View>
          </View>
          <View style={styles.textProfile}>
            <View style={styles.titleProfile}>
              <Text> Şirket </Text>
            </View>
            <View style={styles.infoProfile}>
              <Text>{this.state.profile.data.company[0].name}</Text>
            </View>
          </View>
          {this._renderItems()}
          <TouchableOpacity onPress={() => this._sendData()}>
            <Text style={styles.buttonProfile}> yolla </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this._logOut()}>
            <Text style={styles.buttonProfile}> Çıkış Yap </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    )
  }
}