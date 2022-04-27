import React, { useRef } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Appbar } from 'react-native-paper';
import { Button, StyleSheet, Text, View, ImageBackground } from 'react-native';
import { Canvas, CanvasRef } from '@benjeau/react-native-draw';
import { v4 as uuid } from 'uuid';

export default function App() {

  const canvasRef = useRef();

  const handleUndo = () => {
    canvasRef.current?.undo();
  };

  const handleClear = () => {
    canvasRef.current?.clear();
  };

  const identify = () => {
    // Save SVG file with random UUID as name:
    let uuid = uuid();
    let currentShape = canvasRef.current?.getSvg();
    fs.writeFile("./"+uuid+".svg", currentShape, 'ascii').then(res => {
      console.log(res);
    })
    .catch(err => {
      console.log(err);
    })

    console.log(currentShape)
    // TODO: Upload SVG file to S3
    // Upload PNG file to S3:
    // Identify symbol with custom labels:
    console.log("Identifying!")
    let response = {statusCode: 200}
    console.log(response)
    handleClear();
    return response
  }

  return (
    <View style={styles.container}>
      <View style={{height: "8%"}}>
      <Appbar style={styles.header}>
        <Appbar.BackAction onPress={() => {}} />
        <Appbar.Content title="Amadeus" subtitle={'A new type of composition app'} />
        <Appbar.Action
          icon="plus"
          onPress={() => console.log('Open supported symbols')}
        />
        <Appbar.Action icon="restart" onPress={() => handleClear()} />
        <Appbar.Action icon="magnify" onPress={() => identify()} />
      </Appbar>
      </View>
      <View style={{height: "5%", marginTop: 12}}>
        <Text style={styles.compTitle}>Ode to Joy</Text>
      </View>
      <View style={{height: "2%"}}>
        <Text style={styles.compSubTitle}>Bottom Text</Text>
      </View>
      <View style={{height: "2%", marginRight: 30}}>
        <Text style={styles.composerNote}>Composed by Esteban D. Espinoza</Text>
      </View>
      <View style={{height: "2%", marginLeft: 55, marginTop: 10}}>
        <Text style={styles.compTempo}>120</Text>
      </View>
      <View style={{marginLeft: 30, marginRight: 30, backgroundColor: 'yellow'}}>
      <ImageBackground 
        source={require('./assets/staves.png')}
        style={{ width: "auto"}}
      >
        <Canvas ref={canvasRef} style={styles.canvas}/>
      </ImageBackground>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  compTitle: {
    textAlign: 'center',
    textAlignVertical: 'center',
    color: 'black',
    fontSize: 48,
    fontFamily: 'Baskerville',
  },
  compSubTitle: {
    textAlign: 'center',
    textAlignVertical: 'center',
    color: 'black',
    fontSize: 22,
    fontFamily: 'Baskerville',
  },
  composerNote: {
    textAlign: 'right',
    textAlignVertical: 'bottom',
    top: 20,
    color: 'black',
    fontSize: 16,
    fontFamily: 'Baskerville',
  },
  compTempo: {
    textAlign: 'left',
    textAlignVertical: 'bottom',
    color: 'black',
    fontSize: 16,
    fontFamily: 'Baskerville',
    fontWeight: 'bold',
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#ffffff',
  },
  canvas: {
    backgroundColor: 'transparent',
  },
  header: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: '100%',
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
});
