// --- do not touch  ↓↓↓↓↓↓↓↓↓↓↓↓ ----------
const baseServerURL = `http://localhost:${import.meta.env.REACT_APP_JSON_SERVER_PORT
  }`;
// --- do not touch  ↑↑↑↑↑↑↑↑↑↑↑↑ ----------

// ***** Constants / Variables ***** //
const pitchURL = `${baseServerURL}/pitches`;
let mainSection = document.getElementById("data-list-wrapper");

// pitch
let pitchTitleInput = document.getElementById("pitch-title");
let pitchImageInput = document.getElementById("pitch-image");
let pitchCategoryInput = document.getElementById("pitch-category");
let pitchfounderInput = document.getElementById("pitch-founder");
let pitchPriceInput = document.getElementById("pitch-price");
let pitchCreateBtn = document.getElementById("add-pitch");

// Update pitch
let updatePitchIdInput = document.getElementById("update-pitch-id");
let updatePitchTitleInput = document.getElementById("update-pitch-title");
let updatePitchImageInput = document.getElementById("update-pitch-image");
let updatePitchfounderInput = document.getElementById("update-pitch-founder");
let updatePitchCategoryInput = document.getElementById("update-pitch-category");
let updatePitchPriceInput = document.getElementById("update-pitch-price");
let updatePitchBtn = document.getElementById("update-pitch");

//Update price
let updatePricePitchId = document.getElementById("update-price-pitch-id");
let updatePricePitchPrice = document.getElementById("update-price-pitch-price");
let updatePricePitchPriceButton = document.getElementById("update-price-pitch");

//sort and filter
let sortAtoZBtn = document.getElementById("sort-low-to-high");
let sortZtoABtn = document.getElementById("sort-high-to-low");
let filterFood = document.getElementById("filter-Food");
let filterElectronics = document.getElementById("filter-Electronics");
let filterPersonalCare = document.getElementById("filter-Personal-Care");

//Search by title/founder
let searchBySelect = document.getElementById("search-by-select");
let searchByInput = document.getElementById("search-by-input");
let searchByButton = document.getElementById("search-by-button");


let arr = [];
function get_Data() {
  fetch(pitchURL)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      arr.push(data);
      display(data);
    })
    .catch((err) => console.log(err));
}

window.addEventListener("load", () => {
  get_Data();
});

function display(data) {
  mainSection.innerHTML = "";
  data.forEach((ele, i) => {
    let card_List = document.createElement("div");
    card_List.setAttribute("class", "card-list");
    let card = document.createElement("div");
    card.setAttribute("class", "card");
    let card_Img = document.createElement("div");
    card_Img.setAttribute("class", "card-img");
    let img = document.createElement("img");
    img.src = ele.image;
    let card_Body = document.createElement("div");
    let card_Title = document.createElement("h4");
    card_Title.setAttribute("class", "card-title");
    card_Title.innerHTML = ele.title;
    let card_Founder = document.createElement("p");
    card_Founder.setAttribute("class", "card-founder");
    card_Founder.innerHTML = ele.founder;
    let card_Category = document.createElement("p");
    card_Category.setAttribute("class", "card-category");
    card_Category.innerHTML = ele.category;
    let card_Price = document.createElement("p");
    card_Price.setAttribute("class", "card-price");
    card_Price.innerHTML = ele.price;
    let Edit_link = document.createElement("a");
    Edit_link.setAttribute("class", "card-link");
    Edit_link.innerHTML = "Edit";
    let Delete = document.createElement("button");
    Delete.innerHTML = "Delete";
    Delete.setAttribute("class", "card-button");
    card_Img.append(img);
    card_Body.append(
      card_Title,
      card_Founder,
      card_Category,
      card_Price,
      Edit_link,
      Delete
    );
    card.append(card_Img, card_Body);
    card_List.append(card);
    mainSection.append(card_List);
    Delete.addEventListener("click", () => {
      deletepitch(ele.id);
    });
    Edit_link.addEventListener("click", (e) => {
      e.preventDefault();
      updataLinkData(ele);
    });
  });
}



// const deleteButtons = document.querySelector("card-button");


// deleteButtons.addEventListener(("click",(e)=>{

//   e.preventDefault();
//       console.log("del click")
//       // e.preventDefault();
//       // const pitchId = button.getAttribute('data-id');
//       // deletePitch(pitchId);

// }))



// function deletePitch(pitchId) {
//   const deleteUrl = `${baseServerURL}/pitches/${pitchId}`;

//   fetch(deleteUrl, {
//     method: 'DELETE',
//     headers: {
//       'content-Type': 'application/json',
//     },
//   })
//     .then((res) => res.json())
//     .then((data) => {
//       // Remove the pitch card from the DOM
//       const card = document.querySelector(`[data-id="${pitchId}"]`);
//       if (card) {
//         card.remove();
//       }
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// }


