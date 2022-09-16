let addcartBtn = document.getElementsByClassName('addcart')
for(let i=0;i<addcartBtn.length;i++) {
    let btn = addcartBtn[i]
    btn.addEventListener('click',addToCart)
}
/*function addToCart(event) {
    let button = event.target
    let itemTobeAdded = button.parentElement.parentElement
    let title = itemTobeAdded.getElementsByClassName('title')[0].innerText
    let image = itemTobeAdded.getElementsByClassName('images')[0].src
    let price = itemTobeAdded.getElementsByClassName('amount')[0].innerText
   addingItem(title,image,price)
updateCartTotal();
}*/

function addingItem(title,image,price) {
    let cartRow = document.createElement('div')
    cartRow.classList='cart-row'
    let cartItems = document.getElementsByClassName('cart-items')[0]
    let content =  ` <div class="cart-item cart-column">
    <img class="cart-item-image" src=${image} width="100" height="100">
    <span class="cart-item-title">${title}</span>
</div>
<span class="cart-price cart-column">${price}</span>
<div class="cart-quantity cart-column">
    <input class="cart-quantity-input" type="number" value="1">
    <button class="btn btn-danger" type="button">REMOVE</button>
</div>`
cartRow.innerHTML = content
cartItems.append(cartRow)
cartRow.getElementsByClassName('btn btn-danger')[0].addEventListener('click',removeCartItem);
cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged)

updateCartTotal()
alert('Product Successfully Added')

}
//Purchase button
/*document.getElementsByClassName('btn btn-primary btn-purchase')[0].addEventListener('click',purchaseClicked);
function purchaseClicked(){
    alert('Thank you for your purchase')
    var cartItems = document.getElementsByClassName('cart-items')[0]
    while (cartItems.hasChildNodes()) {
        cartItems.removeChild(cartItems.firstChild)
    }
    axios.post('http://localhost:3000/Order',{cartId:1})
.then(response=>console.log(response))

updateCartTotal()
  }*/
function updateCartTotal() {
  let cartItems = document.getElementsByClassName("cart-items")[0];
  var cartRows = cartItems.querySelectorAll(".cart-row2");
  // console.log(cartRows)
  let total = 0;
  for (
    let i = 0;
    i < cartRows.length;
    i++
  ) {
    total +=
      Number(
        cartRows[i].querySelector(".cart-price").innerText
      ) *
      Number(
        cartRows[i].querySelector(".cart-quantity-input").value
      );
  }
  document.getElementsByClassName("cart-total-price")[0].innerText =
    "$" + total;
  // console.log(document.getElementsByClassName("cart-total-price")[0].innerText);
}

function qtyChanged() {
  let qtyval = document.getElementsByClassName("cart-quantity-input");
  
  // console.log(qtyval)
  for (let i = 0; i < qtyval.length; i++) {
    let qty = qtyval[i];
    qty.addEventListener("change", quantityChanges);
  }
}
function quantityChanges(event) {
  let value = event.target;
  if (isNaN(value.value) || value.value <= 0) {
    value.value = 1;
  }
  updateCartTotal();
}

// Remove item from cart
var removeCartItemButtons=document.getElementsByClassName('btn btn-danger');
//console.log(removeCartitembuttons);
for (var i = 0; i < removeCartItemButtons.length; i++) {
    var button = removeCartItemButtons[i]
     button.addEventListener('click', removeCartItem)
 } 
 function removeCartItem(event) {
    var buttonClicked = event.target
    buttonClicked.parentElement.parentElement.remove()
    updateCartTotal()
}

let open = document.getElementsByClassName("seecart");
const close = document.getElementById("close");
const container = document.getElementById("container");

for(let i=0;i<open.length;i++) {
    let btn=open[i]
    btn.addEventListener("click", showcart)

}

function showcart() {
    container.classList.add("active");
}

close.addEventListener("click", () => {
    container.classList.remove("active");
});

//let pagination = document.getElementById('pagination');



