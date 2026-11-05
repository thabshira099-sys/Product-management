let productName = document.getElementById("productName");
let productDescription = document.getElementById("productDescription");
let productPrice = document.getElementById("productPrice");
let btn = document.getElementById("btn");
let taskList = document.getElementById("taskList");
let cardEdit=null;
btn.addEventListener("click", function () {
    if(productName.value==""||productPrice.value=="")
    {
        alert("please fill the  required  fields");
        return;
    }
    let name = productName.value;
    let desc = productDescription.value;
    let price = productPrice.value;
    if(cardEdit!==null){
      cardEdit.querySelector("h2").innerText=name;
      cardEdit.querySelector("p").innerText=desc;
      cardEdit.querySelector("h3").innerText=price;
      cardEdit=null;
      productName.value = "";
      productDescription.value = "";
      productPrice.value = "";
      btn.innerText = "Add Product";
      return;  
    };

    let card = document.createElement("div");
    card.classList.add("bg-green-300", "shadow", "p-4", "rounded-lg","border-2", "border-green-500","break-words","w-full");
    let heading = document.createElement("h2");
    heading.textContent = name;
    let description = document.createElement("p");
    description.textContent = desc;
    let priceElement = document.createElement("h3");
    priceElement.textContent = price;
    let deleteButton = document.createElement("button");
    deleteButton.innerText = "Delete";
    deleteButton.classList.add("bg-green-500", "text-white", "p-1", "rounded");
    card.appendChild(deleteButton);
    deleteButton.addEventListener("click", function () {
    card.remove();
    });
    let editButton = document.createElement("button");
    editButton.innerText = "Edit";
    editButton.classList.add("bg-blue-500", "ml-3","mt-4", "text-white", "p-1", "rounded");
    card.appendChild(editButton);
    editButton.addEventListener("click", function () {
        productName.value=heading.innerText;
        productDescription.value=description.innerText;
        productPrice.value=priceElement.innerText;
        cardEdit=card;
        btn.innerText = "Update Product";
    });
    card.appendChild(heading);
    card.appendChild(description);
    card.appendChild(priceElement);
    taskList.appendChild(card);
    productName.value = "";
    productDescription.value = "";
    productPrice.value = "";
});