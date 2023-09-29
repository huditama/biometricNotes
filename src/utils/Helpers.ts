import 'react-native-get-random-values';
import CryptoJS from 'crypto-js';
import { v4 as uuidv4 } from 'uuid';
import SensitiveInfo from 'react-native-sensitive-info';
import ReactNativeBiometrics from 'react-native-biometrics';

import { Note } from '../types/Notes';
import { Constants } from './Constants';

const Biometrics = new ReactNativeBiometrics({ allowDeviceCredentials: true });

export const generateEncryptionKey = () => {
  const randomBytes = CryptoJS.lib.WordArray.random(32);
  return randomBytes.toString(CryptoJS.enc.Hex);
};

export const encryptNotes = (notes: Note[], key: string) => {
  const stringifyNotes = JSON.stringify(notes);
  const encryptedNotes = CryptoJS.AES.encrypt(stringifyNotes, key).toString();
  return encryptedNotes;
};

export const decryptNotes = (encryptedNotes: string, key: string): Note[] => {
  const bytes = CryptoJS.AES.decrypt(encryptedNotes, key);
  const decryptedNotes = bytes.toString(CryptoJS.enc.Utf8);
  return JSON.parse(decryptedNotes);
};

export const retrieveNotes = async () => {
  try {
    const notes = await SensitiveInfo.getItem(Constants.Notes, {});
    return notes;
  } catch (error) {
    // Error
    return null;
  }
};

export const storeNotes = async (encryptedNotes: string) => {
  try {
    await SensitiveInfo.setItem(Constants.Notes, encryptedNotes, {});
  } catch (error) {
    // Error
  }
};

export const storeEncryptionKey = async (key: string) => {
  try {
    await SensitiveInfo.setItem(Constants.Encryption_Key, key, {});
  } catch (error) {
    // Error
  }
};

export const retrieveEncryptionKey = async () => {
  try {
    const key = await SensitiveInfo.getItem(Constants.Encryption_Key, {});
    return key;
  } catch (error) {
    // Error
    return null;
  }
};

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

export const formatDate = (date: Date) => {
  const dateFormat = new Date(date);

  const day = dateFormat.getDate().toString().padStart(2, '0');
  const month = (dateFormat.getMonth() + 1).toString().padStart(2, '0');
  const year = dateFormat.getFullYear().toString().slice(-2);

  const formattedDate = `${day}/${month}/${year}`;
  return formattedDate;
};

export const generateUUID = () => uuidv4();
