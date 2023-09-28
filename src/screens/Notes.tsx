import {
  View,
  StyleSheet,
  Text,
} from 'react-native';

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export const Notes = () => (
  <View style={Styles.container}>
    <Text>Notes</Text>
  </View>
);
