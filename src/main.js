let productName = document.getElementById("productName");
let productDescription = document.getElementById("productDescription");
let productPrice = document.getElementById("productPrice");
let products = JSON.parse(localStorage.getItem("products")) || [];
productPrice.addEventListener("input", function () {
    this.value = this.value.replace(/[^0-9]/g, '');
})
let body = document.getElementById("body");
let cookieBtn = document.getElementById("cookieBtn");
if(document.cookie.includes("theme=dark")){
    body.classList.add("bg-black","text-white");
    body.classList.remove("bg-white","text-black");
    cookieBtn.innerText="light mode";
}
cookieBtn.addEventListener("click", function () {
  if(body.classList.contains("bg-white")){
    body.classList.remove("bg-white","text-black");
    body.classList.add("bg-black","text-white");
    document.cookie="theme=dark ; max-age=604800 path=/";
    cookieBtn.innerText="light mode";
  }
  else{
    body.classList.remove("bg-black","text-white");
    body.classList.add("bg-white","text-black");
    document.cookie="theme-light;max-age=604800 path=/";
    cookieBtn.innerText="dark mode";
  }

}
);
let btn = document.getElementById("btn");
let taskList = document.getElementById("taskList");
let cardEdit = null;
btn.addEventListener("click", function () {
    if (productName.value == "" || productPrice.value == "") {
        productName.style.border = "2px solid red";
        productName.placeholder = "*please enter a product name";
        productPrice.style.border = "2px solid red"; 
        productPrice.placeholder = "*please enter a product price";
        return;
    }
    let product = {
        name: productName.value,
        desc: productDescription.value,
        price: productPrice.value
    }
    let name = productName.value;
    let desc = productDescription.value;
    let price = productPrice.value;
    if (cardEdit !== null) {

        let index = Array.from(taskList.children).indexOf(cardEdit);

        products[index] = product;

        cardEdit = null;
        btn.innerText = "Add Product";

    } else {

        products.push(product);

    }
    localStorage.setItem("products", JSON.stringify(products));
    displayProducts();
    console.log(products);
});

function displayProducts() {
    taskList.innerHTML = "";
    products.forEach((product, index) => {
        let card = document.createElement("div");
        card.classList.add("bg-green-300", "shadow", "p-4", "rounded-lg", "border-2", "border-green-500", "break-words", "w-full");

        let heading = document.createElement("h2");
        heading.textContent = product.name;

        let description = document.createElement("p");
        description.textContent = product.desc;
        
        let priceElement = document.createElement("h3");
        priceElement.textContent = product.price;

        let deleteButton = document.createElement("button");
        deleteButton.innerText = "Delete";
        deleteButton.classList.add("bg-green-500", "text-white", "p-1", "rounded");
        card.appendChild(deleteButton);

        deleteButton.addEventListener("click", function () {
            products.splice(index, 1);
            localStorage.setItem("products", JSON.stringify(products));
            displayProducts();

        });

        let editButton = document.createElement("button");
        editButton.innerText = "Edit";
        editButton.classList.add("bg-blue-500", "ml-3", "mt-4", "text-white", "p-1", "rounded");
        card.appendChild(editButton);

        editButton.addEventListener("click", function () {
            productName.value = heading.innerText;
            productDescription.value = description.innerText;
            productPrice.value = priceElement.innerText;
            cardEdit = card;
            btn.innerText = "Update Product";
        });

        card.appendChild(heading);
        card.appendChild(description);
        card.appendChild(priceElement);
        taskList.appendChild(card);
        clearInputs();
    });
}


function clearInputs() {
    productName.value = "";
    productDescription.value = "";
    productPrice.value = "";
};
displayProducts();