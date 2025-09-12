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