// const editLinks = document.querySelectorAll('.card-link');
// editLinks.forEach((link) => {
//   link.addEventListener('click', (e) => {
//     e.preventDefault();
//     const pitchId = link.getAttribute('data-id');
//     populateEditForm(pitchId);
//   });
// });


// function populateEditForm(pitchId) {
//   const fetchUrl = `${baseServerURL}/pitches/${pitchId}`;

//   fetch(fetchUrl)
//     .then((res) => res.json())
//     .then((data) => {
//       document.getElementById('update-pitch-id').value = data.id;
//       document.getElementById('update-pitch-title').value = data.title;
//       document.getElementById('update-pitch-image').value = data.image;
//       document.getElementById('update-pitch-founder').value = data.founder;
//       document.getElementById('update-pitch-category').value = data.category;
//       document.getElementById('update-pitch-price').value = data.price;

//       // Display the edit form
//       document.getElementById('edit-form').style.display = 'block';
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// }



const sortLowToHighButton = document.querySelector('#sort-low-to-high');
const sortHighToLowButton = document.querySelector('#sort-high-to-low');

sortLowToHighButton.addEventListener('click', () => {
  sortPitchesByPrice('asc');
});

sortHighToLowButton.addEventListener('click', () => {
  sortPitchesByPrice('desc');
});


function sortPitchesByPrice(order) {
  const cardList = document.querySelectorAll('.card-list');

  // Convert cardList NodeList to an array
  const pitches = Array.from(cardList);

  pitches.sort((a, b) => {
    const priceA = parseFloat(a.querySelector('.card-price').textContent);
    const priceB = parseFloat(b.querySelector('.card-price').textContent);

    if (order === 'asc') {
      return priceA - priceB;
    } else {
      return priceB - priceA;
    }
  });

  // Remove existing pitch cards from the DOM
  cardList.forEach((card) => {
    card.remove();
  });

  // Append sorted pitch cards back to the main section
  pitches.forEach((pitch) => {
    mainSection.appendChild(pitch);
  });
}


function updataLinkData(obj) {
  updatePitchIdInput.value = obj.id;
  updatePitchTitleInput.value = obj.title;
  updatePitchImageInput.value = obj.image;
  updatePitchfounderInput.value = obj.founder;
  updatePitchCategoryInput.value = obj.category;
  updatePitchPriceInput.value = obj.price;
  updatePricePitchId.value = obj.id;
  updatePricePitchPrice.value = obj.price;
}

let deletepitch = (id) => {
  fetch(`${pitchURL}/${id}`, {
    method: "DELETE",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      get_Data();
    })
    .catch((err) => {
      console.log(err);
    });
};

function addpitch(obj) {
  fetch(pitchURL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(obj),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      get_Data();
    })
    .catch((err) => {
      console.log(err);
    });
}

pitchCreateBtn.addEventListener("click", () => {
  let obj = {
    title: pitchTitleInput.value,
    price: pitchPriceInput.value,
    image: pitchImageInput.value,
    category: pitchCategoryInput.value,
    founder: pitchfounderInput.value,
  };
  addpitch(obj);
});
updatePitchBtn.addEventListener("click", () => {
  let obj = {
    title: updatePitchTitleInput.value,
    price: updatePitchPriceInput.value,
    image: updatePitchImageInput.value,
    category: updatePitchCategoryInput.value,
    founder: updatePitchfounderInput.value,
  };
  let id = updatePitchIdInput.value;
  updataPitch(obj, id);
});

function updataPitch(obj, id) {
  fetch(`${pitchURL}/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(obj),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      get_Data();
    })
    .catch((err) => console.log(err));
}

searchByButton.addEventListener("click", () => {
  console.log(searchBySelect.value, searchByInput.value);
  searchBy(searchBySelect.value, searchByInput.value);
});
function searchBy(whom, input) {
  if (whom) {
    fetch(`${pitchURL}?${whom}=${input}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        display(data);
      })
      .catch((err) => console.log(err));
  } else {
    get_Data();
  }
}

sortAtoZBtn.addEventListener("click", () => {
  fetch(`${pitchURL}?_sort=price&_order=asc`)
    .then((res) => res.json())
    .then((data) => {
      display(data);
    });
});
sortZtoABtn.addEventListener("click", () => {
  fetch(`${pitchURL}?_sort=price&_order=desc`)
    .then((res) => res.json())
    .then((data) => {
      display(data);
    });
});

filterFood.addEventListener("click", () => {
  let food = "Food";
  fetch(`${pitchURL}?category=${food}`)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      display(data);
    });
});
filterElectronics.addEventListener("click", () => {
  let food = "Electronics";
  fetch(`${pitchURL}?category=${food}`)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      display(data);
    });
});


filterPersonalCare.addEventListener("click", () => {
  let food = "Personal Care";
  fetch(`${pitchURL}?category=${food}`)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      display(data);
   });
});