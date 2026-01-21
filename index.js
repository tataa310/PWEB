let cart = [];  // Menyimpan item yang dipilih
let totalPrice = 0;  // Total harga
let shippingOption = '';  // Pilihan pengiriman

// Fungsi untuk menambahkan item ke keranjang
function addToCart(itemName, itemPrice) {
    // Menambahkan item ke keranjang
    cart.push({ name: itemName, price: itemPrice });

    // Menambahkan harga item ke total
    totalPrice += itemPrice;

    // Update tampilan keranjang
    updateCartDisplay();
}

// Fungsi untuk menampilkan keranjang
function updateCartDisplay() {
    const cartItemsElement = document.getElementById('cart-items');
    const totalPriceElement = document.getElementById('total-price');

    // Clear item keranjang
    cartItemsElement.innerHTML = '';

    // Menambahkan item ke dalam list keranjang
    cart.forEach(item => {
        const listItem = document.createElement('li');
        listItem.textContent = `${item.name} - Rp${item.price}`;
        cartItemsElement.appendChild(listItem);
    });

    // Menampilkan total harga
    totalPriceElement.textContent = totalPrice;
}

// Fungsi untuk menampilkan modal checkout
function showCheckoutModal() {
    // Menampilkan modal
    document.getElementById('checkout-modal').style.display = 'block';

    // Menampilkan rincian keranjang
    const modalCartItemsElement = document.getElementById('modal-cart-items');
    modalCartItemsElement.innerHTML = '';
    cart.forEach(item => {
        const listItem = document.createElement('li');
        listItem.textContent = `${item.name} - Rp${item.price}`;
        modalCartItemsElement.appendChild(listItem);
    });

    // Menampilkan total harga di modal
    document.getElementById('modal-total-price').textContent = totalPrice;

    // Menyembunyikan pilihan pengiriman terlebih dahulu
    document.querySelector('.shipping-options').style.display = 'block';
    document.getElementById('shipping-message').style.display = 'block';
}

// Fungsi untuk memilih metode pengiriman
function selectShipping(option) {
    shippingOption = option;

    // Menandai tombol yang dipilih
    const buttons = document.querySelectorAll('.shipping-button');
    buttons.forEach(button => button.classList.remove('active'));

    if (option === 'Ambil Sendiri') {
        document.getElementById('pickup-btn').classList.add('active');
    } else {
        document.getElementById('delivery-btn').classList.add('active');
    }

    // Menampilkan pesan pengiriman yang dipilih
    document.getElementById('shipping-message').textContent = `Pengiriman: ${option}`;
}

// Fungsi untuk menutup modal
function closeModal() {
    // Menutup modal
    document.getElementById('checkout-modal').style.display = 'none';
}

// Fungsi untuk konfirmasi pembayaran dan selesai
function completeCheckout() {
    if (shippingOption === '') {
        alert('Silakan pilih metode pengiriman terlebih dahulu!');
        return;
    }

    const orderSummary = `Terima kasih atas pesanan Anda!\n\nTotal: Rp${totalPrice}\nMetode Pengiriman: ${shippingOption}`;

    // Menampilkan konfirmasi pesanan
    alert(orderSummary);

    // Reset keranjang setelah pesanan selesai
    cart = [];
    totalPrice = 0;
    updateCartDisplay();

    // Menutup modal setelah konfirmasi
    closeModal();
}
