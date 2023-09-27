import { useContext } from 'react';
import { AuthContext } from './userProvider';

export default function useUserContext() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useUserContext must be used within a UserProvider');
  }
  return context;
}
