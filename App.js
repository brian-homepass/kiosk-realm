import React from 'react';
import {SafeAreaView, View, StatusBar} from 'react-native';
import {useAuth, AuthProvider} from './src/AuthProvider';
import {LogInView} from './src/LogInView';
import {KioskView} from './src/KioskView';

const App = () => {
  return (
    <AuthProvider>
      <AppBody />
    </AuthProvider>
  );
};

function AppBody() {
  const {user} = useAuth();
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <View>{user == null ? <LogInView /> : <KioskView />}</View>
      </SafeAreaView>
    </>
  );
}

export default App;
