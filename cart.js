var cartCount = document.getElementById('ccou');
var cobox = document.getElementById("cbox")
var cobtn = document.getElementById("cbtn")
var ccode = ""
var number = 1
var min = document.getElementById("minus")
var plus = document.getElementById("plus")
let subtotal = 0;
var newsubtotal
let gtot = 0
// var num=document.getElementById("numb")


//cart item count
let cart = JSON.parse(localStorage.getItem('cart')) || [];
cartCount.innerText = cart.length;

function loadcartitems() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let cartItemsDiv = document.getElementById('ccon');
    subtotal = 0; // Reset subtotal

    if (cart.length === 0) {
        cartItemsDiv.innerHTML = `<p style="font-size: 30px; font-weight: 600;">Your cart is empty.<a href="index.html" style="font-size: 20px; font-weight: 600;">Back to Home</a></p>`;
        document.getElementById("gtot").innerText = "₹0";
        document.getElementById("stot").innerText = "₹0";
    } else {
        cartItemsDiv.innerHTML = ''; // Clear the cart display before appending items
        cart.forEach((item, index) => {
            // Set default quantity if not already set
            if (!item.quantity) {
                item.quantity = 1;
            }

            cartItemsDiv.innerHTML += `<div class="row mb-3" style="display: flex; justify-content: center; border: 1px solid; border-radius: 4px;">
                <div class="col-lg-3" style="height: 200px;"><img src="${item.gimage}" alt="gpic" width="100%" height="100%"></div>
                <div class="col-lg-8">
                    <h3 class="ms-3">${item.gamen}</h3>
                    <div class="row mt-5">
                        <div class="col-lg-8 ps-3"><div style="font-size: 28px; font-weight: 500;">₹${item.price}</div></div>
                        <div class="col-lg-4" style="display: flex; justify-content: center; align-items: center;">
                            <span class="min" onclick="minitem(${index}, ${item.price})"><i class="fa-solid fa-minus"></i></span>
                            <span class="num" id="numb-${index}">${item.quantity}</span>
                            <span class="plus" onclick="additem(${index}, ${item.price})"><i class="fa-solid fa-plus"></i></span>
                            <span class="del" onclick="clos('${item.gamen}')"><i class="fa-solid fa-trash-can"></i></span></div>
                    </div>
                </div>
            </div>`;
            subtotal += item.price * item.quantity;
        });
        document.getElementById('gtot').innerText = "₹" + subtotal;
        document.getElementById('stot').innerText = "₹" + subtotal;
        newsubtotal = subtotal;

        // Save the updated cart with quantities back to localStorage
        localStorage.setItem('cart', JSON.stringify(cart));
    }
}

function additem(index, subtot) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (cart[index].quantity < 5) {
        cart[index].quantity += 1;
        newsubtotal += subtot;
        document.getElementById('numb-' + index).innerText = cart[index].quantity;
        document.getElementById('stot').innerText = "₹" + newsubtotal;
        document.getElementById('gtot').innerText = "₹" + newsubtotal;
    } else {
        alert("You can add a maximum of 5 quantities to your cart");
    }

    // Save updated cart
    localStorage.setItem('cart', JSON.stringify(cart));
}

function minitem(index, subtot) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (cart[index].quantity > 1) {
        cart[index].quantity -= 1;
        newsubtotal -= subtot;
        document.getElementById('numb-' + index).innerText = cart[index].quantity;
        document.getElementById('stot').innerText = "₹" + newsubtotal;
        document.getElementById('gtot').innerText = "₹" + newsubtotal;
    }

    // Save updated cart
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Coupon code check (remains unchanged)
cobtn.addEventListener("click", () => {
    // Get the cart from localStorage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    if (cart.length === 0) {
        alert("Your cart is empty. Please add items to your cart before applying a coupon.");
    } else {
        ccode = cobox.value;

        if (ccode === "PAN20") {
            gtot = newsubtotal - (newsubtotal * 0.20);
            document.getElementById("csux").style.display = "flex";
            document.getElementById("cusx").style.display = "none";
            document.getElementById('gtot').innerText = "₹" + gtot;
        } else {
            document.getElementById("csux").style.display = "none";
            document.getElementById("cusx").style.display = "flex";
            document.getElementById('gtot').innerText = "₹" + newsubtotal;
        }
    }
});

function completeOrder() {
    // Get the cart from localStorage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Check if the cart is empty
    if (cart.length === 0) {
        alert("Your cart is empty. Please add items to your cart before placing an order.");
    } else {
        // Clear the cart from localStorage
        localStorage.removeItem('cart');

        // Show the success message
        alert("Order is successfully placed");
        location.reload();
    }
}



function clos(gamn) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart = cart.filter(item => item.gamen !== gamn);
    localStorage.setItem('cart', JSON.stringify(cart));
    cartCount.innerText = cart.length;
    location.reload(); // Reload to update the UI
}

window.onload = loadcartitems();
