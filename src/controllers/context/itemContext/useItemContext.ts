import { useContext } from 'react';
import { ItemsContext } from './itemProvider';

// contains the Subject interface
export default function useItemContext() {
  const context = useContext(ItemsContext);
  if (!context) {
    throw new Error('itemsContext must be used within a ItemsProvider');
  }
  return context;
}
