import { StyleSheet } from 'react-native';

export const composition = StyleSheet.create({
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