const addProduct = () => {
    const productName = document.getElementById('product-name');
    const productQuantity = document.getElementById('product-quantity');
    if (!productName.value || !productQuantity.value) {
        alert('Please enter a product name and quantity');
        return;
    }
    displayProduct(productName.value, productQuantity.value);
    saveProductToLocalStorage(productName.value, productQuantity.value);
    loadProducts();
    productName.value = '';
    productQuantity.value = '';
}

const displayProduct = (name, quantity) => {
    const ul = document.getElementById('product-container');
    const li = document.createElement('div');
    li.innerHTML = `
        <div class="p-4 border border-gray-700 rounded-lg bg-gray-800 text-white">
            <p class="text-xl">Product Name: ${name}</p>
            <p class="text-lg">Product Quantity: ${quantity}</p>
            <div class="flex justify-between items-center">
                <button class="bg-red-600 text-white px-4 py-2 rounded-lg mt-4" onclick="deleteProduct('${name}')">Delete</button>
                <button class="bg-green-600 text-white px-6 py-2 rounded-lg mt-4" onclick="editProduct('${name}')">Edit</button>
    
            </div>
            
            </div>
    `;
    ul.appendChild(li);
}

const loadProducts = () => {

    let cart = {};
    const storedCart = localStorage.getItem('cart');

    if (storedCart) {
        cart = JSON.parse(storedCart);
    }
    return cart;
}


const saveProductToLocalStorage = (product, quantity) => {
    const cart = loadProducts();
    cart[product] = quantity;
    console.log(cart);
    const cartStringified = JSON.stringify(cart);
    localStorage.setItem('cart', cartStringified);
}
const displayProductsFromLocalStorage = () => {
    const savedCart = loadProducts();
    for (const product in savedCart) {
        displayProduct(product, savedCart[product]);
    }
}


const deleteProduct = (name) => {

    const cart = loadProducts();
    console.log(cart);
    delete cart[name];
    console.log(cart);
    const cartStringified = JSON.stringify(cart);
    localStorage.setItem('cart', cartStringified);
    const ul = document.getElementById('product-container');
    ul.textContent = '';
    displayProductsFromLocalStorage();
}

const editProduct = (name) => {
    const cart = loadProducts();
    const quantity = cart[name];
    const productName = document.getElementById('product-name');
    const productQuantity = document.getElementById('product-quantity');
    productName.value = name;
    productQuantity.value = quantity;
    deleteProduct(name);
}




displayProductsFromLocalStorage();