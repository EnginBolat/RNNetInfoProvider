import React, { useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NetworkContext, NetworkProvider } from './provider/NetworkProvider';

const App = () => {
  const { isConnected } = useContext(NetworkContext);

  return <NetworkProvider>
    <View style={styles.container}>
      <Text>{isConnected ? 'Bağlısınız!' : 'Bağlantı Yok!'}</Text>
    </View>
  </NetworkProvider>;
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
