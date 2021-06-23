// #################Section formulaire de création d'objets Local Storage########################################################
validate.addEventListener("click", addObjectToLs);

class myProduct {
  constructor(ref, nameProduct, descriptionProduct, price, stock) {
    this.ref = ref;
    this.nameProduct = nameProduct;
    this.descriptionProduct = descriptionProduct;
    this.price = price;
    this.stock = stock;
  }
}

count = 0;
count2 = 0;

function addObjectToLs() {
  cle = key.value;

  var monProduit = new myProduct(
    ref.value,
    nameProduct.value,
    descriptionProduct.value,
    price.value,
    stock.value
  );

  if (cle === "") {
    alert("Veuillez entrer un nom de produit valide");
  } else {
    localStorage.setItem(cle, JSON.stringify(monProduit));
  }

  //Permet de reinitialiser les inputs à chaque clicks
  key.value = "";
  ref.value = "";
  nameProduct.value = "";
  descriptionProduct.value = "";
  price.value = "";
  stock.value = "";
}

// #################Section récupération données du LS ########################################################

addArticle.addEventListener("click", localStorageToTable);

function localStorageToTable() {
  tableProduct.innerHTML = "";

  for (let index = 0; index < localStorage.length; index++) {
    //String exemple : {"ref":"ABCEF","nameProduct":"Iphone","descriptionProduct":"is iphone","price":"852","stock":"8521"}
    localStorValues = localStorage.getItem(localStorage.key(index));
    // Objet
    listOfLSvalues = JSON.parse(localStorValues);

    tr = document.createElement("tr");

    td1 = document.createElement("td");
    td1.innerHTML = listOfLSvalues.ref;

    td2 = document.createElement("td");
    a=document.createElement("a");
    a.setAttribute("href","#")
    a.innerHTML= listOfLSvalues.nameProduct
    td2.appendChild(a)

    td3 = document.createElement("td");
    td3.innerHTML = listOfLSvalues.descriptionProduct;

    td4 = document.createElement("td");
    td4.innerHTML = listOfLSvalues.price;

    td5 = document.createElement("td");
    td5.innerHTML = listOfLSvalues.stock;

    td6 = document.createElement("td");
    addTocart = document.createElement("button");
    addTocart.className = "buttonsAdd";
    addTocart.innerHTML = "Acheter";
    td6.appendChild(addTocart);

    td7 = document.createElement("td");
    modify = document.createElement("button");
    modify.className = "buttonsModify"
    modify.innerHTML = "Modifier Produit";
    td7.appendChild(modify);

   


    td8 = document.createElement("input");
    td8.setAttribute("type", "number");

    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tr.appendChild(td4);
    tr.appendChild(td5);
    tr.appendChild(td6);
    tr.appendChild(td7);
    tr.appendChild(td8);

    tableProduct.appendChild(tr);

    buttons = document.querySelectorAll(".buttonsAdd");

    for (i = 0; i < buttons.length; i++) {
      element = buttons[i];

      for (let z = 0; z < localStorage.key(i).length; z++) {
        element.id = `${localStorage.key(i)}`;
        td8.setAttribute("class", "inputss");
        td8.setAttribute("placeholder", "Entrez la quantité puis Entrée");
      }
    }

    element.addEventListener("click", changeValueStock);

    myInputs = document.querySelectorAll(".inputss");

    for (f = 0; f < myInputs.length; f++) {
      element2 = myInputs[f];

      for (let w = 0; w < localStorage.key(f).length; w++) {
        element2.id = `${localStorage.key(f)}`;
      }
    }

    element2.addEventListener("change", getValue);

    
    buttonsModify = document.querySelectorAll(".buttonsModify");

    for (l = 0; l < buttonsModify.length; l++) {
      element3 = buttonsModify[l];

      for (let v = 0; v < localStorage.key(l).length; v++) {
        element3.id = `${localStorage.key(l)}`;
      }
    }

    element3.addEventListener("click", putValueToForm)
   
  }


}


function putValueToForm() {

  localStorValues3 = localStorage.getItem(localStorage.key(event.target.id));

  NlistOfLSvalues = JSON.parse(localStorValues3);

 removeAfromNameProduct = event.target.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.innerText

  key.value = event.target.id;
  ref.value = NlistOfLSvalues.ref;
  nameProduct.value = removeAfromNameProduct;
  descriptionProduct.value = NlistOfLSvalues.descriptionProduct;
  price.value = NlistOfLSvalues.price;
  stock.value = NlistOfLSvalues.stock;
  
}


function getValue() {
  this.innerHTML = this.value;
}

function changeValueStock() {
  count++;

  //Me permet de recupérer la valeur frere du bouton cliqué
  myLsStock = event.target.parentElement.previousElementSibling.innerHTML;
  myLsStockToNumb = Number.parseInt(myLsStock);
  myLsStockToNumb -= count;

  //Me permet de recup l'ID que j'ai généré en amont afin de le réutiliser pour ma clé du SetItem
  buttonID = event.target.id;

  //Permet d'itérer dans la collection HTML afin de récup les différents éléments de mes TR et de les stocker dans mon new object
  html = event.target.parentElement.parentElement.children;

  for (let index = 0; index < html.length; index++) {
    var updateObject = new myProduct(
      html[0].innerHTML,
      html[1].innerHTML,
      html[2].innerHTML,
      html[3].innerHTML,
      myLsStockToNumb
    );
  }

  localStorage.setItem(buttonID, JSON.stringify(updateObject));

  test();
}

function test() {
  buttonID = event.target.id;
  inputValue = event.target.parentElement.nextSibling.nextSibling.innerHTML;

  html2 = event.target.parentElement.parentElement.children;

  for (let q = 0; q < html.length; q++) {
    var updateObject2 = new myProduct(
      html[0].innerHTML,
      html[1].innerHTML,
      html[2].innerHTML,
      html[3].innerHTML * inputValue
    );
  }

  sessionStorage.setItem(buttonID, JSON.stringify(updateObject2));

  tablePanier.innerHTML = "";

  for (let index = 0; index < sessionStorage.length; index++) {
    
    SessionStorageValue = sessionStorage.getItem(sessionStorage.key(index));
    // Objet
    listOfSSvalues = JSON.parse(SessionStorageValue)

    if (listOfSSvalues.price === 0 || listOfSSvalues.price === undefined) {

      console.log("pas de prix");
      
    } else if (inputValue  === null || inputValue === undefined) {

        alert("pas de qte")

    } else {

    trb1 = document.createElement("tr");

    tb1 = document.createElement("td");
    tb1.innerHTML = listOfSSvalues.ref;

    tb2 = document.createElement("td");
    tb2.innerHTML = listOfSSvalues.nameProduct;

    tb3 = document.createElement("td");
    tb3.innerHTML = listOfSSvalues.descriptionProduct;

    tb4 = document.createElement("td");
    tb4.innerHTML = listOfSSvalues.price+"€"

    trb1.appendChild(tb1);
    trb1.appendChild(tb2);
    trb1.appendChild(tb3);
    trb1.appendChild(tb4);

    tablePanier.appendChild(trb1);
  }
  }
}


reset.addEventListener("click", resetStorage);
function resetStorage() {
  sessionStorage.clear();
  localStorage.clear();
  window.location.reload();
}
