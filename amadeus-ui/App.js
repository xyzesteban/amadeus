import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ImageBackground } from 'react-native';
import { Canvas } from '@benjeau/react-native-draw';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.compTitle}>Amadeus Test</Text>
      <ImageBackground 
        source={require('./assets/staves.png')}
        style={{ width: "95%", height: "95%", alignSelf: "center" }}
      >
        <Canvas style={styles.canvas}/>
      </ImageBackground>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  compTitle: {
    flex: 1,
    textAlign: 'center',
    textAlignVertical: 'center',
    color: 'black',
    fontSize: 48,
    // fontFamily: 'serif',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  canvas: {
    backgroundColor: 'transparent',
  }
});
