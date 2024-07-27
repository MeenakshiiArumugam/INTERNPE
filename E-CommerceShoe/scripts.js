let cart = [];
let total = 0;
let currentProduct = {};
const colors = ['Red', 'Blue', 'Green', 'Black', 'White'];

function openCartModal(product, price) {
    currentProduct = { product, price };
    document.getElementById('modal-product-name').textContent = product;
    document.getElementById('modal-product-price').textContent = `$${price.toFixed(2)}`;

    const colorsContainer = document.getElementById('modal-colors');
    colorsContainer.innerHTML = '';
    colors.forEach(color => {
        const colorButton = document.createElement('button');
        colorButton.style.backgroundColor = color.toLowerCase();
        colorButton.onclick = () => selectColor(color);
        colorsContainer.appendChild(colorButton);
    });

    document.getElementById('modal-quantity').value = 1;

    const modal = document.getElementById('cart-modal');
    modal.style.display = 'block';
}

function closeCartModal() {
    document.getElementById('cart-modal').style.display = 'none';
}

function selectColor(color) {
    currentProduct.color = color;
}

function changeQuantity(amount) {
    const quantityInput = document.getElementById('modal-quantity');
    let quantity = parseInt(quantityInput.value);
    quantity += amount;
    if (quantity < 1) quantity = 1;
    quantityInput.value = quantity;
}

function addProductToCart() {
    const quantity = parseInt(document.getElementById('modal-quantity').value);
    if (!currentProduct.color) {
        alert('Please select a color.');
        return;
    }

    cart.push({ ...currentProduct, quantity });
    total += currentProduct.price * quantity;
    displayCart();
    closeCartModal();
}

function displayCart() {
    const cartItems = document.getElementById('cart-items');
    cartItems.innerHTML = '';
    cart.forEach(item => {
        const div = document.createElement('div');
        div.textContent = `${item.product} (${item.color}) - $${item.price.toFixed(2)} x ${item.quantity}`;
        cartItems.appendChild(div);
    });
    document.getElementById('total').textContent = total.toFixed(2);
}

function checkout() {
    alert(`Thank you for your purchase! Total: $${total.toFixed(2)}`);
    cart = [];
    total = 0;
    displayCart();
}

// Close the modal when the user clicks anywhere outside of it
window.onclick = function(event) {
    const modal = document.getElementById('cart-modal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
}
