var a = document.getElementById("allg")
var cartCount = document.getElementById('ccou')
var c = 0


fetch("index.json")
    .then(res => res.json())
    .then(item => item.allg.map((itms) => {
        a.innerHTML += `<div class="col-lg-2 col-md-3 col-5 me-4 mt-3">
                    <div class="card" >
                    <a href="game details.html?id=${itms.id}"><img src="${itms.gimg}" alt="watch dogs" style="height: 299px; width: 100%; border-top-left-radius : 5px; border-top-right-radius: 5px;"></a>
                    <div class="gname"><a href="game details.html?id=${itms.id}" style="text-decoration: none; color: black;">${itms.gname}</a></div><hr>
                    <div class="row p-1" style="display: flex; justify-content: center; margin-top: -10px;">
                        <div class="col-lg-3 col-md-5 dis" id="disc">${itms.disc}</div>
                        <div class="col-lg-4 col-md-6 apri" id="aprice">₹${itms.apri}</div>
                        <div class="col-lg-4 fpri" id="fprice">₹${itms.fpri}</div>
                    </div>
                    <div class="row ms-2 mb-2">
                        <div class="col-lg-10 col-md-9" onclick="addtocart('${itms.gname}','${itms.gimg}','${itms.fpri}')"><button type="button" class="atc"><i class="fa-solid fa-cart-shopping cartbut"></i> Add To Cart</button></div>
                        <div class="col-lg-2 col-md-3" onclick="likebtn(event)"><button type="button"  class="lbtn" ><i class="fa-regular fa-heart heart"></i></button></div>
                    </div>
                </div>
                </div>`
}))

function search() {
    var se = document.getElementById('ibox');
    var frow = document.getElementById("frow");
    var notf = document.getElementById("gnf");

    fetch("index.json")
    .then(res => res.json())
    .then(item => {
        // Clear previous results
        frow.innerHTML = "";

        // Filter items based on search input
        let filt = item.allg.filter((itms) =>
            itms.gname.toLowerCase().includes(se.value.toLowerCase())
        );
        console.log(filt.length);
        if (filt.length==0) {
            a.style.display="none"
            frow.style.display="none"
            notf.style.display="flex"
        }
        else{
            a.style.display="none"
            frow.style.display="flex"
            notf.style.display="none"
        }
        

        // Map through the filtered items and display them
        filt.map((itms) => {
            frow.innerHTML += `<div class="col-lg-2 col-md-3 col-5 me-4 mt-3">
                <div class="card">
                    <a href="game details.html?id=${itms.id}">
                        <img src="${itms.gimg}" alt="${itms.gname}" style="height: 299px; width: 100%; border-top-left-radius : 5px; border-top-right-radius: 5px;">
                    </a>
                    <div class="gname">
                        <a href="game details.html?id=${itms.id}" style="text-decoration: none; color: black;">${itms.gname}</a>
                    </div><hr>
                    <div class="row p-1" style="display: flex; justify-content: center; margin-top: -10px;">
                        <div class="col-lg-3 col-md-5 dis" id="disc">${itms.disc}</div>
                        <div class="col-lg-4 col-md-6 apri" id="aprice">₹${itms.apri}</div>
                        <div class="col-lg-4 fpri" id="fprice">₹${itms.fpri}</div>
                    </div>
                    <div class="row ms-2 mb-2">
                        <div class="col-lg-10 col-md-9" onclick="addtocart('${itms.gname}','${itms.gimg}','${itms.fpri}')">
                            <button type="button" class="atc"><i class="fa-solid fa-cart-shopping"></i> Add To Cart</button>
                        </div>
                        <div class="col-lg-2 col-md-3" onclick="likebtn(event)">
                            <button type="button" class="lbtn"><i class="fa-regular fa-heart heart"></i></button>
                        </div>
                    </div>
                </div>
            </div>`;
            a.style.display="none"
        });
    })
}



function likebtn(event) {

    c = c + 1
    if (c % 2 != 0) {
        event.target.innerHTML = `<button type="button" class="lbtn" ><i class="fa-solid fa-heart sheart"></i></button>`

    } else {
        event.target.innerHTML = `<button type="button" class="lbtn" ><i class="fa-regular fa-heart heart"></i></button>`
    }
}



function addtocart(gamen, gimage, price) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const itemExists = cart.some(item => item.gamen === gamen);

    if (itemExists) {//if already in cart
        //console.error("Item with id found in cart.");
        alert(gamen + " is already in Cart")
        return;
    }

    cart.push({ gamen, price, gimage });
    localStorage.setItem('cart', JSON.stringify(cart));
    cartCount.innerText = cart.length;      //cart item count
}

//cart item count
let cart = JSON.parse(localStorage.getItem('cart')) || [];
cartCount.innerText = cart.length;