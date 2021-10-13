// getting all required elements
const inputBox = document.querySelector('.inputField input')
const addButton = document.querySelector('.inputField button')
const toDoList = document.querySelector('.toDoList')
const deleteAllButton = document.querySelector('.footer button')

inputBox.onkeyup = () => {
    let userData = inputBox.value; // getting user entered value
    if (userData.trim() != 0) { // if user values aren't only spaces
        addButton.classList.add("active") // activate the add button
    } else {
        addButton.classList.remove("active") // deactivate the add button
    }
}
showTasks() // calling showTasks function

// if user click on the add button
addButton.onclick = () => {
    let userData = inputBox.value; // getting user entered value
    let getLocalStorage = localStorage.getItem("New ToDo") // getting local storage
    if (getLocalStorage == null) { // if local storage is empty
        listArray = [] // creating an empty array
    } else {
        listArray = JSON.parse(getLocalStorage) // transforming json string into a js object
    }
    listArray.push(userData) // pushing or adding user data
    localStorage.setItem("New ToDo", JSON.stringify(listArray)) // transforming js object into a json string
    showTasks() // calling showTasks function
    addButton.classList.remove("active") // deactivate the add button
}

// function to add task list inside ul
function showTasks() {
    let getLocalStorage = localStorage.getItem("New ToDo") // getting local storage
    if (getLocalStorage == null) { // if local storage is empty
        listArray = [] // creating an empty array
    } else {
        listArray = JSON.parse(getLocalStorage) // transforming json string into a js object
    }

    const pendingNumber = document.querySelector(".pendingNum")
    pendingNumber.textContent = listArray.length // passing the length value in pendingNum
    if (listArray.length > 0) { // if array length is greater than zero
        deleteAllButton.classList.add("active"); // active the clear all button
    } else {
        deleteAllButton.classList.remove("active"); // unactive the clear all button
    }
    let newLiTag = ''
    listArray.forEach((element, index) => {
        newLiTag += `<li> ${element} <span onclick='deleteTask(${index})';><i class="far fa-trash-alt">DEL</i></span></li>`
    })
    toDoList.innerHTML = newLiTag; // adding new li tag inside ul tag
    inputBox.value = '' // once task added leave the input field blank
}

// delete task function
function deleteTask(index) {
    let getLocalStorage = localStorage.getItem("New ToDo") // getting local storage
    listArray = JSON.parse(getLocalStorage) // transforming json string into a js object
    listArray.splice(index, 1) // delete or remove the particular indexed li

    // after remove the li again update the local storage
    localStorage.setItem("New ToDo", JSON.stringify(listArray)) // transforming js object into a json string
    showTasks() // calling showTasks function
}

deleteAllButton.onclick = () => {
    listArray = [] // empty the array

    // after clear all tasks again update the local storage
    localStorage.setItem("New ToDo", JSON.stringify(listArray)) // transforming js object into a json string
    showTasks() // calling showTasks function
}