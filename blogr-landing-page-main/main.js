function a_colortoWhite() {
    this.querySelector('a').style.color = 'rgba(221, 218, 218, 0.901)';
}

function a_colortoRed() {
    this.querySelector('a').style.color = '#c41a1ade';
}


var items = document.querySelectorAll('.navbar .navbar-items .item')

items.forEach(function(item, index) {
    item.addEventListener("mouseover", function() {
        itemList = item.querySelector('.item-components')
        if (itemList != null) {
            itemList.style.display = 'block'
        }
    })
    item.addEventListener("mouseout", function() {
        itemList = item.querySelector('.item-components')
        if (itemList != null) {
            itemList.style.display = 'none'
        }
    })
})

var signUp = document.querySelector('.navbar .account .sign-up')
signUp.addEventListener("mouseover", a_colortoWhite)
signUp.addEventListener("mouseout", a_colortoRed)

var btnFre = document.querySelector('.header .premium .free')
btnFre.addEventListener("mouseover", a_colortoWhite)
btnFre.addEventListener("mouseout", a_colortoRed)

var btnBuy = document.querySelector('.header .premium .buy')
btnBuy.addEventListener("mouseout", a_colortoWhite)
btnBuy.addEventListener("mouseover", a_colortoRed)

var menu = document.querySelector('.navbar .menu')
var menuCheck = false
menu.onclick = function() {
    menubar = this.querySelector('.menu-wrapper')
    menubar.addEventListener('click', function(e) {
        e.stopPropagation();
    })
    if (menuCheck === false) {
        menuCheck = true;
        this.style.backgroundImage = 'url("./images/icon-close.svg")';
        menubar.style.display = 'flex';
    }
    else {
        menuCheck = false
        this.style.backgroundImage = 'url("./images/icon-hamburger.svg")'
        menubar.style.display = 'none'
    }
}

var menuItems = menu.querySelectorAll('.item')
menuItems.forEach(function(item, index) {
    var list = item.querySelector('.item-components')
    if (list !== null) {
        item.onclick = function() {
            if (list.style.display === 'none' || list.style.display === "") {
                list.style.display = 'flex'
                item.querySelector('p').classList.add('rotate');
                item.querySelector('p').style.color = '#403f3fa0'
            }
            else {
                list.style.display = 'none'
                item.querySelector('p').classList.remove('rotate');
                item.querySelector('p').style.color = '#333'
            }
        }
    }
})
