import Item from "../../models/Item"

export const handleHideIcon = (items: Item[]) => {
    // - when red icon clicked, change item's state back to false, or whwtever U plannned to do
    // U'll need to call updateEntireItem but this is for single itme - U can try to loop over items and call it for updateEntireItem each item in loop - hope it works. If not, U might have to see if there is firebase func to mass item update
}
export const handleShowIcon = (items: Item[]) => {
    // loop over items and check if state is changed to true
    // - if yes, showRedBell to true and do other things like Redirect, etc
}