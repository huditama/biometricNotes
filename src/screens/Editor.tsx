import {
  View,
  StyleSheet,
  ScrollView,
  TextInput,
  Button,
  Keyboard,
} from 'react-native';
import {
  FC,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import {
  encryptNotes,
  generateUUID,
  retrieveEncryptionKey,
  storeNotes,
} from '../utils/Helpers';
import { Note } from '../types/Notes';
import { Colors } from '../themes/Colors';
import { RootContext } from '../context/RootContext';
// eslint-disable-next-line import/no-cycle
import { RootNavigatorParamList } from '../navigation/RootNavigator';

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
  textInput: {
    color: Colors.BLACK,
  },
});

interface EditorProps extends NativeStackScreenProps<RootNavigatorParamList, 'Editor'> { }

export const Editor: FC<EditorProps> = ({ route }) => {
  const navigation = useNavigation();

  const { notes, setNotes } = useContext(RootContext);
  const noteFromParams = route.params?.noteData;

  const [title, setTitle] = useState('');
  const [note, setNote] = useState('');

  // eslint-disable-next-line max-len
  const isValid = (title && note && (title !== noteFromParams?.title || note !== noteFromParams?.note));

  useEffect(() => {
    if (noteFromParams) {
      setTitle(noteFromParams.title);
      setNote(noteFromParams.note);
    }
  }, [noteFromParams]);

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

  const addNewNoteToData = () => {
    const newNote = {
      id: generateUUID(),
      title,
      note,
      updatedAt: new Date(),
    };

    const modifiedNotes = [
      ...notes,
      newNote,
    ];

    return modifiedNotes;
  };

  const updateNoteById = (
    id: string,
    updatedNote: Partial<Note>,
  ): Note[] => notes.map((noteData) => {
    if (noteData.id === id) {
      return {
        ...noteData,
        ...updatedNote,
        updatedAt: new Date(),
      };
    }

    return noteData;
  });

  const onPressSave = async () => {
    try {
      const newNotesData = noteFromParams
        ? updateNoteById(noteFromParams.id, { title, note })
        : addNewNoteToData();

      const key = await retrieveEncryptionKey();

      if (key) {
        const encryptedModifiedNotes = encryptNotes(newNotesData, key);
        await storeNotes(encryptedModifiedNotes);

        setNotes(newNotesData);
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
            value={title}
            style={Styles.textInput}
            placeholderTextColor={Colors.VERY_LIGHT_GREY}
            onBlur={setHeaderButton('blur')}
            onFocus={setHeaderButton('focus')}
            placeholder="Title"
            onChange={(e) => setTitle(e.nativeEvent.text)}
          />
        </View>

        <View style={Styles.notesContainer}>
          <TextInput
            value={note}
            style={Styles.textInput}
            placeholderTextColor={Colors.VERY_LIGHT_GREY}
            onBlur={setHeaderButton('blur')}
            onFocus={setHeaderButton('focus')}
            placeholder="Add your text.."
            onChange={(e) => setNote(e.nativeEvent.text)}
            multiline
          />
        </View>
      </ScrollView>
      <View style={Styles.buttonContainer}>
        <Button title="Save" onPress={onPressSave} disabled={!isValid} />
      </View>
    </>
  );
};
