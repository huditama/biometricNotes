import {
  FC,
  ReactNode,
  createContext,
  useState,
  useMemo,
  Dispatch,
} from 'react';

const initialAppState: {
  authenticated: boolean;
  setAuthenticated: Dispatch<React.SetStateAction<boolean>>;
} = {
  authenticated: false,
  setAuthenticated: () => { },
};

export const RootContext = createContext(initialAppState);

type RootProviderProps = {
  children: ReactNode;
};

export const RootProvider: FC<RootProviderProps> = ({ children }) => {
  const [authenticated, setAuthenticated] = useState<boolean>(false);

  // Memoize the context value to prevent unnecessary re-renders
  const contextValue = useMemo(() => ({
    authenticated,
    setAuthenticated,
  }), [authenticated, setAuthenticated]);

  return (
    <RootContext.Provider value={contextValue}>
      {children}
    </RootContext.Provider>
  );
};
