import {
  View,
  StyleSheet,
  ScrollView,
  TextInput,
  Button,
  Keyboard,
} from 'react-native';
import { useContext, useState } from 'react';
import { useNavigation } from '@react-navigation/native';

import { Colors } from '../themes/Colors';
import { RootContext } from '../context/RootContext';
import {
  encryptNotes,
  retrieveEncryptionKey,
  storeNotes,
} from '../utils/Helpers';

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
  contentContainer: {
    flexGrow: 1,
  },
  titleContainer: {
    borderRadius: 8,
    backgroundColor: Colors.GAINSBORO,
    marginHorizontal: 16,
    paddingHorizontal: 16,
    paddingVertical: 10,
    justifyContent: 'center',
    marginBottom: 16,
    marginTop: 8,
  },
  notesContainer: {
    flexGrow: 1,
    borderRadius: 8,
    backgroundColor: Colors.GAINSBORO,
    marginHorizontal: 16,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  buttonContainer: {
    backgroundColor: Colors.WHITE,
    paddingVertical: 8,
  },
});

export const Editor = () => {
  const navigation = useNavigation();
  const { notes, setNotes } = useContext(RootContext);

  const [title, setTitle] = useState('');
  const [note, setNote] = useState('');

  const renderDoneButton = () => <Button title="Done" onPress={() => Keyboard.dismiss()} />;

  const setHeaderButton = (type: 'blur' | 'focus') => () => {
    let headerRight = null;

    if (type === 'focus') {
      headerRight = () => renderDoneButton();
    }

    navigation.setOptions({
      headerRight,
    });
  };

  const onPressSave = async () => {
    try {
      const newNote = {
        title,
        note,
        updatedAt: new Date(),
      };

      const modifiedNotes = [
        ...notes,
        newNote,
      ];

      const key = await retrieveEncryptionKey();

      if (key) {
        const encryptedModifiedNotes = encryptNotes(modifiedNotes, key);
        await storeNotes(encryptedModifiedNotes);

        setNotes(modifiedNotes);
        navigation.goBack();
      }
    } catch (error) {
      // Error
    }
  };

  return (
    <>
      <ScrollView contentContainerStyle={Styles.contentContainer} style={Styles.container}>
        <View style={Styles.titleContainer}>
          <TextInput
            onBlur={setHeaderButton('blur')}
            onFocus={setHeaderButton('focus')}
            placeholder="Title"
            onChange={(e) => setTitle(e.nativeEvent.text)}
          />
        </View>

        <View style={Styles.notesContainer}>
          <TextInput
            onBlur={setHeaderButton('blur')}
            onFocus={setHeaderButton('focus')}
            placeholder="Add your text.."
            onChange={(e) => setNote(e.nativeEvent.text)}
            multiline
          />
        </View>
      </ScrollView>
      <View style={Styles.buttonContainer}>
        <Button title="Save" onPress={onPressSave} disabled={!title || !note} />
      </View>
    </>
  );
};
