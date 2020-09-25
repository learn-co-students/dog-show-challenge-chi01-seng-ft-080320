//variables
const dogTable = document.getElementById('table-body')
const dogForm = document.querySelector('form#dog-form')

//listener.functions
document.addEventListener('DOMContentLoaded', () => {
    main() 
})

dogTable.addEventListener('click', function(event) {
    if (event.target.tagName === 'BUTTON') {
        fillForm(event)
    }
})

//listeners
dogForm.addEventListener('submit', editDog)

//invoked.functions
function main() {
    loadDogs()
}

//main.functions
function loadDogs() {
    fetch('http://localhost:3000/dogs/')
    .then(resp => resp.json())
    .then(dogs => {
        dogs.forEach(dog => {
            populateTable(dog)
        })
    })
}

function populateTable(dog) {
    const dogRows = dogTable.innerHTML += `
    <tr>
    <td>${dog.name}</td>
    <td>${dog.breed}</td>
    <td>${dog.sex}</td>
    <td><button data-id=${dog.id}>Edit</button></td>
    </tr>
    `
}

function fillForm(event) {
    collectInfo(event)
    transferInfo(event)
}

function collectInfo(event) {
    id = event.target.dataset.id
    row = event.target.parentElement.parentElement
    name = row.children[0].innerHTML
    breed = row.children[1].innerHTML
    sex = row.children[2].innerHTML
}

function transferInfo(event) {
    dogForm.children[0].value = name
    dogForm.children[1].value = breed
    dogForm.children[2].value = sex
    dogForm.children[3].id = id
}

function editDog(event) {
    event.preventDefault()
    newName = dogForm.children[0].value
    newBreed = dogForm.children[1].value
    newSex = dogForm.children[2].value
    id = dogForm.children[3].id
    updatedDog = {name: newName, breed: newBreed, sex: newSex}
    const reqObj = {
        method:'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(updatedDog)
    }
    fetch(`http://localhost:3000/dogs/${id}`, reqObj)
    .then(resp => resp.json())
    .then(dog => {
        // document.getElementById(`${dog.id}`).parentNode.innerHTML = 
        // `<td>${dog.name}</td>
        // <td>${dog.breed}</td>
        // <td>${dog.sex}</td>
        // <td><button data-id=${dog.id}>Edit</button></td>
        // `
        dogForm.reset() 
    })
}


