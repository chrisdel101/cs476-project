import Item from "../../models/Item"
import crudFunctions from "../../api/crudFunctions"

// when the red alert icon has been clicked, change item's state back to false and hide the alert icon
export const handleHideIcon = (items: Item[], setShowRedBell: any, setShowWhiteBell: any, testFunction: any) => {

    for(let i = 0; i < items.length; i++){
        if (items[i]?.changed === true) {
            items[i].setChanged = false     // set item changed status back to false
            crudFunctions.updateEntireItem(items[i])    // update item in db
            testFunction("item updated: hideIcon")
        }
        testFunction("item checked: hideIcon")
    }

    //OLD CODE, KEEPING JUST IN CASE, WILL DELETE LATER
    // items.map((item, i) => {            // iterate through items
    //     if (item.changed === true) {    // if the item has been changed
    //         item.setChanged = false     // set item changed status back to false
    //         crudFunctions.updateEntireItem(item)    // update item in db
    //         testFunction("item updated: hideIcon")
    //     } 
    //     testFunction("item checked: hideIcon")
    // })
    
    // return to set showRedBell to false and showWhiteBell to true
    setShowRedBell(false)
    setShowWhiteBell(true)
    // redirect to the items page??
    testFunction("white bell activated: hideIcon")
}

export const handleShowIcon = (items: Item[], setShowRedBell: any, setShowWhiteBell: any, testFunction: any) => {
    // loop over items and check if state is changed to true
    // - if yes, showRedBell to true and do other things like Redirect, etc
    
    for(let i = 0; i < items.length; i++){
        if (items[i]?.changed === true) {
           setShowRedBell(true)     
           setShowWhiteBell(false)
           testFunction("red bell activated: showIcon")
           return
        }
        testFunction("item checked: showIcon")
    }

    //OLD CODE, KEEPING JUST IN CASE, WILL DELETE LATER
    // items.map((item, i) => {            // iterate through items
    //     if (item.changed === true) {    // if the item has been changed
    //         showRedBell(true)          // this should set the red bell as visible
    //         showWhiteBell(false)
    //         testFunction("red bell activated: showIcon")
    //         return                      // only need one instance of this and can stop
    //     } 
    //     testFunction("item checked: showIcon")
        // i don't think i need this because by default it should be white??
        // showRedBell(false)             // otherwise, the white bell should be visible
        // showWhiteBell(true)               
        // testFunction("white bell activated: showIcon")
    // })
}