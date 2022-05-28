import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { connection_levels } from 'src/utils/constants';
import { DEVICE_LARGE } from 'src/utils/deviceConstants';
import { DARKER_GREY } from 'src/theme/colors';
import { fontSize } from 'src/theme/fonts';
import {
  connectionLevelColors,
  connectionLevelStrings,
} from 'src/utils/connectionLevelStrings';
import { RatingButton } from './RatingButton';

type RatingViewProps = {
  setLevelHandler: (level: ConnectionLevel) => any;
  abuseHandler: () => any;
};

export const RatingView = ({
  setLevelHandler,
  abuseHandler,
}: RatingViewProps) => {
  const { t } = useTranslation();
  return (
    <View style={styles.container}>
      <Text style={styles.ratingHeader}>
        {t('pendingConnections.label.rating')}
      </Text>
      <View style={styles.buttonsContainer}>
        <RatingButton
          color={connectionLevelColors[connection_levels.SUSPICIOUS]}
          label={connectionLevelStrings[connection_levels.SUSPICIOUS]}
          handleClick={() => abuseHandler()}
          testID={`${connection_levels.SUSPICIOUS}Btn`}
        />
        <RatingButton
          color={connectionLevelColors[connection_levels.JUST_MET]}
          label={connectionLevelStrings[connection_levels.JUST_MET]}
          handleClick={() => setLevelHandler(connection_levels.JUST_MET)}
          testID={`${connection_levels.JUST_MET}Btn`}
        />
        <RatingButton
          color={connectionLevelColors[connection_levels.ALREADY_KNOWN]}
          label={connectionLevelStrings[connection_levels.ALREADY_KNOWN]}
          handleClick={() => setLevelHandler(connection_levels.ALREADY_KNOWN)}
          testID={`${connection_levels.ALREADY_KNOWN}Btn`}
        />
      </View>
      <Text style={styles.ratingFooter}>
        {t('pendingConnections.text.rating')}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  buttonsContainer: {
    width: '100%',
    flexGrow: 1,
    maxHeight: DEVICE_LARGE ? 225 : 210,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  ratingHeader: {
    fontFamily: 'Poppins-Bold',
    textAlign: 'center',
    fontSize: fontSize[16],
    marginBottom: DEVICE_LARGE ? 5 : 4,
  },
  ratingFooter: {
    paddingTop: DEVICE_LARGE ? 8 : 7,
    fontFamily: 'Poppins-Regular',
    textAlign: 'center',
    fontSize: fontSize[12],
    color: DARKER_GREY,
  },
});
