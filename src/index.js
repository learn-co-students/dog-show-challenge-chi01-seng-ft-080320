const dogTable = document.getElementById('table-body')
const dogForm = document.getElementById('dog-form')

function main(){
    loadDogs()
}


function loadDogs(){
    fetch('http://localhost:3000/dogs')
    .then(resp => resp.json())
    .then(dogs => populateDogs(dogs))
}


function populateDogs(dogs){
    dogs.forEach(dog => {
        dogTable.innerHTML += `
        <tr><td data-id = ${dog.id}>${dog.name}</td>
         <td>${dog.breed}</td>
          <td>${dog.sex}</td>
          <td><button class = 'edit-btn'>Edit</button></td></tr>
        `
    })
    const dogRows = document.getElementsByClassName('margin flex')[1]
    dogRows.addEventListener('click', editDogs)
}

function editDogs(e){
    if (e.target.className === 'edit-btn'){
        dogForm.children[0].value = e.target.parentElement.parentElement.children[0].innerText
        dogForm.children[1].value = e.target.parentElement.parentElement.children[1].innerText
        dogForm.children[2].value = e.target.parentElement.parentElement.children[2].innerText
        dogForm.children[3].dataset.id = e.target.parentElement.parentElement.children[0].dataset.id
    }
    dogForm.addEventListener('submit', editDog)
}

function editDog(e){
    
    let dogId = dogForm.children[3].dataset.id
    
    let newDog = {
        name: dogForm[0].value,
        breed: dogForm[1].value,
        sex: dogForm[2].value
    }

    const reqObj = {
        method: "PATCH",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newDog)
    }

    fetch(`http://localhost:3000/dogs/${dogId}`, reqObj)
    .then(resp => resp.json())
    .then(data => console.log(data))
}


main()