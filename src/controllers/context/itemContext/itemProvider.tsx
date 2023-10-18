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
  notify: (observer: Observer) => void
  notifyAll: () => void
}


export const ItemsContext = createContext<Subject>(null!)

// hooks for keeping items up to date
const useItemsProvider = () => {
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

export function ProvideItems({ children }: IProps) {
  const {items, setItems} = useItemsProvider();
  // console.log('items ', items)
  const [observersArr, setObserversArr] = useState<Observer[]>([])
  // console.log('observers log ', observersArr)


  const attach = (observer: Observer) => {
    // console.log('attach', observersArr)
    // check if observer exists in list already
    const exists = observersArr.some((obs: Observer) => 
      obs.id === observer.id)
      console.log('exists ', exists)
    if(!exists) {
      console.log('ADD')
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
      observer.update(items);
    });
  };
  // notify a speficit observer
  const notify = (observer: Observer) => {
    // const o = observersArr.filter((obs) => {
    //   console.log('obs.id ', obs.id)
    //   if(obs.id === observer.id) {
    //     return obs
    //   }
    // })
    // console.log('o ', o)
    const index = observersArr.findIndex(o => observer.id === o.id)
    console.log('inde ', index)
    if (index !== -1) {
      const currentObserver = observersArr[index]
      // pass an observer it's new list of items

      currentObserver.update(items)
    }
  };

  return (
    <ItemsContext.Provider value={{ attach, detach, notify, notifyAll }}>
    {children}
  </ItemsContext.Provider>
  );
}

