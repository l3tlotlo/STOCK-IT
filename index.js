import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase,ref, push, onValue } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = { 
    databaseURL:"https://realtime-database-9e773-default-rtdb.asia-southeast1.firebasedatabase.app/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const groceriesInDB = ref(database, "groceries")
 
const inputFieldEl = document.getElementById("input-field")
const addButtonEl = document.getElementById("add-button")
const  groceriesEL = document.getElementById("groceries")

addButtonEl.addEventListener("click", function() {
    let inputValue = inputFieldEl.value
    
    push(groceriesInDB, inputValue)
    
    resetInputFieldEl()          
})

onValue(groceriesInDB, function(snapshot){
    
    let itemsArray = Object.entries (snapshot.val()) 

     clearGroceriesEl()
    
    for (let i = 0; i < itemsArray.length; i++) {
        let currentItem = itemsArray[i]        
        let currentItemID = currentItem[0]
        let currentItemValue = currentItem[1]
        
        addItemToGroceriesEl(currentItemValue)
    }
    
})

function clearGroceriesEl(){
    groceriesEL.innerHTML = ""
}
    
function resetInputFieldEl() {
    inputFieldEl.value = ""
}


function addItemToGroceriesEl(itemValue) {
        groceriesEL.innerHTML +=  `<li>${itemValue}</li>`
}



