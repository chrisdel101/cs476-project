import { ReactNode, createContext, useState } from 'react';
import Item from '../../../models/Item';
import crudFunctions from '../../../api/crudFunctions';
import { Notifications } from '../../../../constants';
import User from '../../../models/abstractClasses/User';
import Observer from '../../../models/Observer';


export interface Subject {
  attach: (observer: Observer) => void
  detach: (observer: Observer) => void
  notify: (observerID: string, notificationType: Notifications, user?: any) => void
  notifyAll: () => void
  isLoaded?: boolean
  observersArr: Observer[]
}


export const ItemsContext = createContext<Subject>(null!)

interface IProps {
  children: ReactNode
}
// handle storing all item Observers
// put into a context allows access in children
export function ProvideItems({ children }: IProps) {
  // stores all items from the DB
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  // stores list of resgistered observers
  const [observersArr, setObserversArr] = useState<Observer[]>([])
  
  const attach = (observer: Observer) => {
    // check if observer exists in list already
    const exists = observersArr.some((obs: Observer) => 
      obs.id === observer.id)
      // if not exists add to list; don't want dupes
    if(!exists) {
      const tempArr = [...observersArr, observer]
      setObserversArr(tempArr);
    }
  };

  const detach = (observer: Observer) => {
    const index = observersArr.indexOf(observer);
    if (index !== -1) {
      const observersArrCopy = [...observersArr];
      observersArrCopy.splice(index, 1)
      setObserversArr(observersArrCopy);
    }
  };
  // notify all observers - unused 
  // use this if more than one observer needs run at a time
  const notifyAll = () => {
    observersArr.forEach((observer) => {
        // TODO: update to make this work and remove the other one
    });
  };
  // notify a only a specific observer - to save memory
  // called only
  const notify = async (
    observerID: string, 
    notificationType: Notifications, 
    user?: User) => {
      // TODO: make it an object - no need for list
      // loop over observer in observers list
      const index = observersArr.findIndex(o => observerID === o.id)
      if (index !== -1) {
      const currentObserver = observersArr[index]
      // run operation based on notification type
      switch(notificationType) {
        // handles the index page items update
        case Notifications.GET_ITEMS: {
          try {            // fetch all items
            const fetchedItems = await crudFunctions.getItems();
            // pass an observer it's new list of items
            currentObserver.update(fetchedItems);
            setIsLoaded(true)

          } catch (error) {
            console.error('Error in Notifications.GET_ITEMS:', error);
          }
          break;
        }

        case Notifications.GET_ITEMS_BY_USER:
          // handles the accoint page items update per user
          if (user) {
            // fetch items by user
            try {
              const itemsByUser = await crudFunctions.getItemsByUser(user);
              // pass an observer it's new list of items
              currentObserver.update(itemsByUser);
              setIsLoaded(true)
            } catch (error) {
              console.error('Error in  Notifications.GET_ITEMS_BY_USER:', error);
            }
          }
          break;
       }
    }
  };

  return (
    <ItemsContext.Provider value={{ attach, detach, notify, notifyAll, isLoaded, observersArr}}>
    {children}
  </ItemsContext.Provider>
  );
}

