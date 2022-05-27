import { BLACK } from 'src/theme/colors';
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { BlurViewProperties } from "@react-native-community/blur";

const BlurWidget = (props: BlurViewProperties) => {
  return <View style={[props.style, styles.blur]} />;
}

export default BlurWidget

const styles = StyleSheet.create({
  blur: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backdropFilter: 'blur(5px)',
    backgroundColor: BLACK
  }
})