/*window.addEventListener('DOMContentLoaded',()=>{
  const page=2;
  axios.get(`http://localhost:3000/products?=${page}`)
  .then((res)=>{
    console.log(res);
    listProducts(res.data.products);
    showPagination(res.data);
  })
  .catch((err)=>
    console.log(err));

  axios.get(`http://localhost:3000/cart`)
  .then((res)=> {
  console.log(res)

  res.data.products.forEach((p)=>
  addProductToCart(p))})
    
  .catch((err)=> console.log(err));
  });

  function listProducts(productsData){
    const products = document.getElementById('products')
    console.log(productsData);
    products.innerHTML=''
    productsData.forEach((product)=>{
      const prod=document.createElement("div")
      prod.className="product";
      prod.id=`product${product.id}`;
      prod.innerHTML=`<div class="product-image">
      <img
      src=${product.imageUrl} width="350" height="350"
      alt=${product.title}
      />
      </div>
      <div class="product-info">
      <div class="product-top-row">
      <h3 class="product-name">${product.title}</h3>
      <p>&#9733;&#9733;&#9733;</p>
      </div>
      </div class="product-bottom-row">
      <p class="product-price">$${product.price}</p>
      <button class="add-to-cart">Add to cart</button>
      </div>
      </div>`;
      products.appendChild(prod);

    });
  }
  function showPagination({
    currentPage,
    hasNextPage,
    nextPage,
    hasPreviousPage,
    previousPage,
    lastPage,
  }){
    pagination.innerHTML='';
    
    if(hasPreviousPage){
      const btn2=document.createElement('button');
      btn2.innerHTML=previousPage;
      btn2.addEventListener('click',()=>{
        getProducts(previousPage)

      })
      pagination.appendChild(btn2)
    }
    const btn1=document.createElement('button');
    btn1.innerHTML=`<h3>${currentPage}</h3>`;
    btn1.addEventListener('click',()=>getProducts(currentPage))
    pagination.appendChild(btn1);
    if(hasNextPage){
      const btn3=document.createElement('button');
    btn1.innerHTML=nextPage;
    btn1.addEventListener('click',()=>getProducts(nextPage))
    pagination.appendChild(btn3);
    }
  }
  function getProducts(page){
    axios.get(`http://localhost:3000/products?page=${page}`)
    .then(({data:{products,...pageData}})=>{
listProducts(products);
showPagination(pageData);
    })
    .catch((err)=> console.log(err));
  }
  function emptyCart(){
cartItems.innerHTML="";
  }


function addProductToCart({
  id,
  title,
  imageUrl,
  price,
  cartItem:{quantity}
}){

  const itemId=`cartitem-${id}`;
  const item=document.getElementById(itemId);
  if(item){
    item.querySelector(".cart-quantity").value=quantity;
  }
  else{
    const newItem=document.createElement("div");
    const cartItems=document.getElementById('container');
    const totalPrice=document.getElementsByClassName('cart-total')
    newItem.className="cartitem";
    newItem.id=itemId;

    newItem.innerHTML+=`<img src=${imageUrl} />`
    newItem.innerHTML+=`<p class='cart-item-name'>${title}</p>`
    newItem.innerHTML+=`input clss='cartitem-qty' type='number' value=${quantity}`
newItem.innerHTML+=`<p class='cartitem-price'>${price}</p>`

const removeBtn=document.createElement("button");
removeBtn.innerText="Remove";
removeBtn.addEventListener("click",()=>{
  const total=totalPrice.innerText;
  let qty=newItem.quertSelector(".cartitem-qty").value;
  totalPrice.innerText=parseInt(total)-parseInt(price)*parseint(qty);
})
;
newItem.appendChild(removeBtn);
cartItems.appendChild(newItem);
  }
  //const total=totalPrice.innerText;
 // totalPrice.innertext=parseInt(total)+parseInt(price)
}*/
   /* axios.get('http://localhost:3000/products')
   .then((productInfo)=>{
         console.log(productInfo)
        if(productInfo.request.status === 200)  { 
            const products = productInfo.data.products
            console.log(products)

            const parent = document.getElementById('products')

            products.forEach((products)=>{
                const childHTML = ` <div class="albums">
                <h3 class="title">${products.title}</h3>
               <img
                 class="images"
                  src="${products.imageUrl}"
                alt="${products.title}"
                />
                <div class="price">
                  <h4 class="amount">${products.price}$</h4>
                  <button class="addcart" onclick="addtocart(${products.id})">Add to Cart</button>
                </div>
              </div>`

              parent.innerHTML += childHTML
            })
        }

    })
})

*/
function addtocart(productId) {
  let albums = document.querySelectorAll('.albums')


  axios
  .post("http://localhost:3000/cart", { productId: productId })
  .then((response) => {
    
    if (response.status === 200) {
     getCartDetails();
      notifyusers(response.data.message);
    } else {
      throw new Error(response.data.message);
    }
  })
  .catch((err) => {
    notifyusers(err);
    
  });
}


