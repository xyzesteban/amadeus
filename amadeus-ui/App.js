import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ImageBackground } from 'react-native';

import Canvas from './components/Canvas';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Amadeus Test</Text>
      <ImageBackground 
        source={require('./assets/staves.png')}
        style={{ width: "95%", height: "95%", alignSelf: "center" }}
      >
        {/* <Canvas /> */}
      </ImageBackground>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
