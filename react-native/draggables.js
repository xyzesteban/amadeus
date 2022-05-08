import Draggable from 'react-native-draggable';
import { Image } from 'react-native';


const draggables = {
    "Quarter-Note": <Draggable renderSize={200} x={140} y={640}>
      <Image source={require('./assets/symbols/Quarter-Note.png')} style={{width: 12, height: 35}} />
    </Draggable>,
    "G-Clef": <Draggable renderSize={200} x={140} y={640}>
      <Image source={require('./assets/symbols/G-Clef.png')} style={{width: 20, height: 55}} />
    </Draggable>,
    "Eight-Note": <Draggable renderSize={200} x={140} y={640}>
      <Image source={require('./assets/symbols/Eighth-Note.png')} style={{width: 18, height: 35}} />
    </Draggable>,
    "Quarter-Rest": <Draggable renderSize={200} x={140} y={640}>
      <Image source={require('./assets/symbols/Quarter-Rest.png')} style={{width: 18, height: 35}} />
    </Draggable>,
    "Half-Note": <Draggable renderSize={200} x={140} y={640}>
      <Image source={require('./assets/symbols/Half-Note.png')} style={{width: 12, height: 35}} />
    </Draggable>,
    "4-4-Time": <Draggable renderSize={200} x={140} y={640}>
      <Image source={require('./assets/symbols/4-4-Time.png')} style={{width: 18, height: 35}} />
    </Draggable>,
    "Barline": <Draggable renderSize={200} x={140} y={640}>
      <Image source={require('./assets/symbols/Barline.png')} style={{width: 18, height: 35}} />
    </Draggable>
}

export default draggables;