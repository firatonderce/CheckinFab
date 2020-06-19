import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Alert,
  Button,
  ActivityIndicator,
  //AsyncStorage, (deprecated)
} from 'react-native';
import styles from '../components/style';
import Icon from 'react-native-vector-icons/FontAwesome';
//import axios from 'axios';
let mobileToken, apnsToken, token;
export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      InputID: ' ',
      InputPw: ' ',
    };
    //this.getData();
  }
  ifLogged(profileToken) {
    if (profileToken) {
      console.log('giriş yapmışsın');
      const {navigate} = this.props.navigation;
      navigate('AnnounPage');
    }
  }
  async getData() {
    /*mobileToken= await AsyncStorage.getItem('mobileToken');
    apnsToken= await AsyncStorage.getItem('APNSToken');
    profileToken= await AsyncStorage.getItem('Token');*/
    this.ifLogged(profileToken);
    console.log({mobileToken, apnsToken});
  }
  _indicator = () => {
    <ActivityIndicator
      animating={this.state.bool}
      size="large"
      color="#0000ff"
    />;
    this._authentication();
  };
  _authentication = () => {
    const isFormNull = this.state.InputID == null || this.state.InputPw == null;
    const isFormWrong =
      this.state.InputID !== null && this.state.InputPw !== null;

    axios
      .post(`https://blablablac.com/api/login`, {
        email: this.state.InputID,
        password: this.state.InputPw,
      })
      .then(res => {
        if (res.data.code === 404 && isFormNull)
          Alert.alert('Kullanıcı adı ve şifre giriniz');
        else if (res.data.code === 404 && isFormWrong)
          Alert.alert('Kullanıcı adı ve şifre eşleşmiyor');
        else if (res.data.code !== 404) this._storeData(res);
      })
      .catch(err => {
        console.log(err);
      });
  };
  _storeData = async res => {
    try {
      token = res.data.token;
      const id = res.data.profile._id;
      const company = res.data.profile.company[0];
      /* await AsyncStorage.setItem('Token', token);
      await AsyncStorage.setItem('Id', id);
      await AsyncStorage.setItem('Company', company);*/
      console.log('token', token);
      this._login();
    } catch (error) {
      console.log('could not save the data');
    }
  };
  _login = () => {
    const {navigate} = this.props.navigation;
    Alert.alert(
      'Giriş Başarılı',
      '',
      [{text: 'Devam Et', onPress: () => navigate('Announces')}],
      {cancelable: false},
    );
  };
  _deneme() {
    this.setState({bool: !this.state.bool});
    console.log(this.state.bool);
  }

  render() {
    const {navigation} = this.props;
    return (
      <View style={styles.container}>
        <Text style={styles.texter}>
          <Icon name="user-circle" size={70} />
        </Text>
        <View style={styles.TextInputV}>
          <TextInput
            style={styles.textinput}
            placeholder="Kullanıcı Adi"
            onSubmitEditing={() => this.passwordInput.focus()}
            returnKeyType="next"
            onChangeText={InputID => this.setState({InputID})}
          />
          <TextInput
            style={styles.textinput}
            placeholder="Sifre"
            secureTextEntry
            ref={input => (this.passwordInput = input)}
            returnKeyType="done"
            onChangeText={InputPw => this.setState({InputPw})}
          />
        </View>
        <Button onPress={() => navigation.navigate('Hometabs')} title="Try" />
        <Button onPress={this._indicator.bind(this)} title="Login" />
      </View>
    );
  }
}
