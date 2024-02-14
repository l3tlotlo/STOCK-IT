//Fetch Firebase modules and configuration
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js";
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-database.js";


const appSettings = {
    databaseURL: "https://realtime-database-9e773-default-rtdb.asia-southeast1.firebasedatabase.app/"
}

// Initialize Firebase 
const app = initializeApp(appSettings);

//Firebase reference
const database = getDatabase(app);

const groceriesInDB = ref(database, "groceries");

const inputFieldEl = document.getElementById("input-field");
const addButtonEl = document.getElementById("add-button");
const groceriesEL = document.getElementById("groceries");

// Event listener for the 'Add' button
addButtonEl.addEventListener("click", function() {
 
    let inputValue = inputFieldEl.value;


    push(groceriesInDB, inputValue);

  
    clearInputFieldEl();
});

onValue(groceriesInDB, function(snapshot) {
    
    if (snapshot.exists()) {
      
        let itemsArray = Object.entries(snapshot.val());

        // Clear the groceries list 
        clearGroceriesEl();

        for (let i = 0; i < itemsArray.length; i++) {
            let currentItem = itemsArray[i];
            let currentItemID = currentItem[0];
            let currentItemValue = currentItem[1];

            addItemToGroceriesEl(currentItemID, currentItemValue);
        }
    } else {
        // Display a message if there are no items in the database
        groceriesEL.innerHTML = "Add items";
    }
});

//Clear the groceries 
function clearGroceriesEl() {
    groceriesEL.innerHTML = "";
}


function clearInputFieldEl() {
    inputFieldEl.value = "";
}

// Append an item to the groceries list 
function addItemToGroceriesEl(itemID, itemValue) {
  
    const listItem = document.createElement("li");
    listItem.textContent = itemValue;

   
    listItem.addEventListener("click", function() {
        let exactLocationOfItemInDB = ref(database, `groceries/${itemID}`);
        remove(exactLocationOfItemInDB);
    });

    // Append the list item to the groceries list
    groceriesEL.appendChild(listItem);
}
