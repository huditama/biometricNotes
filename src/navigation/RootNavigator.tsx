import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Routes } from './Routes';
import { Home } from '../screens/Home';

const Stack = createNativeStackNavigator();

export const RootNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      name={Routes.Home}
      component={Home}
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
);
