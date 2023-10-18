import { ReactNode, createContext, useEffect, useState } from 'react';
import Item from '../../../models/Item';
import crudFunctions from '../../../api/crudFunctions';
import { Notifications } from '../../../../constants';
import User from '../../../models/abstractClasses/User';


export interface Observer {
  update: (items: Item[]) => void
  id: string
}

export interface Subject {
  attach: (observer: Observer) => void
  detach: (observer: Observer) => void
  notify: (observerID: string, notificationType: Notifications, user?: any) => void
  notifyAll: () => void
  isLoaded?: boolean
  observersArr: Observer[]
}


export const ItemsContext = createContext<Subject>(null!)

// // hooks for keeping items up to date
// const useFetchItems = () => {
//     const [items, setItems] = useState<Item[]>([])
//     useEffect(() => { 
//         try {
//           (async () => {
//             const fetchedItems = await crudFunctions.getItems()
//             setItems(fetchedItems)
//           })()
//         } catch (error) {
//           console.error('Error:', error)
//         }
//       }, [])
//     // fetch items from db
//     return {items, setItems}
// }

interface IProps {
  children: ReactNode
}

// handle storing all item Observers
// put into a context allows access in children
export function ProvideItems({ children }: IProps) {
  // stores all items from the DB
  // const {items, setItems} = useFetchItems();
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  // stores list of resgistered observers
  const [observersArr, setObserversArr] = useState<Observer[]>([])
  // console.log('observers log ', observersArr)

  // useEffect(() => {
  //   // console.log('items in index', items)
  //   // build observers - this can be class
  //   if (items) {
  //     // loop over all observers onLoad
  //     initNotification(observersArr)
  //   }
  // },[items, observersArr])
  // // loads the initial items from the DB
  // const initNotification = async (observersArr: Observer[]) => {
  //   observersArr.forEach((observer) => {
  //     // pass them inital items for paint
  //     observer.update(items);
  //   });
  //   setIsLoaded(true)
  // }
  const attach = (observer: Observer) => {
    // check if observer exists in list already
    const exists = observersArr.some((obs: Observer) => 
      obs.id === observer.id)
      // if not exists add to list; don't want dupes
    if(!exists) {
      console.log('attaching')
      const tempArr = [...observersArr, observer]
      console.log('tempArr ', tempArr)
      setObserversArr(tempArr);
      console.log('after add ', observersArr)
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
  // notify all observers
  const notifyAll = () => {
    observersArr.forEach((observer) => {
      // pass each observer it's new list of items
      // observer.update(items); REDO if needed
    });
  };
  // notify a only a  specific observer - to save memory
  // called only
  const notify = async (observerID: string, notificationType: Notifications, user?: User) => {
    const index = observersArr.findIndex(o => observerID === o.id)
    console.log('calling  ', index)
    if (index !== -1) {
      console.log("HERE")
      const currentObserver = observersArr[index]

      switch(notificationType) {
        case Notifications.GET_ITEMS: {
          try {
            // fetch all items
            const fetchedItems = await crudFunctions.getItems();
            // console.log("HERE", fetchedItems)

            // pass an observer it's new list of items
            // setItems(fetchedItems);
            currentObserver.update(fetchedItems);
            setIsLoaded(true)

          } catch (error) {
            console.error('Error in Notifications.GET_ITEMS:', error);
          }
          break;
        }

        case Notifications.GET_ITEMS_BY_USER:
          console.log("HERE")
          if (user) {
            // fetch items by user
            try {
              const itemsByUser = await crudFunctions.getItemsByUser(user);
              // pass an observer it's new list of items
              // setItems(itemsByUser);
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

