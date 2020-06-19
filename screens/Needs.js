import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
 // AsyncStorage
} from 'react-native';
//import axios from 'axios';
let water = 0, tea = 0, coffee = 0, tissue = 0, other = 0, Token, company
export default class Needs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      needs: {
        water: 0,
        coffee: 0,
        tissue: 0,
        tea: 0,
        other: 0,
      },
    }
    this.getData();
  }
  async getData() {
    try {
    //  Token = await AsyncStorage.getItem('Token');
    //  Id = await AsyncStorage.getItem('Id');
    //  company = await AsyncStorage.getItem('Company');
    }
    catch (error) {
      console.log("err", error);
    }
  }
  _add(x) {
    return ++x;
  }
  _sendNeeds(water,coffee,tea,tissue,other) {
    console.log("");
    axios(
      {
        method: 'POST',
        url: `https://blabla.com/api/need`,
        headers: { 'X-Client-Token': Token },
        data: {
          company,
          needs:{
            water,
            coffee,
            tea,
            tissue,
            other
          }
        }
      })
      .then(res => {
        console.log('dönüt = ', res);
      })
      .catch((err) => {
        console.log(res);
      })
  }

  render() {
    return (
      <View style={styles.container}>
        <Text> Departman İhtiyacı Seçin </Text>
        <TouchableOpacity
          onPress={() => { water = this._add(water) }}
          underlayColor="white">
          <View>
            <Text>Su</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => { tea = this._add(tea) }}
          underlayColor="white">
          <View>
            <Text>Çay</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => { coffee = this._add(coffee) }}
          underlayColor="white">
          <View>
            <Text>Kahve</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => { tissue = this._add(tissue) }}
          underlayColor="white">
          <View>
            <Text>Peçete</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => { other = this._add(other) }}
          underlayColor="white">
          <View>
            <Text>Diğer ihtiyaçlar</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => this._sendNeeds(water,coffee,tea,tissue,other)}
          underlayColor="white">
          <View>
            <Text>Send them</Text>
          </View>
        </TouchableOpacity>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "rgba(255,255,255,0.2)",
  },
})

