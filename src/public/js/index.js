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
    console.log("Listado de productos:");
    products.forEach((product) => {
      console.log(product.title);

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
// const btnAdd = document.querySelector(".btnAdd");
// btnAdd.addEventListener("click", () => {
//   // Recarga la página para mostrar los productos más recientes
//   window.location.reload();
// });