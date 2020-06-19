import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Alert,
 //AsyncStorage

} from 'react-native';
import DatePicker from 'react-native-datepicker';
import styles from '../components/style';
//import axios from 'axios'
let Token, company
export default class Progress extends Component {
  constructor(props) {
    super(props)
    this.state = {
      today: new Date(),
      begin: this.today,
      end: this.today,
    }
  }
  async _getData() {
    try {
   //   Token = await AsyncStorage.getItem('Token');
   //   Id = await AsyncStorage.getItem('Id');
   //   company = await AsyncStorage.getItem('Company');
      this._send();
    }
    catch (error) {
      console.log("err", error);
    }
  }
  _send() {
    axios({
      method: 'POST',
      url:`https://blablabla.com/api/permission`,
      headers: { 'X-Client-Token': Token },
      data: {
        title: 'Bayram Tatili',
        company,
        permission: {
          startDate: this.state.begin,
          endDate: this.state.end,
        }
      }
    })
    .then(res => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    })
    this._sendAlert()
  }

  _sendAlert() {
    Alert.alert(
      'İzin isteği gönderildi', '',
      [
        { text: 'Tamam' },
      ]
    )
  }

  render() {
    console.log(this.state.today);
    console.log(this.state.begin, ("bitiş"), this.state.end)
    return (
      <View style={styles.containerProgress}>
        <Text> İzin başlangıç tarihi </Text>
        <DatePicker
          style={{ width: 200 }}
          date={this.state.begin}
          mode="date"
          format="DD-MM-YYYY"
          minDate="01-01-2018"
          maxDate="01-06-2020"
          confirmBtnText="Tamamlandı"
          cancelBtnText="Vazgeç"
          customStyles={{
            dateIcon: {
              position: 'absolute',
              left: 0,
              top: 4,
              marginLeft: 0
            },
            dateInput: {
              marginLeft: 36
            }
          }}
          onDateChange={(date) => { this.setState({ begin: date }) }}
        />
        <Text style={{ padding: 10 }}> İzin bitiş tarihi</Text>
        <DatePicker
          style={{ width: 200 }}
          date={this.state.end}
          mode="date"
          format="DD-MM-YYYY"
          minDate="01-01-2000"
          maxDate="01-06-2020"
          confirmBtnText="Tamamlandı"
          cancelBtnText="Vazgeç"
          customStyles={{
            dateIcon: {
              position: 'absolute',
              left: 0,
              top: 4,
              marginLeft: 0
            },
            dateInput: {
              marginLeft: 36
            }
          }}
          onDateChange={(date) => { this.setState({ end: date }) }}
        />
        <TouchableOpacity
          onPress={() => this._getData()}>
          <Text> İstek yolla </Text>
        </TouchableOpacity>
      </View>
    )
  }
}
