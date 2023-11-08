import Item from "../../models/Item"
import crudFunctions from "../../api/crudFunctions"

// when the red alert icon has been clicked, change item's state back to false and hide the alert icon
export const handleHideIcon = (items: Item[], setShowRedBell: any, setShowWhiteBell: any, testFunction: any) => {
    
    // loop over items and check if the item state is changed to true
    for(let i = 0; i < items.length; i++){
        if (items[i]?.changed === true) {
            items[i].setChanged = false                 // set item changed status back to false
            crudFunctions.updateEntireItem(items[i])    // update item in db
            //testFunction("item updated: hideIcon")
        }
        //testFunction("item checked: hideIcon")
    }
    
    // hide the red bell and show the white bell
    setShowRedBell(false)
    setShowWhiteBell(true)
    //testFunction("white bell activated: hideIcon")
}

// when the page loads, change item's state back to false and hide the alert icon
export const handleShowIcon = (items: Item[], setShowRedBell: any, setShowWhiteBell: any, testFunction: any) => {
    
    // loop over items and check if the item state is changed to true
    for(let i = 0; i < items.length; i++){
        if (items[i]?.changed === true) {   // if true, show the red bell and hide the white bell
           setShowRedBell(true)     
           setShowWhiteBell(false)
           //testFunction("red bell activated: showIcon")
           return
        }
        //testFunction("item checked: showIcon")
    }
}