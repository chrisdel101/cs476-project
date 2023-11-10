import Item from '../../models/Item'
import crudFunctions from '../../api/crudFunctions'
import { SetStateAction } from 'react'

interface FProps {
  items: Item[]
  setShowRedBell: (value: SetStateAction<boolean>) => void
  setShowWhiteBell: (value: SetStateAction<boolean>) => void
  setToolTipText: (input: SetStateAction<string |undefined>) => void
}

// when the red alert icon has been clicked, change item's state back to false and hide the alert icon
export const handleHideIcon = ({
  items,
  setShowRedBell,
  setShowWhiteBell,
  setToolTipText
}: FProps) => {
  // loop over items and check if the item state is changed to true
  for (let i = 0; i < items.length; i++) {
    if (items[i]?.changed === true) {
      items[i].setChanged = false // set item changed status back to false
      crudFunctions.updateEntireItem(items[i]) // update item in db
      setToolTipText(undefined)
    }
  }
  // hide the red bell and show the white bell
  setShowRedBell(false)
  setShowWhiteBell(true)
}

// when the page loads, change item's state back to false and hide the alert icon
export const handleShowIcon = ({
  items,
  setShowRedBell,
  setShowWhiteBell,
  setToolTipText
}: FProps) => {
  // loop over items and check if the item state is changed to true
  for (let i = 0; i < items.length; i++) {
    if (items[i]?.changed === true) {
        setToolTipText("You have item uddates. Check your account screen.")
      // if true, show the red bell and hide the white bell
      setShowRedBell(true)
      setShowWhiteBell(false)
      return
    }
  }
}
