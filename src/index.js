let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });



  //EVENT LISTENERS
  let form = document.querySelector('.add-toy-form')
  form.addEventListener('submit', handleSubmit)

  //ADD TOY INFO TO CARD
  function renderOneToy(toy) {
    //build the toy
    let card = document.createElement('div')
    card.className = 'card'
    card.innerHTML = `
        <h2>${toy.name}</h2>
        <img src = "${toy.image}" class="toy-avatar">
        <p>${toy.likes}</p>
        <button class="like-btn" id="${toy.id}">Like</button>
      `
    //LIKE BUTTON
    // card.querySelector('.like-btn').addEventListener('click',() => console.log('clicked'))
    card.querySelector('.like-btn').addEventListener('click', () => {
      toy.likes += 1
      card.querySelector('p').textContent = toy.likes
      addLikes(toy)
    })

    //Add toy card to DOM
    document.querySelector('#toy-collection').appendChild(card);
  }

  // MAKE A GET REQUEST TO FETCH ALL TOY OBJECTS
  function getToys() {
    fetch('http://localhost:3000/toys')
      .then(res => res.json())
      .then(toyData => toyData.forEach(toy => renderOneToy(toy)))

  }

  //FORM SUBMIT HANDLER
  function handleSubmit(e) {
    e.preventDefault()
    let toyObj = {
      name: e.target.name.value,
      image: e.target.image.value,
      likes: 0
    }

    renderOneToy(toyObj)
    addNewToy(toyObj)
  }

  //ADD NEW TOY 'POST'
  function addNewToy(toyObj) {
    fetch('http://localhost:3000/toys', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(toyObj)
    })
      .then(res => res.json())
    // .then(toy => console.log(toy))
  }

  function addLikes(toyObj) {
    // console.log(toyObj.id)
    let moreLikes = toyObj.likes
    fetch(`http://localhost:3000/toys/${toyObj.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        likes: moreLikes
      })
    })
      .then(res => res.json())
      .then(toy => console.log(toy))
        }
  



  getToys()

    });
