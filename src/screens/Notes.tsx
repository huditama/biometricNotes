import {
  View,
  StyleSheet,
  Text,
} from 'react-native';
import { useContext } from 'react';
import { RootContext } from '../context/RootContext';

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export const Notes = () => {
  const { notes } = useContext(RootContext);

  return (
    <View style={Styles.container}>
      <Text>Below are the notes:</Text>
      <Text>{JSON.stringify(notes, null, 2)}</Text>
    </View>
  );
};
