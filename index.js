import {initializeApp} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import {getDatabase, ref, push, onValue, remove} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://add-to-cart-3aac0-default-rtdb.europe-west1.firebasedatabase.app/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const shoppingListInDB = ref (database, "shoppingList")


const inputFieldEl = document.getElementById("input-field")
const addBottomEl = document.getElementById("add-button")
const shoppingListEl = document.getElementById("shopping-list")


addBottomEl.addEventListener("click", function() {
   let inputValue =  inputFieldEl.value
   
   push(shoppingListInDB, inputValue)
   
   
   clearInputFieldEl()
})

onValue(shoppingListInDB, function(snapshot) {
    if (snapshot.exists()) {
        let itemArray = Object.entries(snapshot.val())
    
    clearShoppingListEl()
    
    for (let i = 0; i < itemArray.length; i++) {
        let currentItem = itemArray[i] 
        let currentItemID = currentItem[0]
        let currentItemValue = currentItem[1]
        
        renderItemInShoppingList(currentItem)
        
    }
    } else {
        shoppingListEl.innerHTML = `
        No item added yet .....`
    }
})



function clearShoppingListEl() {
    shoppingListEl.innerHTML = ""
}

function clearInputFieldEl() {
    inputFieldEl.value =""
}

function renderItemInShoppingList(item) {
   // shoppingListEl.innerHTML += `<li>${itemValue} </li>`
   let itemId = item[0]
   let itemValue = item[1]
   let newEl = document.createElement("li")
   
   newEl.textContent = itemValue
   
   newEl.addEventListener("click", function() {
       let exactLocationOfItemInDB = ref(database, `shoppingList/${itemId}`)
       remove(exactLocationOfItemInDB)
   })
   shoppingListEl.append(newEl)
}