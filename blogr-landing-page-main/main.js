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
signUp.addEventListener("mouseover", function() {
    signUp.querySelector('p').style.color = 'rgba(221, 218, 218, 0.901)';
})
signUp.addEventListener("mouseout", function() {
    signUp.querySelector('p').style.color = '#c41a1ade';
})

var btnFre = document.querySelector('.header .premium .free')
btnFre.addEventListener("mouseover", function() {
    btnFre.querySelector('a').style.color = 'rgba(221, 218, 218, 0.901)';
})
btnFre.addEventListener("mouseout", function() {
    btnFre.querySelector('a').style.color = '#c41a1ade';
})

var btnBuy = document.querySelector('.header .premium .buy')
btnBuy.addEventListener("mouseout", function() {
    btnBuy.querySelector('a').style.color = 'rgba(221, 218, 218, 0.901)';
})
btnBuy.addEventListener("mouseover", function() {
    btnBuy.querySelector('a').style.color = '#c41a1ade';
})