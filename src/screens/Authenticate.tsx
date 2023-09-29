import { useContext } from 'react';
import {
  View,
  StyleSheet,
  Button,
} from 'react-native';

// import SInfo from 'react-native-sensitive-info';
import {
  decryptNotes,
  storeEncryptionKey,
  promptAuthentication,
  generateEncryptionKey,
  retrieveEncryptionKey,
  checkBiometricsAvailability,
  retrieveNotes,
} from '../utils/Helpers';
import { RootContext } from '../context/RootContext';

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export const Authenticate = () => {
  // SInfo.deleteItem('Notes', {});
  const { setAuthenticated, setNotes } = useContext(RootContext);

  const fetchData = async () => {
    try {
      const key = await retrieveEncryptionKey();

      // If key is present, decrypt and set notes as state
      if (key) {
        const encryptedNotes = await retrieveNotes();
        if (encryptedNotes) {
          const decryptedNotes = decryptNotes(encryptedNotes, key);
          setNotes(decryptedNotes);
        }

        // If key is not available, generate new one
      } else {
        const generatedKey = generateEncryptionKey();
        await storeEncryptionKey(generatedKey);
        fetchData();
      }
    } catch (error) {
      // Error
    }
  };

  const authenticate = async () => {
    const biometricsAvailable = await checkBiometricsAvailability();

    if (biometricsAvailable) {
      const authenticated = await promptAuthentication();
      if (authenticated) {
        await fetchData();
        setAuthenticated(true);
      }
    } else {
      alert('Please enable biometric security measures in your device for a more secure experience!');
    }
  };

  return (
    <View style={Styles.container}>
      <Button title="Authenticate" onPress={authenticate} />
    </View>
  );
};
