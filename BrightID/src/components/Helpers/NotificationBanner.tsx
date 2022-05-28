import React, { useEffect, useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import DropdownAlert from 'react-native-dropdownalert';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'src/store';
import { navigate, getRoute } from 'src/NavigationService';
import AddGroup from 'src/components/Icons/AddGroup';
import AddPerson from 'src/components/Icons/AddPerson';
import Certificate from 'src/components/Icons/Certificate';
import PhoneLock from 'src/components/Icons/PhoneLock';
import { setActiveNotification } from 'src/actions';
import { CONNECTIONS_TYPE } from 'src/utils/constants';
import { DEVICE_LARGE, HEIGHT } from 'src/utils/deviceConstants';
import { LIGHT_GREEN, BLACK } from 'src/theme/colors';
import { fontSize } from 'src/theme/fonts';
import { selectAllUnconfirmedConnections } from 'src/components/PendingConnections/pendingConnectionSlice';
import { DetoxEnabled } from 'src/utils/Detox';

/* notification types:
@type groups
@type connections
@type misc
*/
// default icons
const Icons = {
  AddGroup,
  AddPerson,
  PhoneLock,
  Certificate,
};

const NOTIFICATION_TIMEOUT = 10000;

const screenBlackList = [
  'ScanCode',
  'PendingConnections',
  'MyCode',
  'GroupConnection',
];

export const NotificationBanner = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  // const route = useRoute();
  const dropDownAlertRef = useRef(null);
  const activeNotification = useSelector(
    (state: State) => state.notifications.activeNotification,
  );

  const pendingConnections = useSelector(selectAllUnconfirmedConnections);

  useEffect(() => {
    if (!activeNotification) {
      return;
    }

    const route = getRoute();

    dropDownAlertRef.current?.closeAction('cancel');

    if (!screenBlackList.includes(route?.name)) {
      if (!DetoxEnabled) {
        dropDownAlertRef.current?.alertWithType(
          'custom',
          activeNotification?.title,
          activeNotification?.message,
        );
      }
    }
  }, [activeNotification, dispatch]);

  useEffect(() => {
    // always close the banner first
    // dropDownAlertRef.current?.closeAction('automatic');

    if (pendingConnections.length) {
      dispatch(
        setActiveNotification({
          type: CONNECTIONS_TYPE,
          title: t('notificationBar.title.pendingConnection'),
          message: t('notificationBar.text.pendingConnections', {
            count: pendingConnections.length,
          }),
          navigationTarget: 'PendingConnections',
          icon: 'AddPerson',
        }),
      );
    }
  }, [pendingConnections.length, dispatch, t]);

  // icon fallback: activeNotification prop 'icon' -> default icon for notification type -> default 'Certificate'
  const Icon = Icons[activeNotification?.icon || 'Certificate'];

  const _onTap = () => {
    console.log('onTap', activeNotification);
    if (activeNotification?.navigationTarget) {
      navigate(activeNotification.navigationTarget);
    }
  };

  const _onClose = () => {
    console.log('onClose, setting null');
    dispatch(setActiveNotification(null));
  };

  return (
    <DropdownAlert
      ref={dropDownAlertRef}
      closeInterval={NOTIFICATION_TIMEOUT}
      containerStyle={styles.container}
      contentContainerStyle={{
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      titleStyle={styles.title}
      messageStyle={styles.message}
      updateStatusBar={true}
      activeStatusBarBackgroundColor={LIGHT_GREEN}
      activeStatusBarStyle="dark-content"
      testID="notificationBanner"
      elevation={10}
      zIndex={100}
      onTap={_onTap}
      onClose={_onClose}
      renderImage={() => (
        <View style={styles.icon}>
          <Icon
            width={DEVICE_LARGE ? 24 : 20}
            height={DEVICE_LARGE ? 24 : 20}
          />
        </View>
      )}
      panResponderEnabled={false}
      tapToCloseEnabled={true}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: LIGHT_GREEN,
    height: HEIGHT * 0.15,
  },
  title: {
    fontFamily: 'Poppins-Medium',
    marginLeft: DEVICE_LARGE ? 20 : 10,
    color: BLACK,
    fontSize: fontSize[16],
  },
  message: {
    fontFamily: 'Poppins-Medium',
    marginLeft: DEVICE_LARGE ? 20 : 10,
    color: BLACK,
    fontSize: fontSize[13],
  },
  icon: {
    marginLeft: DEVICE_LARGE ? 20 : 10,
  },
});

export default NotificationBanner;
