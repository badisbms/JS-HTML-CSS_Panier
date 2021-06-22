// #################Section formulaire de création d'objets Local Storage########################################################
validate.addEventListener("click", addObjectToLs);

function addObjectToLs() {

  cle = key.value;

  monProduit = {
    ref: ref.value,
    name: nameProduct.value,
    desc: descriptionProduct.value,
    price: price.value,
    stock: stock.value,
  };

  // if (cle === "") {
    // alert("Veuillez entrer un nom de produit valide");
  // } else {
    localStorage.setItem(cle, JSON.stringify(monProduit));
    
  //Permet de reinitialiser les inputs à chaque clicks
  key.value = "";
  ref.value = "";
  nameProduct.value = "";
  descriptionProduct.value = "";
  price.value = "";
  stock.value = "";

  localStorageToTable();
  

}

function localStorageToTable() {

  tableProduct.innerHTML = "";

  for (let index = 0; index < localStorage.length; index++) {

    localStorValues = localStorage.getItem(localStorage.key(index));
    listOfLSvalues = JSON.parse(localStorValues);


    tr = document.createElement("tr");

    addTocart = document.createElement("button");
    addTocart.className = "buttonsAdd";
    addTocart.innerHTML = "Acheter";

    modify = document.createElement("button");
    modify.innerHTML = "Modifier Produit";

    td1 = document.createElement("td");
    td1.innerHTML = listOfLSvalues.ref;

    td2 = document.createElement("td");
    td2.innerHTML = listOfLSvalues.name;

    td3 = document.createElement("td");
    td3.innerHTML = listOfLSvalues.desc;

    td4 = document.createElement("td");
    td4.innerHTML = listOfLSvalues.price;

    td5 = document.createElement("td");
    td5.innerHTML = listOfLSvalues.stock;

    // td5.innerHTML = listOfLSvalues.stock;

    td6 = document.createElement("td");
    td6.appendChild(addTocart);

    td7 = document.createElement("td");
    td7.appendChild(modify);

    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tr.appendChild(td4);
    tr.appendChild(td5);

    tr.appendChild(td5);
    tr.appendChild(td6);
    tr.appendChild(td7);

    tableProduct.appendChild(tr);

    buttons = document.querySelectorAll(".buttonsAdd");

    for (i = 0; i < buttons.length; i++) {

      element = buttons[i];

      element.addEventListener("click", addProductToCart);

    }
  }
}


function addProductToCart() {

//   for (let index = 0; index < localStorage.length; index++) {

//     newlocalStorValues = localStorage.getItem(localStorage.key(index));
//     newlistOfLSvalues = JSON.parse(newlocalStorValues);


//     console.log(typeof(newlistOfLSvalues.stock));

//     tutu = Number.parseInt(newlistOfLSvalues.stock, 10)

//     toto = tutu = tutu + 10

//     console.log(toto);


//     localStorage.setItem(localStorage.key(index), tutu )

//     console.log(newlistOfLSvalues);




//   }
  
}





reset.addEventListener("click", resetStorage);

function resetStorage() {
  localStorage.clear();
  window.location.reload();
}

















