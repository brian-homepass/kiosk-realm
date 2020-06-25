import React, {useState} from 'react';
import {View, ScrollView, StyleSheet, FlatList} from 'react-native';
import {Button, Text, Input, Divider, Overlay} from 'react-native-elements';
import moment from 'moment';
import {useCheckins} from './CheckinsProvider';

export function CheckInItem({name, date}) {
  return (
    <View style={styles.item}>
      <Text style={{fontSize: 20}}>{name}</Text>
      <Text>{moment(date).format('DD-MM-YYYY hh:mm:ss')}</Text>
    </View>
  );
}

export function CheckInView({spaceTitle}) {
  const {createCheckin, checkins} = useCheckins();

  const [isCheckInView, setIsCheckInView] = useState(true);
  const [isOverlayVisible, setIsOverlayVisible] = useState(false);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');

  const timeout = async ms => {
    return new Promise(resolve => setTimeout(resolve, ms));
  };

  return (
    <>
      <View style={styles.navigation}>
        <Button
          onPress={() => setIsCheckInView(true)}
          title="Check In"
          type={isCheckInView ? 'solid' : 'clear'}
        />
        <Button
          onPress={() => setIsCheckInView(false)}
          title="List"
          type={!isCheckInView ? 'solid' : 'clear'}
        />
      </View>
      <Divider />
      {isCheckInView && (
        <View style={styles.container}>
          <Text style={styles.space} h4>
            Check in
          </Text>
          <Text style={styles.space}>{spaceTitle}</Text>
          <Input placeholder="Name" onChangeText={setName} value={name} />
          <Input placeholder="Email" onChangeText={setEmail} value={email} />
          <Input placeholder="Mobile" onChangeText={setMobile} value={mobile} />
          <Button
            onPress={async () => {
              createCheckin({name, email, mobile});
              setIsOverlayVisible(true);
              await timeout(1000);
              setIsOverlayVisible(false);
              setName('');
              setEmail('');
              setMobile('');
            }}
            title="Continue"
          />
        </View>
      )}
      {!isCheckInView && (
        <FlatList
          data={checkins}
          renderItem={checkin => (
            <CheckInItem
              name={checkin.item.name}
              date={checkin.item.checkinDate}
            />
          )}
          keyExtractor={checkin => checkin.index}
        />
      )}
      <Overlay isVisible={isOverlayVisible}>
        <View style={styles.overlay}>
          <Text h4>You have been checked in, {name}!</Text>
        </View>
      </Overlay>
    </>
  );
}

const styles = StyleSheet.create({
  navigation: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 10,
    marginBottom: 10,
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
    margin: 20,
  },
  space: {
    marginBottom: 10,
  },
  overlay: {
    margin: 10,
  },
  item: {
    margin: 15,
  },
});