function notifyusers(message) {
   alert(`${message}`)
}
function getCartDetails() {

  axios
    .get("http://localhost:3000/cart")
    .then((data) => {
      if (data.status === 200) {
        let products = data.data.products;
        
        let cartItems = document.getElementsByClassName("cart-items")[0];
        cartItems.innerHTML = ''
        // console.log(cartItems)
        products.forEach((product) => {
          let cartRow = document.createElement("div");
           cartRow.className = "cart-row2";
           
          let content = ` <div class="cart-item cart-column">
               <div class="divider">
               <img class="cart-item-image" src=${product.imageUrl} width="100" height="100">
               
               <span class="cart-item-title">${product.title}</span>
               </div>
               <span class="cart-price cart-column">${product.price}</span>
               <div class="cart-quantity cart-column">
               <input class="cart-quantity-input" type="number" value="${product.cartItem.quantity}" change="addtocart${product.id}">
              
               <button class="btn btn-danger" type="button" onclick="removeItem(${product.id})">REMOVE</button>
               </div>
               </div>`;

          cartRow.innerHTML = content;
          cartItems.append(cartRow);
        });

        
       
        updateCartTotal();
        qtyChanged()
        
      } else {
        throw new Error("Something went wrong");
      }
    })
    .catch((err) => {
      notifyusers(err);
    });
}

function removeItem(productId) {
 
 axios.delete(`http://localhost:3000/cart-delete-item/${productId}`)
 .then(response=>{
  console.log(1);
 getCartDetails()
  updateCartTotal()
 })
}

let c = 0;
let cc = 1;
let pag = document.getElementById('pagination');
// Show products on front end
window.addEventListener("DOMContentLoaded", () => {
  axios.get("http://localhost:3000/limited?page=0").then((productInfo) => {
    if (productInfo.request.status === 200) {
      console.log(productInfo)
      let products = productInfo.data.products;
      console.log(products)
      let childHTML = "";
      let parent = document.getElementById("products");
       console.log(products,parent)
      products.forEach((product) => {
         childHTML += ` <div class="albums">
                <input type="hidden" id="hidden" value="${product.id}">
                <h3 class="title">${product.title}</h3>
                <img
                  class="images"
                  src="${product.imageUrl}"
                  alt="${product.title}"
                />
                <div class="price">
                  <h4 class="amount">${product.price}$</h4>
                  <button class="addcart" onclick="addtocart(${product.id})">Add to Cart</button>
                  
                </div>
              </div>`;
        });
        parent.innerHTML = childHTML;
    }
  });
  getCartDetails();
  pagination()
});

function pagination(e) {
  axios.get("http://localhost:3000/products")
  .then((productInfo)=>{
    let number_of_pages;
    if(productInfo.data.products.length % 2 == 0) {
       number_of_pages = Math.trunc(((productInfo.data.products.length)/2))
    } else {
       number_of_pages = Math.trunc(((productInfo.data.products.length)/2)+1)
    }
   
    for (let i = 0; i < number_of_pages; i++) {
      pag.innerHTML += `<button class="pagebtn" id="?page=${c++}">${cc++}</button> `;
    }
  })
  .catch(err=>console.log(err))
}
pag.addEventListener('click', (e)=>{
  let id = e.target.id;
  console.log(id)
  axios.get(`http://localhost:3000/limited${id}`)
  .then(productInfo=>{
    let products = productInfo.data.products;
     let childHTML="";
      let parent = document.getElementById("products");
      // console.log(products,parent)
      products.forEach((product) => {
         childHTML += ` <div class="albums">
                <input type="hidden" id="hidden" value="${product.id}">
                <h3 class="title">${product.title}</h3>
                <img
                  class="images"
                  src="${product.imageUrl}"
                  alt="${product.title}"
                />
                <div class="price">
                  <h4 class="amount">${product.price}$</h4>
                  <button class="addcart" onclick="addtocart(${product.id})">Add to Cart</button>
                  
                </div>
              </div>`;
        
      });
      parent.innerHTML = childHTML;
  })
  .catch(err=>console.log(err))
})
let purchasebtn =  document.getElementById('purchasebtn')

purchasebtn.addEventListener('click',()=>{
axios.post('http://localhost:3000/Order',{cartId:1})
.then(response=>{
  let orderId=response.data.data[0][0].orderId
  alert(`Your Order has been successfully placed with order Id ${orderId}, Thanks for Shopping`)
  getCartDetails();
  updateCartTotal()
})
})
