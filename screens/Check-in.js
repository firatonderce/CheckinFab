import React, {Component} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Alert,
//AsyncStorage,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from '../components/style';
//import axios from '../node_modules/axios';

export default class Checkin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      changeIcon: 'gps-not-fixed',
    };
  }
  async _checkIn() {
    try {
      //  const Token = await AsyncStorage.getItem('Token');
      //  const company = await AsyncStorage.getItem('Company');
      this.setState({changeIcon: 'gps-fixed'});
      this._request(Token, company);
    } catch (error) {
      console.log('err', error);
    }
  }
  _request(Token, company) {
    this.setState({changeIcon: 'gps-fixed'})
      /*axios(
      {
        method: 'POST',
        url: `https://blabla.com/api/checkin`,
        headers: { 'X-Client-Token': Token },
        data:{
          company,
        }
      }) */
      .then(res => {
        console.log(res);
        if (!res.data._id) {
          Alert.alert('Zaten checkin yaptınız', '', [{text: 'Anlaşıldı'}]);
        } else
          Alert.alert('Check-in gerçekleştirilmiştir.', '', {text: 'Tamam'});
      })
      .catch(err => {
        console.log(res);
      });
  }
  render() {
    return (
      <View style={styles.containerCheckin}>
        <Text> Check-in yapmak için butona dokun </Text>
        <TouchableOpacity
          onPress={() => this._checkIn()}
          style={styles.buttonCheckin}>
          <Icon name={this.state.changeIcon} size={110} />
        </TouchableOpacity>
      </View>
    );
  }
}
