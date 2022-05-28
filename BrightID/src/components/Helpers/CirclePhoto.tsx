import * as React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { DEVICE_LARGE } from 'src/utils/deviceConstants';
import { LIGHT_GREY } from 'src/theme/colors';

const CirclePhoto = ({ circlePhotos }) => {
  console.log(circlePhotos);
  return (
    <View style={styles.container}>
      <View style={styles.topPhotos}>
        {circlePhotos[0] && (
          <Image source={circlePhotos[0]} style={styles.photo} />
        )}
      </View>
      <View style={styles.bottomPhotos}>
        {circlePhotos[1] && (
          <Image source={circlePhotos[1]} style={styles.photo} />
        )}
        {circlePhotos[2] && (
          <Image source={circlePhotos[2]} style={styles.photo} />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  bigPhoto: {
    borderRadius: 30,
    width: 60,
    height: 60,
    backgroundColor: LIGHT_GREY,
  },
  photo: {
    borderRadius: 20,
    width: DEVICE_LARGE ? 40 : 32,
    height: DEVICE_LARGE ? 40 : 32,
    backgroundColor: LIGHT_GREY,
  },
  topPhotos: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginBottom: -3.3,
  },
  bottomPhotos: {
    marginTop: -3.3,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
});

export default CirclePhoto;
