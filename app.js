document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector(".block-img");
  // const costNav = document.querySelector(".cost-nav");
    const balancedPrice = document.querySelector(".balance");
  const quantityCart = document.querySelector('.quantity');
  const crossIcon = document.querySelector(".fa-xmark");
  // const costNavBody = document.querySelector(".body");


  async function getProducts() {
    const response = await fetch("https://dummyjson.com/products");
    const data = await response.json()

    data.products.forEach((item, i) => {
      const dicountPrice = dicountPriceFun(
        item.price,
        item.discountPercentage
      );

      container.innerHTML += `
        <div class="relative">
          <div class="pricent">
            <a href="/products.html?id=${item.id}">
              ${item.discountPercentage}%
            </a>
          </div>
          <div class="w-[350px] h-[470px] bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <a href="/products.html?id=${item.id}&category=${item.category}">
              <img class="w-[350px] h-[310px] p-5 rounded-t-lg" src="${item.thumbnail}" alt="product image" />
            </a>
            <div class="px-5 pb-5">
              <h5 class="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                <a href="#">
                  ${item.title}
                </a>
              </h5>
              <div class="flex items-center mt-2.5 mb-5 w-[100px]">
                <div class="flex items-center space-x-1">
                <div class="flex items-center space-x-1">
                      <svg class="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                          <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"></path>
                      </svg>
                      <svg class="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                          <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"></path>
                      </svg>
                      <svg class="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                          <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"></path>
                      </svg>
                      <svg class="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                          <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"></path>
                      </svg>
                      <svg class="w-4 h-4 text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                          <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"></path>
                      </svg>
                  </div>
                  <!-- Rating icons -->
                </div>
                <span class="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ms-3">
                  ${item.rating}
                </span>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-3xl font-bold text-red-500">$${dicountPrice.toFixed(2)}</span>
                <span class="plants-price ml-[-25px]"><del><sup>$${item.price}</sup></del></span>
                <button id="cart" type="button" onclick="addToCart(${item.id}, window.product)">Add to Cart</button>
              </div>
            </div>
          </div>
        </div>
      `;
    });
  }
  getProducts();

  quantityCart.addEventListener("click", () => {
    costNav.style.right = "0";
    costNav.style.transitionDuration = "1s";
  });

  crossIcon.addEventListener("click", () => {
    costNav.style.right = "-900px";
    costNav.style.transitionDuration = "1s";
  });

  window.addToCart = async function (id) {
    const findProduct = await fetch(`https://dummyjson.com/products/${id}`);
    const res = await findProduct.json();

    const oldCart = localStorage.getItem("cart")
      ? JSON.parse(localStorage.getItem("cart"))
      : [];
    localStorage.setItem(
      "cart",
      JSON.stringify([...oldCart, { ...res, qty: 1 }])
    );

    updateCartQuantityDisplay(); // updateCartQuantityDisplay ni yuqoridan chaqiring
    generateCartproducts()
  }

  function updateCartQuantityDisplay() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartQuantity = document.querySelector("#cartQuantity");
    if (cartQuantity) {
      cartQuantity.textContent = cart.length;
    } else {
      console.error("Element with ID 'cartQuantity' not found.");
    }
  }


  function dicountPriceFun(price, discountPercen) {
    const dicountPriceFaktor = discountPercen / 100;

    const dicountPrice = price - price * dicountPriceFaktor;

    return dicountPrice;
  }

  //   async function generateProducts() {
  //     const response = await fetch("https://dummyjson.com/products");
  //     const data = await response.json()
  //     cart = [];
  //     data.products.forEach((product) => {
  //         const selectedProduct = {...product, qty: 1 };
  //         cart.push(selectedProduct);
  //         generateCartproducts();
  //         totalPrice();
  //     })
  // }

  const costNav = document.querySelector(".cost-nav");
  const costNavBody = document.querySelector(".body");

  function generateCartproducts() {
    const cart = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : [];
    const cartProducts = cart
      .map(
        (product, i) =>
          `
       <div class="block">
            <div class="div1">
                <div style="display: flex; align-items: center; gap: 5px;">
                    <img src="${product.thumbnail}" alt="${product.title}" class="div1-img">
                    <span class="itemname">${product.title}</span>
                </div>
                <i class="fa-solid fa-trash-can" onclick="remove(${i})"></i>
            </div>
            <div class="div2">
                <span>Quantity</span><br>
                <div class="inc-dec">
                    <span class="decreament" onclick="deccreament(${i})">-</span>
                    <span class="count-number">${product.qty}</span>
                    <span class="increament" onclick="increament(${i})">+</span>
                </div>
                <span>$<span class="cost-price">${(product.price * product.qty).toFixed(2)}</span></span>
            </div>
      </div>
     <hr>`
      )
      .join("");

    costNavBody.innerHTML = cartProducts;
  }

  generateCartproducts();



 window.increament =  function(inc) {
  const cart = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : [];
  
  cart[inc].qty = cart[inc].qty + 1;
  const incrProd = cart[inc]

  const productExectinIndex = cart.filter((product, i) => i !== inc)
  console.log(productExectinIndex);
  localStorage.setItem("cart", JSON.stringify([...productExectinIndex, incrProd]))
   generateCartproducts();
    totalPrice();
  };


  window.deccreament =  function(dec) {
    const cart = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : [];
    
    cart[dec].qty = cart[dec].qty - 1;
    const incrProd = cart[dec]
  
    const productExectinIndex = cart.filter((product, i) => i !== dec)
    console.log(productExectinIndex);
    localStorage.setItem("cart", JSON.stringify([...productExectinIndex, incrProd]))
     generateCartproducts();
      totalPrice();
    };

    window.remove = function(rem) {
      const cart = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : [];
      const incrProd = cart[rem];
      cart.splice(rem, 1);

      const productExectinIndex = cart.filter((product, i) => i !== rem);
      console.log(productExectinIndex);
      localStorage.setItem("cart", JSON.stringify([...productExectinIndex, incrProd]));
      generateCartproducts();
      totalPrice();
  };

  function totalPrice() {
    const cart = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : [];
    let total = 0;
    cart.forEach(product => {
      total += (product.price * product.qty);
    });
    const balancedPrice = document.querySelector(".balance");
    // console.log(balancedPrice);
    balancedPrice.textContent = total.toFixed(2);
  }
  });