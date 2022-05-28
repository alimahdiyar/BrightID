import React from 'react';
import {
  createStackNavigator,
  StackNavigationOptions,
} from '@react-navigation/stack';
import { useTranslation } from 'react-i18next';
import Eula from 'src/components/Onboarding/Eula';
import { fontSize } from 'src/theme/fonts';
import { BLACK } from 'src/theme/colors';

export const headerTitleStyle = {
  fontFamily: 'Poppins-Medium',
  fontSize: fontSize[20],
  color: BLACK,
};

export const headerOptions: StackNavigationOptions = {
  headerTitleStyle,
  headerTintColor: BLACK,
  headerTitleAlign: 'left',
  headerBackTitleVisible: false,
};

const Stack = createStackNavigator();

const EulaStack = () => {
  const { t } = useTranslation();
  return (
    <Stack.Navigator screenOptions={headerOptions}>
      <Stack.Screen
        name="LicenseAgreement"
        component={Eula}
        options={{
          title: t('eula.header.title'),
          headerTitleAlign: 'center',
        }}
      />
    </Stack.Navigator>
  );
};

export default EulaStack;
