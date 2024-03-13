const container1 = document.querySelector(".block-img");
const quantityCart = document.querySelector(".quantity");
const costNav = document.querySelector(".cost-nav");
const crossIcon = document.querySelector(".fa-xmark");

const container = document.getElementById('container');
const registerBtn = document.getElementById('register');
const loginBtn = document.getElementById('login');

registerBtn.addEventListener('click', () => {
    container.classList.add("active");
});

loginBtn.addEventListener('click', () => {
    container.classList.remove("active");
});



quantityCart.addEventListener("click", () => {
    costNav.style.right = "0";
    costNav.style.transitionDuration = ".5s";
  });
  
  crossIcon.addEventListener("click", () => {
    costNav.style.right = "-700px";
    costNav.style.transitionDuration = ".5s";
  });

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
  function totalPrice() {
    balancedPrice.textContent = cart.reduce((acum, value) => {
      return acum + (value.plantprice * value.qty)
  
    }, 0).toFixed(2)
  }