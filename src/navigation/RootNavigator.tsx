import { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Home } from '../screens/Home';
import { Routes } from './Routes';
import { checkBiometricsAvailability, promptAuthentication } from '../utils/Helpers';

const Stack = createNativeStackNavigator();

export const RootNavigator = () => {
  const [authenticated, setAuthenticated] = useState(false);

  const checkBiometrics = async () => {
    const result = await checkBiometricsAvailability();

    if (result) {
      const promptResult = await promptAuthentication();

      if (promptResult) {
        setAuthenticated(true);
      }
    }
  };

  useEffect(() => {
    if (!authenticated) {
      checkBiometrics();
    }
  }, [authenticated]);

  return (
    <Stack.Navigator>
      <Stack.Screen
        name={Routes.Home}
        component={Home}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};
