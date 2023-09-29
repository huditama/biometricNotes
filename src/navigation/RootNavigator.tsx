import { useContext } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Routes } from './Routes';
import { Notes } from '../screens/Notes';
import { Note } from '../types/Notes';
import { Authenticate } from '../screens/Authenticate';
import { RootContext } from '../context/RootContext';
// eslint-disable-next-line import/no-cycle
import { Editor } from '../screens/Editor';

export type RootNavigatorParamList = {
  Authenticate: undefined;
  Notes: undefined;
  Editor: { noteData: Note } | undefined;
};

const Stack = createNativeStackNavigator<RootNavigatorParamList>();

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
