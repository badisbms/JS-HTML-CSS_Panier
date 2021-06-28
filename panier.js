// #################Section formulaire de création d'objets Local Storage########################################################

// Creation d'une classe afin de pouvoir créer mes produits
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
resultat = 0;

portfolio = 8000

portfolioUser.innerHTML = `Mon portefeuille : ${8000}€`

//Bouton Valider votre article
validate.addEventListener("click", addObjectToLocalStorage);

function addObjectToLocalStorage() {
  //Me permet de nommer la clé de mon LocalStorage
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

    localStorValues = localStorage.getItem(localStorage.key(index));
    listOfLSvalues = JSON.parse(localStorValues);

    tr = document.createElement("tr");

    td1 = document.createElement("td");
    td1.innerHTML = listOfLSvalues.ref;

    td2 = document.createElement("td");
    a = document.createElement("a");
    a.setAttribute("href", "#");
    a.innerHTML = listOfLSvalues.nameProduct;
    td2.appendChild(a);

    td3 = document.createElement("td");
    td3.innerHTML = listOfLSvalues.descriptionProduct;

    td4 = document.createElement("td");
    td4.innerHTML = listOfLSvalues.price;

    td5 = document.createElement("td");

    if (listOfLSvalues.stock < 10) {

      td5.style.color = "red"
      td5.style.fontSize ="20px"
      td5.innerHTML = `${listOfLSvalues.stock} en stock`;
      
    } else {
      td5.innerHTML = listOfLSvalues.stock
    }
    

    td6 = document.createElement("td");
    addTocart = document.createElement("button");
    addTocart.className = "buttonsAdd";
    addTocart.innerHTML = "Ajouter au panier";
    td6.appendChild(addTocart);

    td7 = document.createElement("td");
    modify = document.createElement("button");
    modify.className = "buttonsModify";
    modify.innerHTML = "Modifier Produit";
    td7.appendChild(modify);

    td8 = document.createElement("td")
    myInput = document.createElement("input");
    myInput.setAttribute("type", "number");
    td8.appendChild(myInput)

    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tr.appendChild(td4);
    tr.appendChild(td5);
    tr.appendChild(td6);
    tr.appendChild(td7);
    tr.appendChild(td8);

    tableProduct.appendChild(tr);

    //Boucle qui permet d'itérer dans mes boutons afin de leur donner un id unique (égal a clé de mon LS)
    //grace a la classe donnée en amont → permet d'être sur de récuper dans le LS la val du BON bouton 
    buttons = document.querySelectorAll(".buttonsAdd");



    for (i = 0; i < buttons.length; i++) {
      element = buttons[i];

      for (let z = 0; z < localStorage.key(i).length; z++) {
        element.id = `${localStorage.key(i)}`; // id egal a clé du LS
        myInput.setAttribute("class", "inputss");
        myInput.setAttribute("placeholder", "Entrez la quantité puis Entrée");
      }
    }

    //Idem
    myInputs = document.querySelectorAll(".inputss");


    for (f = 0; f < myInputs.length; f++) {
      element2 = myInputs[f];

      for (let w = 0; w < localStorage.key(f).length; w++) {
        element2.id = `${localStorage.key(f)}`;

      }
    }

    //Idem
    buttonsModify = document.querySelectorAll(".buttonsModify");

    for (l = 0; l < buttonsModify.length; l++) {
      element3 = buttonsModify[l];
      for (let v = 0; v < localStorage.key(l).length; v++) {
        element3.id = `${localStorage.key(l)}`;
      }
    }

    element.addEventListener("click", changeValueStock);

    element2.addEventListener("change", getValue);

    element3.addEventListener("click", putValueToForm);
  }
}

//A PERFECTIONNER → pas eu le temps de finir pour la gestion des stock dans la liste des produits 
function changeValueStock() {
  recap.style.display = "block";
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

  putValuetoBasket();
}


