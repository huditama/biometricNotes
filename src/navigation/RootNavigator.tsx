import { useContext } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Routes } from './Routes';
import { Notes } from '../screens/Notes';
import { Editor } from '../screens/Editor';
import { Authenticate } from '../screens/Authenticate';
import { RootContext } from '../context/RootContext';

const Stack = createNativeStackNavigator();

export const RootNavigator = () => {
  const { authenticated } = useContext(RootContext);

  return (
    <Stack.Navigator>
      {
        authenticated ? (
          <>
            <Stack.Screen
              name={Routes.Notes}
              component={Notes}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name={Routes.Editor}
              component={Editor}
              options={{
                headerTitle: '',
                headerShadowVisible: false,
              }}
            />
          </>
        ) : (
          <Stack.Screen
            name={Routes.Authenticate}
            component={Authenticate}
            options={{ headerShown: false }}
          />
        )
      }
    </Stack.Navigator>
  );
};
