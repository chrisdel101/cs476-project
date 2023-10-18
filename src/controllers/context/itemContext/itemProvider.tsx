import { ReactNode, createContext, useEffect, useState } from 'react';
import Item from '../../../models/Item';
import crudFunctions from '../../../api/crudFunctions';


export interface Observer {
  update: (items: Item[]) => void
  id: string
}

export interface Subject {
  attach: (observer: Observer) => void
  detach: (observer: Observer) => void
  notify: (observeID: string) => void
  notifyAll: () => void
}


export const ItemsContext = createContext<Subject>(null!)

// hooks for keeping items up to date
const useFetchItems = () => {
    const [items, setItems] = useState<Item[]>([])
    useEffect(() => { 
        try {
          (async () => {
            const fetchedItems = await crudFunctions.getItems()
            setItems(fetchedItems)
          })()
        } catch (error) {
          console.error('Error:', error)
        }
      }, [])
    // fetch items from db
    return {items, setItems}
}

interface IProps {
  children: ReactNode
}

// handle storing all item Observers
// put into a context allows access in children
export function ProvideItems({ children }: IProps) {
  // stores all items from the DB
  const {items, setItems} = useFetchItems();
  // stores list of resgistered observers
  const [observersArr, setObserversArr] = useState<Observer[]>([])
  // console.log('observers log ', observersArr)

  useEffect(() => {
    // console.log('items in index', items)
    // build observers - this can be class
    if (items) {
      // loop over all observers onLoad
      observersArr.forEach((observer) => {
        // pass them inital items for paint
        observer.update(items);
      });
    }
  }, [])
  const attach = (observer: Observer) => {
    // check if observer exists in list already
    const exists = observersArr.some((obs: Observer) => 
      obs.id === observer.id)
      // if not exists add to list; don't want dupes
    if(!exists) {
      console.log('attaching')
      const tempArr = [...observersArr, observer]
      // console.log('tempArr ', tempArr)
      setObserversArr(tempArr);
      // console.log('after add ', observersArr)
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
      observer.update(items);
    });
  };
  // notify a specific observer - save memory since we don't need to notify all observers on other pages
  const notify = async (observerID: string) => {
    const index = observersArr.findIndex(o => observerID === o.id)
    console.log('calling  ', notify)
    if (index !== -1) {
      const currentObserver = observersArr[index]
      // fetch the items
      const items = await crudFunctions.getItems()
      // pass an observer it's new list of items
      setItems(items)
      currentObserver.update(items)
    }
  };

  return (
    <ItemsContext.Provider value={{ attach, detach, notify, notifyAll }}>
    {children}
  </ItemsContext.Provider>
  );
}

