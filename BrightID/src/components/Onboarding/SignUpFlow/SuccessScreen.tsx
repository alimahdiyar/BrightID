import React, { useCallback, useEffect, useState } from 'react';
import {
  Image,
  InteractionManager,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'src/store';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { fontSize } from 'src/theme/fonts';
import { WHITE, ORANGE } from 'src/theme/colors';
import { DEVICE_LARGE } from 'src/utils/deviceConstants';
import { backupAppData } from 'src/components/Onboarding/RecoveryFlow/thunks/backupThunks';
import { setBackupCompleted } from 'src/reducer/userSlice';
import DetoxEnabled from 'src/utils/Detox';
import { saveId } from './thunks';
import Congratulations from '../../Icons/Congratulations';
/* Onboarding Success Screen */

/* ======================================== */

const TIMEOUT = 1500;

export const SuccessScreen = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const password = useSelector((state: State) => state.user.password);

  // this is used instead of a timeout
  const [currentTime, setCurrentTime] = useState(null);
  const [endTime, setEndTime] = useState(null);

  /**
   * update the time until
   */
  useFocusEffect(
    useCallback(() => {
      const intervalID = setInterval(() => {
        setCurrentTime(Date.now());
      }, 300);
      return () => {
        clearInterval(intervalID);
      };
    }, []),
  );

  useEffect(() => {
    if (endTime && currentTime && currentTime >= endTime) {
      // this  will cause navigation to HomeScreen
      dispatch(saveId());
      if (password) {
        console.log(`Starting initial backup`);
        dispatch(backupAppData()).then(() => {
          dispatch(setBackupCompleted(true));
        });
      }
      return () => {
        // navigate to view password walkthrough
        if (!DetoxEnabled) {
          InteractionManager.runAfterInteractions(() => {
            navigation.navigate('ViewPasswordWalkthrough');
          });
        }
      };
    }
  }, [currentTime, endTime, dispatch, navigation, password]);

  useFocusEffect(
    useCallback(() => {
      // wait 1.5 seconds before navigating to home page
      setEndTime(Date.now() + TIMEOUT);
    }, []),
  );
  return (
    <>
      <SafeAreaView style={styles.container}>
        <StatusBar
          barStyle="dark-content"
          backgroundColor={WHITE}
          animated={true}
        />

        <View style={styles.header}>
          <Image
            source={require('src/static/brightid-final.png')}
            accessible={true}
            accessibilityLabel="Home Header Logo"
            resizeMode="contain"
            style={styles.logo}
          />
        </View>
        <View style={styles.center}>
          <View style={styles.imageContainer}>
            <View style={styles.phoneContainer}>
              <Image
                source={require('src/static/brightid-phone.png')}
                accessible={true}
                accessibilityLabel="Home Header Logo"
                resizeMode="contain"
                style={styles.phone}
              />
            </View>
            <Congratulations width={190} height={230} />
          </View>
        </View>
        <Text style={styles.registerText}>
          {t('onboarding.text.congratulations')}
        </Text>
      </SafeAreaView>
      <View style={styles.orangeBottom} />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE,
    alignItems: 'center',
    flexDirection: 'column',
    borderBottomLeftRadius: 58,
    borderBottomRightRadius: 58,
    marginBottom: DEVICE_LARGE ? 35 : 20,
    zIndex: 2,
    overflow: 'hidden',
  },
  orangeBottom: {
    backgroundColor: ORANGE,
    width: '100%',
    height: 100,
    zIndex: 1,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  header: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '15%',
  },
  logo: {
    maxWidth: '40%',
    maxHeight: 90,
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer: {
    width: 190,
    height: 230,
  },
  phoneContainer: {
    position: 'absolute',
    top: 25,
    left: 25,
  },
  phone: {
    width: 140,
    height: 180,
  },
  registerText: {
    fontFamily: 'Poppins-Medium',
    fontSize: fontSize[16],
    textAlign: 'center',
    lineHeight: DEVICE_LARGE ? 26 : 24,
    marginBottom: DEVICE_LARGE ? 50 : 45,
  },
});

export default SuccessScreen;
