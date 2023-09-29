import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  Button,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import { useContext } from 'react';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { Colors } from '../themes/Colors';
import { Routes } from '../navigation/Routes';
import { formatDate } from '../utils/Helpers';
import { RootContext } from '../context/RootContext';

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
  contentContainer: {
    flexGrow: 1,
  },
  buttonContainer: {
    backgroundColor: Colors.WHITE,
    paddingVertical: 8,
  },
  noteTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.BLACK,
  },
  noteSnippet: {
    fontSize: 14,
    color: Colors.BLACK,
  },
  notesContainer: {
    marginTop: 16,
  },
});

const NoteCardStyles = (isLastIndex: boolean): ViewStyle => ({
  borderRadius: 8,
  backgroundColor: Colors.GAINSBORO,
  marginHorizontal: 16,
  paddingHorizontal: 16,
  paddingVertical: 10,
  justifyContent: 'center',
  marginBottom: isLastIndex ? 0 : 16,
});

export const Notes = () => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  const { notes } = useContext(RootContext);
  const sortedNotes = notes.sort(
    (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
  );

  const onPressAdd = async () => navigation.navigate(Routes.Editor);

  return (
    <>
      <ScrollView style={Styles.container} contentContainerStyle={Styles.contentContainer}>
        <View style={Styles.notesContainer}>
          {
            sortedNotes.map((note, index) => (
              // eslint-disable-next-line react/no-array-index-key
              <TouchableOpacity key={index} style={NoteCardStyles(index === notes.length)}>
                <Text style={Styles.noteTitle}>{note.title}</Text>
                <Text numberOfLines={1} ellipsizeMode="tail" style={Styles.noteSnippet}>{`${formatDate(note.updatedAt)} - ${note.note}`}</Text>
              </TouchableOpacity>
            ))
          }
        </View>
      </ScrollView>
      <View style={Styles.buttonContainer}>
        <Button title="Add new note" onPress={onPressAdd} />
      </View>
    </>
  );
};
