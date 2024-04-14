import React, { useRef, useState } from 'react';
import { Appbar } from 'react-native-paper';
import { Image, Modal, Text, View, ImageBackground } from 'react-native';
import { Canvas } from '@benjeau/react-native-draw';
import uuid from 'react-native-uuid';
import * as FileSystem from 'expo-file-system';
import { S3 } from 'aws-sdk';
import env from './config/env';
import demo from './demo';
import draggables from './draggables';
import { composition as styles } from './styles/composition'
import { LogBox } from 'react-native';

LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you\'re using an old API with gesture components, check out new Gestures system!",
]);

LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();//Ignore all log notifications

const uploadImageOnS3 = async (fileUri, filename, contentType) => {
  const s3bucket = new S3({
    accessKeyId: env.AWS_ACCESSKEY.slice(1, 21),
    secretAccessKey: env.AWS_SECRETKEY.slice(1, 41),
    Bucket: env.AWS_UPLOADBUCKET,
    region: env.AWS_REGION,
    signatureVersion: 'v4',
  });
  //console.log(s3bucket);
  let contentDeposition = 'inline;filename="' + `${filename}` + '"';
  const file = await FileSystem.readAsStringAsync(fileUri);
s3bucket.createBucket(() => {
    const params = {
      Bucket: env.AWS_UPLOADBUCKET,
      Key: `in/${filename}`,
      Body: file,
      ContentDisposition: contentDeposition,
      ContentType: contentType,
  };
s3bucket.upload(params, (err, data) => {
    if (err) {
      //console.log('Error in callback...', err);
    }
  //console.log('Uploaded image to S3!');
  //console.log("Response URL : "+ data.Location);
  });
});
};

export default function App() {

  const [modalVisible, setModalVisible] = useState(false);
  const [canvasVisible, setCanvasVisible] = useState(false);
  const canvasRef = useRef();
  const [displayedDraggables, setDraggables] = useState(Array(demo));
  const [count, setCount] = useState(-1);

  const insertNote = (name) => {
    //console.log("Before", displayedDraggables);
    //console.log("Inserting...")
    //console.log("COUNT", count);
    /** PLACEHOLDER FOR PLACING NOTES WHEN ML MODEL IS NOT RUNNING: */
    if (count == -1) {
      setDraggables(Array(...displayedDraggables, draggables["G-Clef"]));
      setCount(count+1)
    }
    else if (count == 0) {
      setDraggables(Array(...displayedDraggables, draggables["4-4-Time"]))
      setCount(count+1)
    }
    else if (count == 5 || count == 10) {
      setDraggables(Array(...displayedDraggables, draggables["Barline"]))
      setCount(count+1)
    }
    else {
      setDraggables(Array(...displayedDraggables, draggables["Quarter-Note"]))
      setCount(count+1)
    }
    //console.log("Adding draggable!")
    
    //setDraggables(...displayedDraggables, sizes[name])
    //console.log("After", displayedDraggables);
  }

  const handleUndo = () => {
    canvasRef.current?.undo();
  };

  const handleClear = () => {
    canvasRef.current?.clear();
  };

  const identify = async() => {
    // Generate a random UUID for the file:
    let filename = uuid.v4();
    //console.log(filename);
    let svg = filename+'.svg';

    // Retrive user input to file as an SVG:
    let currentShape = canvasRef.current?.getSvg();
    //console.log(currentShape);

    // Save user input as an SVG file:
    let svgUri = FileSystem.documentDirectory + svg;
    //console.log(svgUri)
    const svgFile = await FileSystem.writeAsStringAsync(svgUri, currentShape)
    await svgFile;

    const upload = uploadImageOnS3(svgUri, svg, 'image/svg+xml');
    await upload;

    const id = fetch(`https://i8za341w99.execute-api.us-east-2.amazonaws.com/dev/amadeus-storage/${filename+'.png'}`, {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
        }).then(res => {
          console.log("Event: ", res)
          insertNote("Quarter-Note")
          //insertNote(res["CustomLabels"][0]["Name"]);
          handleClear();
          setCanvasVisible(false);
        })
        .catch(err => {
          console.log(err);
    })
    await id;
    

    return svgFile;
  }

  return (
    <View style={styles.container}>
      <View style={{height: "8%"}}>
      <Appbar style={styles.header}>
        <Appbar.Content>
          <Image source={require('./assets/logo.png')} style={{height: 20, width: 120}} />
        </Appbar.Content>
        <Appbar.Action icon="hand" onPress={() => setCanvasVisible(false)} />
        <Appbar.Action icon="draw" onPress={() => setCanvasVisible(true)} />
        <Appbar.Action icon="plus" onPress={() => setModalVisible(!modalVisible)} />
        <Appbar.Action icon="undo" onPress={() => handleUndo()} />
        <Appbar.Action icon="restart" onPress={() => handleClear()} />
        <Appbar.Action icon="brain" onPress={() => identify()} />
      </Appbar>
      </View>
      <View style={{height: "5%", marginTop: 12}}>
        <Text style={styles.compTitle}>Symphony No. 9</Text>
      </View>
      <View style={{height: "2%"}}>
        <Text style={styles.compSubTitle}>Ode to Joy</Text>
      </View>
      <View style={{height: "2%", marginRight: 30}}>
        <Text style={styles.composerNote}>Ludwig van Beethoven</Text>
      </View>
      <View style={{height: "2%", marginLeft: 55, marginTop: 10, flexDirection: 'row'}}>
        <Image source={require('./assets/symbols/Quarter-Note.png')} style={{height: 12.5, width: 5, marginRight: 4}} /><Text style={styles.compTempo}>= 144</Text>
      </View>
      <View style={{marginLeft: 30, marginRight: 30, backgroundColor: 'yellow'}}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <Text>Bottom Text</Text>
      </Modal>
      <ImageBackground 
        source={require('./assets/staves.png')}
        style={{ width: "auto"}}
      >
        <Canvas ref={canvasRef} style={styles.canvas}/>
        {
          Array(displayedDraggables).map(draggable => {
            return draggable
          })
        }
      </ImageBackground>
      </View>
    </View>
  );
};