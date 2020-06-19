import React, {Component} from 'react';
import {
  Platform,
 // AsyncStorage,
  Text,
  View,
  ScrollView,
  RefreshControl,
} from 'react-native';
import styles from '../components/style';

/*import FCM, {
  FCMEvent,
  WillPresentNotificationResult,
  NotificationType,
} from "react-native-fcm"; */
//import axios from 'axios';

export default class Announces extends Component {
  constructor(props) {
    super(props);
    this.state = {
      announces: [],
      refreshing: false,
    };
  }
  onRefresh = async () => {
    try {
      this.setState({refreshing: true});
      await this.getAnnounces();
      console.log('asdasd');
      this.setState({refreshing: false});
    } catch (error) {}
  };
  async _sendFCM(token) {
    //const fcmToken = await AsyncStorage.getItem('mobileToken');
    axios({
      method: 'PUT',
      url: `https://blablabla.com/api/profile`,
      headers: {'X-Client-Token': token},
      data: {
        fcmToken,
      },
    }).catch(err => {
      console.log(err);
    });
  }
  _renderAnnouncements() {
    console.log('Announce render');
    if (!this.state.announces.length) return;
    return this.state.announces.map(announce => {
      return (
        <View style={styles.renderAnnoun} key={announce._id}>
          <Text style={styles.titleTextAnnoun}>
            {' '}
            Başlık: {announce.notification.title}{' '}
          </Text>
          <Text style={styles.announText}>
            {' '}
            İçerik: {announce.notification.content}{' '}
          </Text>
        </View>
      );
    });
  }
  /*async componentWillMount() {
    FCM.on(FCMEvent.Notification, notif => {
      if (
        Platform.OS === 'ios' &&
        notif._notificationType === NotificationType.WillPresent &&
        !notif.local_notification
      ) {
        notif.finish(WillPresentNotificationResult.All);
        return;
      }
    });
    FCM.on(FCMEvent.RefreshToken, token => {
      // AsyncStorage.setItem('mobileToken', token);
      console.log('TOKEN YENİLENDİ (refreshUnsubscribe)', token);
    });
    try {
      let result = await FCM.requestPermissions({
        badge: false,
        sound: true,
        alert: true,
      });
   //   const token = await AsyncStorage.getItem('Token');
      {
        this._sendFCM(token);
      }
    } catch (e) {
      console.log({e});
    }
    FCM.getFCMToken().then(token => {
  //    AsyncStorage.setItem('mobileToken', token);
    });
    if (Platform.OS === 'ios') {
      FCM.getAPNSToken().then(token => {
  //      AsyncStorage.setItem('APNSToken', token);
      });
    }
  }*/

  async getAnnounces() {
    try {
   /*   const token = await AsyncStorage.getItem('Token');
      const profile = await AsyncStorage.getItem('Id');
      const company = await AsyncStorage.getItem('Company');*/
      axios({
        method: 'GET',
        url: `https://shepherd.efabsrv.com/api/notification`,
        headers: {'X-Client-Token': token},
        params: {profile, company, populate: 'notification'},
      }).then(res => {
        console.log('COMPONENT DID MOUNT', res);
        this.setState({announces: res.data});
      });
    } catch (err) {
      console.log('err', err);
    }
  }
  componentDidMount() {
    this.getAnnounces();
  }
  render() {
    console.log(this.state);
    return (
      <ScrollView
        style={styles.scrollAnnoun}
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this.onRefresh}
          />
        }>
        <View style={styles.containerAnnoun}>
          <View style={styles.captionAnnoun}>
            <Text style={styles.captionTextAnnoun}> Duyurular</Text>
          </View>
          {this._renderAnnouncements()}
        </View>
      </ScrollView>
    );
  }
}
