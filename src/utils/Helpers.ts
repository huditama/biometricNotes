import ReactNativeBiometrics from 'react-native-biometrics';

const Biometrics = new ReactNativeBiometrics({ allowDeviceCredentials: true });

export const checkBiometricsAvailability = async () => {
  try {
    const result = await Biometrics.isSensorAvailable();
    return result.available;
  } catch (error) {
    return false;
  }
};

export const promptAuthentication = async () => {
  try {
    const result = await Biometrics.simplePrompt({ promptMessage: 'Access your notes' });
    return result.success;
  } catch (error) {
    return false;
  }
};
