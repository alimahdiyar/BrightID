import React, { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Linking,
  PermissionsAndroid,
  Platform,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import { useHeaderHeight } from '@react-navigation/stack';
import { useIsDrawerOpen } from '@react-navigation/drawer';
import { useTranslation } from 'react-i18next';
import Contacts from 'react-native-contacts';
import { DEVICE_IOS, DEVICE_LARGE } from '@/utils/deviceConstants';
import { DARKER_GREY, GREY, ORANGE, WHITE } from '@/theme/colors';
import { useSelector } from '@/store';
import socialMediaService from '@/api/socialMediaService';
import { BrightIdNetwork } from '@/components/Apps/model';
import {
  selectAllSocialMediaVariations,
  selectSocialMediaVariationById,
} from '@/reducer/socialMediaVariationSlice';
import { fontSize } from '@/theme/fonts';
import { SocialMediaVariationIds } from '@/components/EditProfile/socialMediaVariations';
import { extractDigits } from '@/utils/phoneUtils';
import { generateSocialProfileHashes } from '@/utils/socialUtils';
import { hashSocialProfile } from '@/utils/cryptoHelper';

const FlatListItemSeparator = () => {
  return (
    <View
      style={{
        height: StyleSheet.hairlineWidth,
        backgroundColor: GREY,
      }}
    />
  );
};

type FriendProfile = {
  profile: string;
  profileHash: string;
  name: string;
  variation: SocialMediaVariation;
};

function removeDuplicates(friendProfiles: FriendProfile[]) {
  const uniques: FriendProfile[] = [];
  friendProfiles.forEach((friendProfile) => {
    if (
      !uniques.find(
        (item) =>
          item.profile === friendProfile.profile &&
          item.variation.id === friendProfile.variation.id,
      )
    ) {
      uniques.push(friendProfile);
    }
  });
  return uniques;
}

export const FindFriendsScreen = function () {
  const { t } = useTranslation();

  let headerHeight = useHeaderHeight();
  if (DEVICE_IOS && DEVICE_LARGE) {
    headerHeight += 7;
  }
  const isDrawerOpen = useIsDrawerOpen();

  const emailSocialMediaVariation = useSelector((state) =>
    selectSocialMediaVariationById(state, SocialMediaVariationIds.EMAIL),
  );
  const phoneNumberSocialMediaVariation = useSelector((state) =>
    selectSocialMediaVariationById(state, SocialMediaVariationIds.PHONE_NUMBER),
  );

  const [friends, setFriends] = useState<FriendProfile[]>(null);

  const fetchFriends = useCallback(async () => {
    let _friendProfiles: FriendProfile[] = [];
    const permissionStatus = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
      {
        title: 'Contacts',
        message: 'This app would like to view your contacts.',
        buttonPositive: 'Please accept bare mortal',
        buttonNegative: 'No, thanks',
      },
    );
    if (permissionStatus === 'granted') {
      const contacts = await Contacts.getAll();
      contacts.forEach((contact) => {
        const contactName = contact.displayName;
        contact.emailAddresses.forEach((emailAddress) => {
          const _profile = emailAddress.email;
          _friendProfiles.push({
            name: contactName,
            profile: _profile,
            profileHash: hashSocialProfile(_profile),
            variation: emailSocialMediaVariation,
          });
        });
        contact.phoneNumbers.forEach((phoneNumber) => {
          const _profile = extractDigits(phoneNumber.number);
          _friendProfiles.push({
            name: contactName,
            profile: _profile,
            profileHash: hashSocialProfile(_profile),
            variation: phoneNumberSocialMediaVariation,
          });
        });
      });
    }
    _friendProfiles = removeDuplicates(_friendProfiles);
    const _profileHashes = _friendProfiles.map(
      (friendProfile) => friendProfile.profileHash,
    );
    const _filteredProfileHashes = await socialMediaService.querySocialMedia({
      profileHashes: _profileHashes,
      network: __DEV__ ? BrightIdNetwork.TEST : BrightIdNetwork.NODE,
    });
    setFriends(
      _friendProfiles.filter((friendProfile) =>
        _filteredProfileHashes.includes(friendProfile.profileHash),
      ),
    );
  }, [emailSocialMediaVariation, phoneNumberSocialMediaVariation]);

  useEffect(() => {
    fetchFriends().catch(console.error);
  }, [fetchFriends]);

  function sendInvitation(item: FriendProfile) {
    const subject = "Let's connect on BrightID";
    // TODO: generate connection link
    const connectionLink = 'https://app.brightid.org/connection-code/xxx';
    const body = `Hi\nLet's connect on BrightID!\n${connectionLink}`;
    if (item.variation.id === SocialMediaVariationIds.PHONE_NUMBER) {
      const smsDivider = Platform.OS === 'ios' ? '&' : '?';
      const phone = item.profile;
      Linking.openURL(`sms:${phone}${smsDivider}body=${body}`);
      return;
    }
    if (item.variation.id === SocialMediaVariationIds.EMAIL) {
      const email = item.profile;
      Linking.openURL(`mailto:${email}?subject=${subject}&body=${body}`);
      return;
    }
    const invitationNotAvailableText = t(
      'findFriends.text.invitationNotAvailable',
    );
    if (Platform.OS === 'android') {
      ToastAndroid.show(invitationNotAvailableText, ToastAndroid.LONG);
    } else {
      Alert.alert(invitationNotAvailableText);
    }
  }

  const keyExtractor = (item, idx) => {
    return item?.recordID?.toString() || idx.toString();
  };

  const renderItem = ({ item }: { item: FriendProfile }) => {
    return (
      <View style={styles.contactCon}>
        <View style={styles.imgCon}>
          <View style={styles.placeholder}>
            <Text style={styles.txt}>{item.name ? item.name[0] : ''}</Text>
          </View>
        </View>
        <View style={styles.contactDat}>
          <Text style={styles.name} numberOfLines={1}>
            {item.name}
          </Text>
          <Text style={styles.profile} numberOfLines={1}>
            {item.variation.name}
          </Text>
          <Text style={styles.profile} numberOfLines={1}>
            {item.profile}
          </Text>
        </View>
        <View style={styles.contactAction}>
          {/* <TouchableOpacity */}
          {/*  testID="InviteBtn" */}
          {/*  style={styles.inviteBtn} */}
          {/*  onPress={() => sendInvitation(item)} */}
          {/* > */}
          {/*  <Text style={styles.inviteBtnText}> */}
          {/*    {t('findFriends.button.invite')} */}
          {/*  </Text> */}
          {/* </TouchableOpacity> */}
        </View>
      </View>
    );
  };

  return (
    <View
      style={[
        styles.container,
        { marginTop: headerHeight },
        !isDrawerOpen && styles.shadow,
      ]}
      testID="tasksScreen"
    >
      {friends ? (
        <FlatList
          data={friends}
          contentContainerStyle={{ paddingBottom: 50, flexGrow: 1 }}
          keyExtractor={keyExtractor}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={FlatListItemSeparator}
          renderItem={renderItem}
        />
      ) : (
        <ActivityIndicator
          style={styles.loading}
          size="large"
          color={DARKER_GREY}
          animating
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  inviteBtn: {
    width: '100%',
    height: 40,
    borderRadius: 100,
    borderColor: ORANGE,
    borderWidth: 1,
    backgroundColor: WHITE,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inviteBtnText: {
    fontFamily: 'Poppins-Bold',
    fontSize: fontSize[16],
    color: ORANGE,
  },
  loading: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: WHITE,
    borderTopLeftRadius: DEVICE_LARGE ? 50 : 40,
    paddingLeft: 10,
    paddingRight: 18,
  },
  shadow: {
    shadowColor: 'rgba(196, 196, 196, 0.25)',
    shadowOpacity: 1,
    shadowRadius: 15,
    elevation: 15,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
  contactCon: {
    flex: 1,
    flexDirection: 'row',
    padding: 5,
    borderBottomWidth: 0.5,
    borderBottomColor: '#d9d9d9',
    paddingVertical: 24,
    paddingHorizontal: 18,
  },
  imgCon: {},
  placeholder: {
    width: 55,
    height: 55,
    borderRadius: 30,
    overflow: 'hidden',
    backgroundColor: '#d9d9d9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  contactDat: {
    flex: 3,
    justifyContent: 'center',
    paddingLeft: 10,
    paddingRight: 5,
  },
  contactAction: {
    flex: 1.4,
    justifyContent: 'center',
    paddingLeft: 5,
  },
  txt: {
    fontSize: 18,
  },
  name: {
    fontSize: 16,
  },
  profile: {
    color: '#888',
  },
});

export default FindFriendsScreen;
