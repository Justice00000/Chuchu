function displayCartItems() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const orderSummary = document.getElementById('order-summary');
    orderSummary.innerHTML = '';

    if (cart.length === 0) {
        orderSummary.innerHTML = '<p>Your cart is empty.</p>';
        return;
    }

    cart.forEach(item => {
        orderSummary.innerHTML += `
            <p>${item.name} - ₵${(item.price / 100).toFixed(2)}</p>
        `;
    });

    const totalPrice = cart.reduce((total, item) => total + item.price, 0);
    orderSummary.innerHTML += `
        <p>Subtotal: ₵${(totalPrice / 100).toFixed(2)}</p>
        <p>Total: ₵${(totalPrice / 100).toFixed(2)}</p>
    `;
}

function checkout() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const totalPrice = cart.reduce((total, item) => total + item.price, 0);

    if (cart.length === 0) {
        alert('Your cart is empty.');
        return;
    }

    // Validate required fields
    const firstName = document.getElementById('first-name').value;
    const lastName = document.getElementById('last-name').value;
    const customerEmail = document.getElementById('customer-email').value;
    const phone = document.getElementById('phone').value;
    const streetAddress = document.getElementById('street-address').value;
    const townCity = document.getElementById('town-city').value;
    const region = document.getElementById('region').value;

    if (!firstName || !lastName || !customerEmail || !phone || !streetAddress || !townCity || !region) {
        alert('Please fill out all required fields.');
        return;
    }

    PaystackPop.setup({
        key: 'pk_test_cd86d8d31105dfe8686ff836fe2953faa83cb979', // Replace with your Paystack public key
        email: customerEmail,
        amount: totalPrice,
        currency: 'NGN', // Use 'GHS' for Ghanaian Cedi
        ref: '' + Math.floor((Math.random() * 1000000000) + 1),
        metadata: {
            custom_fields: [
                { display_name: "Customer Name", variable_name: "customer_name", value: `${firstName} ${lastName}` },
                { display_name: "Phone", variable_name: "phone", value: phone },
                { display_name: "Street Address", variable_name: "street_address", value: streetAddress },
                { display_name: "Town/City", variable_name: "town_city", value: townCity },
                { display_name: "Region", variable_name: "region", value: region }
            ]
        },
        callback: function (response) {
            alert('Payment complete! Reference: ' + response.reference);
            // Clear cart after successful payment
            localStorage.removeItem('cart');
            displayCartItems(); // Update the displayed cart items
        },
        onClose: function () {
            alert('Payment window closed.');
        }
    }).openIframe();
}

document.addEventListener('DOMContentLoaded', displayCartItems);
