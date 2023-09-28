import { useContext } from 'react';
import {
  View,
  StyleSheet,
  Button,
} from 'react-native';

import { RootContext } from '../context/RootContext';
import { checkBiometricsAvailability, promptAuthentication } from '../utils/Helpers';

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export const Authenticate = () => {
  const { setAuthenticated } = useContext(RootContext);

  const checkBiometrics = async () => {
    const result = await checkBiometricsAvailability();

    if (result) {
      const promptResult = await promptAuthentication();

      if (promptResult) {
        setAuthenticated(true);
      }
    }
  };

  return (
    <View style={Styles.container}>
      <Button title="Authenticate" onPress={checkBiometrics} />
    </View>
  );
};
