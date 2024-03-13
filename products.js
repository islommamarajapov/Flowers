const container = document.querySelector(".prodItem");
const quantityCart = document.querySelector(".quantity");
const costNav = document.querySelector(".cost-nav");
const crossIcon = document.querySelector(".fa-xmark");






const url = window.location.search;
const searchProdId = url.split("?")[1];
const parms = new URLSearchParams(searchProdId);
const category = parms.get("category");
console.log(category);
const id = parms.get("id");

async function getProductsId() {
    try {
        const result = await fetch(`https://dummyjson.com/products/${id}`);
        const data = await result.json();

        const dicountPrice = dicountPriceFun(
            data.price,
            data.discountPercentage
        );
        container.innerHTML += `<div class="content1">
            <div class="scale1">
                <img src="${data.thumbnail}" class="img1" alt="${data.title}">
                <div class="rasm"></div>
                <div class="images"></div>
            </div>
            <div class="write-block">
            <p class="plant-name">${data.title}</p>
            <p class="plant-price">$${dicountPrice.toFixed(2)}<del><sub>${data.price}</sub></del></p>
    <p class="plants-data">${data.description}</p>
            <h1 class="quan">Quantity:</h1>
            <span class="qua"><div class="py-2 px-3 inline-block bg-white border border-gray-200 rounded-lg dark:bg-slate-900 dark:border-gray-700" data-hs-input-number>
            <div class="flex items-center gap-x-1.5">
              <button type="button" class="dec size-6 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-md border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600" decrement>-</button>
              <input id="put" class="p-0 w-6 bg-transparent border-0 text-gray-800 text-center focus:ring-0 dark:text-white" type="text" value="0" data-hs-input-number-input>
              <button type="button" class="inc size-6 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-md border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600" increment>+</button>
            </div>
          </div></span>
          <div class="buttons">
          <button class="add-cart1">Add to cart🛒</button>
          <button class="add-cart1" style="background: none; border:2px solid #106010; color:#106010; position:relative; top:-279px; margin-left: 5px">Buy now</button>
          </div>
            </div>
        </div>`;


        const incrementDecrement = container.querySelector(".qua");
        const increment = container.querySelector(".inc");
        const decrement = container.querySelector(".dec");
        const input = document.querySelector("#put");

        increment.addEventListener("click", () => {
            let currentValue = parseInt(input.value);
            input.value = currentValue + 1;
        });

        decrement.addEventListener("click", () => {
            let currentValue = parseInt(input.value);
            input.value = currentValue - 1;
        });

        let imagesContainer = document.querySelector('.images');
        for (let img of data.images) {
            const image = document.createElement("img");
            image.src = img;
            image.addEventListener("click", () => updateImg(img));
            imagesContainer.appendChild(image);
      }


        const addCart = container.querySelector('.add-cart1')

        quantityCart.addEventListener("click", () => {
            costNav.style.right = "0";
            costNav.style.transitionDuration = "1s";
        });
        addCart?.addEventListener("click", () => {
            costNav.style.right = "0";
            costNav.style.transitionDuration = "1s";
        });
        crossIcon.addEventListener("click", () => {
            costNav.style.right = "-700px";
            costNav.style.transitionDuration = "1s";
        });
    } catch (error) {
        console.error(error);
    }
}
getProductsId();



function generateCartproducts() {
    const cartProducts = cart
        .map(
            (product, i) =>
                `
         <div class="block">
              <div class="div1">
                  <div style="display: flex; align-items: center; gap: 5px;">
                      <img src="${product.imgsrc}" alt="${product.plantname}" class="div1-img">
                      <span class="itemname">${product.plantname}</span>
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
                  <span>$<span class="cost-price">${(product.plantprice * product.qty).toFixed(2)}</span></span>
              </div>
        </div>
       <hr>`
        )
        .join("");


    costNavBody.innerHTML = cartProducts

}


function updateImg(img) {
    const defaultImg = document.querySelector(".img1");
    defaultImg.src = img;
    defaultImg.innerHTML = `<img src="${img}" alt="Big Image">`;
}

function dicountPriceFun(price, discountPercen) {
    const dicountPriceFaktor = discountPercen / 100;
    const dicountPrice = price - price * dicountPriceFaktor;
    console.log(dicountPrice);
    return dicountPrice;
}


const getCategoryProduct = async () => {
    try {
      const res = await fetch(`https://dummyjson.com/products/category/${category}`);
      const categoryProduct = await res.json();
      console.log(categoryProduct);
  
      categoryProduct.products.forEach(async (items, index) => {
        const discountPrice = await dicountPriceFun(
        items.price,
        items.discountPercentage
        );
  
        const more = document.getElementById("more");
        more.innerHTML += `
        
        <div class="relative">
        <a href="/products.html?id=${items.id}&category=${items.category}">
         <div class="pricent">
         ${items.discountPercentage}%
         </div>
        </a>
        <div>
        <div class="w-[350px] h-[470px] bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <a href="/products.html?id=${items.id}">
        <img class="w-[350px] h-[310px] p-5 rounded-t-lg" s src="${items.thumbnail}" alt="product image"/>
        <div class="px-5 pb-5">
            <a href="#">
                <h5 class="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">${items.title}</h5>
            </a>
            <div class="flex items-center mt-2.5 mb-5 w-[100px]">
                <div class="flex items-center space-x-1">
                    <svg class="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                    </svg>
                    <svg class="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                    </svg>
                    <svg class="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                    </svg>
                    <svg class="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                    </svg>
                    <svg class="w-4 h-4 text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                    </svg>
                </div>
                <span class="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ms-3">${items.rating}</span>
                </div>
                <div class="flex items-center justify-between">
                <span class="text-3xl font-bold text-red-500">$${discountPrice.toFixed(2)}</span>
                <span class="plants-price ml-[-25px]"><del><sup>$${items.price}</sup></del></span>
                <a href="#" id="quantityBtn" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add to cart</a>
            </div>
        </div>
    </div>`
    });

} catch (error) {
  console.log(error);
}
};


getCategoryProduct();