const root=document.querySelector('#root')
const categories=document.getElementById('categories')
const products=document.getElementById('products')
const cartCount=document.getElementById('cartCount')

const url='https://fakestoreapi.com/products/'

async function getShop(){
    const res=await fetch(url)
    const data= await res.json()

    console.log(data);
    showShop(data)
    showProducts(data)
}
getShop()

function showShop(arr){
    let newCategories=[]

    const categoriesFilter=arr.filter(el=>{
        console.log(el);
        if(el.category.name && !newCategories.includes(el.category.name)){
            newCategories.push(el.category.name)
        }
    })
    
    console.log(newCategories);

    categories.innerHTML=''
    for (const name of newCategories) {
        categories.innerHTML+=`<li>${name}</li>`
    }
}

function showProducts(arr){
    products.innerHTML=''
    for (const product of arr) {
        products.innerHTML+=`
        <div onclick='getItemById(${product.id})' class="card" style="width: 18rem; ">
        <img class="card-img-top" src="${product.image}" alt="Card image cap">
        <div class="card-body">
          <h5 class="card-title">${product.title}</h5>
          <p class="card-text">${product.category}</p>
          <h6>${product.price}$</h6>
        </div>
      </div>
        `
    }
}


async function getItemById(id){
    const res=await fetch(url+id)
    const data= await res.json()
    console.log(data);
    showOneCard(data)
}
getItemById()

function showOneCard(obj){
    
        products.innerHTML=''
        products.innerHTML+=`
        <div  class="card" style="width: 230px; ">
        <img class="card-img-top" src="${obj.image}" alt="Card image cap">
        <div class="card-body">
          <h5 class="card-title">${obj.title}</h5>
          <p class="card-text">${obj.description}</p>
          <h4>${obj.price}$</h4>
          <a href="#" onclick='addItemToCard(${obj.id})' class="btn btn-primary">Dabavit v korzinu</a>
        </div>
      </div>
        `
}

let arrCart=[]

async function addItemToCard(id){
    const res=await fetch(url+id)
    const data= await res.json()
   
    console.log(data);
    arrCart.push(data)
    const cartData=JSON.stringify(arrCart)
    localStorage.setItem('cart', cartData)
    getItemFromCart()
    cartCount.innerHTML=arrCart.length
}


async function addItemToCard(id) {
    const isItemInCart = arrCart.some(item => item.id === id);

    if (!isItemInCart) {
        const res = await fetch(url + id);
        const data = await res.json();
   
        console.log(data);
        arrCart.push(data);
        const cartData = JSON.stringify(arrCart);
        localStorage.setItem('cart', cartData);
        cartCount.innerHTML = arrCart.length;
        getItemFromCart()

    } else {
        console.log('Этот товар уже добавлен');
    }
}

function getItemFromCart(){
    const data=JSON.parse(localStorage.getItem('cart'))
    console.log(data, 'localStorage');
    arrCart=data
}
getItemFromCart()