//Fontion qui va permettre de recupérer les valuer afin de les mettre au panier
//J'ai choisi le sessionStorage pour que les valeurs soit ephemeres, et pour dissocier le LS et le SS 
function putValuetoBasket() {

  //Je recup l'id de mon bouton, qui est égal a la clé de l'element ciblé, afin de le reutiliser pour créer un clé dans mon SS 
  buttonID = event.target.id;
  //Me permet de recup la val de l'input (quantité)
  inputValuetest = event.target.parentElement.nextSibling.nextSibling.children[0].textContent;

  //Je cicble mon tableau de produit HTML et j'itere dedans afin de recup les valeur pour mon stringify
  html2 = event.target.parentElement.parentElement.children;

  //Je crée donc un nouvel objet avec les valeur de ma liste de prod
  for (let q = 0; q < html.length; q++) {
    var updateObject2 = new myProduct(
      html[0].innerHTML,
      html[1].innerHTML,
      html[2].innerHTML,
      inputValuetest,
      html[3].innerHTML * inputValuetest
    );
  }

  sessionStorage.setItem(buttonID, JSON.stringify(updateObject2));

  tablePanier.innerHTML = "";

  for (let index = 0; index < sessionStorage.length; index++) {

    SessionStorageValue = sessionStorage.getItem(sessionStorage.key(index));
    listOfSSvalues = JSON.parse(SessionStorageValue);

    if (listOfSSvalues.price > 0) {
      trb1 = document.createElement("tr");

      tb1 = document.createElement("td");
      tb1.innerHTML = listOfSSvalues.ref;

      tb2 = document.createElement("td");
      tb2.innerHTML = listOfSSvalues.nameProduct;

      tb3 = document.createElement("td");
      tb3.innerHTML = listOfSSvalues.descriptionProduct;

      tb4 = document.createElement("td");
      tb4.innerHTML = listOfSSvalues.price + " unités"; //qte

      tb5 = document.createElement("td");
      tb5.innerHTML = listOfSSvalues.stock + "€"; //qte*prix

      trb1.appendChild(tb1);
      trb1.appendChild(tb2);
      trb1.appendChild(tb3);
      trb1.appendChild(tb4);
      trb1.appendChild(tb5);

      tablePanier.appendChild(trb1);
    }
  }
}

function getValue() {
  this.innerHTML = this.value;

}

//ACTION bouton modifier de la liste de produit
function putValueToForm() {

  localStorValues3 = localStorage.getItem(localStorage.key(event.target.id));

  NlistOfLSvalues = JSON.parse(localStorValues3);

  myRef =
    event.target.parentElement.previousElementSibling.previousElementSibling
      .previousElementSibling.previousElementSibling.previousElementSibling
      .previousElementSibling.innerText;
  removeAfromNameProduct =
    event.target.parentElement.previousElementSibling.previousElementSibling
      .previousElementSibling.previousElementSibling.previousElementSibling
      .innerText;
  myDescription =
    event.target.parentElement.previousElementSibling.previousElementSibling
      .previousElementSibling.previousElementSibling.innerText;
  myPrice =
    event.target.parentElement.previousElementSibling.previousElementSibling
      .previousElementSibling.innerText;
  myStock =
    event.target.parentElement.previousElementSibling.previousElementSibling
      .innerText;

  key.value = event.target.id;
  ref.value = myRef;
  nameProduct.value = removeAfromNameProduct;
  descriptionProduct.value = myDescription;
  price.value = myPrice;
  stock.value = myStock;
}

recap.addEventListener("click", getRecap);

///Action du bouton RECAP 
function getRecap() {

  tab = [];
  caca = event.target.previousElementSibling.children[0].children;

  for (let m = 0; m < caca.length; m++) {
    for (let g = 0; g < caca.length; g++) {
      bigCaca = caca[g].lastChild.innerHTML;

      a = Number.parseInt(caca[m].lastChild.innerHTML);
    }

    tab.push(a);
    var total = tab.reduce((a, b) => a + b, 0);

    sousTot.innerHTML = `Votre Sous-Total est de : ${total}€`;

    TvaArr = Math.round(`${total * (8 / 100)}`);

    tax.innerHTML = `Montant des Taxes (TVA à 8%) : ${TvaArr}€`;

    ttc.innerHTML = `Total ttc : ${total + TvaArr}€`;


    portfolioUser.innerHTML = `Mon portefeuille : ${portfolio -total + TvaArr}€`
  }
}

//Fonction refresh du SessionStorage
window.onload = function () {
  sessionStorage.clear();
};
//Fonction refresh du SessionStorage
window.reload = function () {
  sessionStorage.clear();
};
//Fonction reset du Session Storage et du LS au click de "Supprimer vos objets"
reset.addEventListener("click", resetStorage);
function resetStorage() {
  sessionStorage.clear();
  localStorage.clear();
  window.location.reload();
}
