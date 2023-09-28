import {
  FC,
  ReactNode,
  createContext,
  useState,
  useMemo,
  Dispatch,
} from 'react';
import { Note } from '../types/Notes';

const initialAppState: {
  authenticated: boolean;
  setAuthenticated: Dispatch<React.SetStateAction<boolean>>;
  notes: Note[];
  setNotes: Dispatch<React.SetStateAction<Note[]>>;
} = {
  authenticated: false,
  setAuthenticated: () => { },
  notes: [],
  setNotes: () => { },
};

export const RootContext = createContext(initialAppState);

type RootProviderProps = {
  children: ReactNode;
};

export const RootProvider: FC<RootProviderProps> = ({ children }) => {
  const [authenticated, setAuthenticated] = useState<boolean>(false);
  const [notes, setNotes] = useState<Note[]>([]);

  // Memoize the context value to prevent unnecessary re-renders
  const contextValue = useMemo(() => ({
    authenticated,
    setAuthenticated,
    notes,
    setNotes,
  }), [authenticated, setAuthenticated, notes, setNotes]);

  return (
    <RootContext.Provider value={contextValue}>
      {children}
    </RootContext.Provider>
  );
};
