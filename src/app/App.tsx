import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import { Colors } from '../themes/Colors';
import { RootNavigator } from '../navigation/RootNavigator';
import { RootProvider } from '../context/RootContext';

const Styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
});

const App = () => (
  <NavigationContainer>
    <StatusBar backgroundColor={Colors.WHITE} barStyle="dark-content" />
    <SafeAreaView style={Styles.safeAreaView}>
      <RootProvider>
        <RootNavigator />
      </RootProvider>
    </SafeAreaView>
  </NavigationContainer>
);

export default App;
