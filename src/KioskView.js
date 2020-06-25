import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {Button, Divider} from 'react-native-elements';
import {useAuth} from './AuthProvider';
import {CheckinsProvider} from './CheckinsProvider';
import {CheckInView} from './CheckInView';

export function KioskView() {
  const {logOut} = useAuth();
  const [isSpaceOne, setIsSpaceOne] = useState(true);
  return (
    <>
      <Button
        onPress={logOut}
        title="Log Out"
        type="clear"
        titleStyle={styles.logOut}
      />
      <Divider />
      <View style={styles.navigation}>
        <Button
          title="28 Elizabeth St"
          onPress={() => setIsSpaceOne(true)}
          type={isSpaceOne ? 'solid' : 'clear'}
        />
        <Button
          title="5/5 Fifth St"
          onPress={() => setIsSpaceOne(false)}
          type={!isSpaceOne ? 'solid' : 'clear'}
        />
      </View>
      <Divider />
      <CheckinsProvider spaceId="020">
        {isSpaceOne && <CheckInView spaceTitle="28 Elizabeth St, Malvern" />}
      </CheckinsProvider>

      <CheckinsProvider spaceId="040">
        {!isSpaceOne && <CheckInView spaceTitle="5/5 Fifth St, Malvern" />}
      </CheckinsProvider>
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
  logOut: {
    color: 'red',
  },
});
