const socket = io();

socket.on("currentProducts", async function (products) {
  renderProductList(products);
});

socket.on("updateProducts", async function (products) {
  renderProductList(products);
});

function renderProductList(products) {
  const productList = document.getElementById("productList");
  productList.innerHTML = "";
  try {
    products.forEach((product) => {

      const liProduct = document.createElement("ul");
      liProduct.innerHTML = ` 
          <div class="cardContainer">     
          <h2 class="titleCard">${product.title}</h2>
          <img class="imgCard" src="${product.thumbnail}" alt="${product.title}" />
          <section class="textCard">
            <p>ID: ${product.id}</p>
            <p>${product.description}</p>
            <p>Stock: ${product.stock} unidades</p>
            <p><span>${product.price}</span></p>
            <button class="btnDelete2" data-id="${product.id}">Eliminar</button>
          </section>
          </div>`;
      productList.appendChild(liProduct);

      const btnDelete2 = liProduct.querySelector(".btnDelete2");
      btnDelete2.addEventListener("click", () => {
        deleteProduct(product.id);
      });
    });
  } catch (error) {
    console.error("Error al procesar los productos:", error);
  }
}

const deleteProduct = (productId) => {
  socket.emit("deleteProduct", productId);
};

document.addEventListener('DOMContentLoaded', function() {
  const form = document.querySelector('.formProduct');
  const submitButton = form.querySelector('button[type="submit"]');
  const requiredFields = form.querySelectorAll('input[name="title"], input[name="description"], input[name="code"], input[name="price"], input[name="stock"], input[name="category"]');

  function checkFields() {
    let allFieldsFilled = true;
    requiredFields.forEach(field => {
      if (field.value.trim() === '') {
        allFieldsFilled = false;
      }
    });

    submitButton.disabled = !allFieldsFilled;
  }

  requiredFields.forEach(field => {
    field.addEventListener('input', checkFields);
  });

  checkFields(); 
});