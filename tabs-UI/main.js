const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const tabs = $$('.tab-item');
const panes = $$('.tab-pane');

const tabline = $('.tabs .line');
tabline.style.width = tabs[0].offsetWidth + 'px';
tabline.style.left = tabs[0].offsetLeft + 'px';

tabs.forEach((tab, index) => {
    const pane = panes[index];  
    tab.onclick = function() {
        $('.tab-item.active').classList.remove('active');
        $('.tab-pane.active').classList.remove('active');
        tabline.style.width = this.offsetWidth + 'px';
        tabline.style.left = this.offsetLeft + 'px';
        this.classList.add('active');
        pane.classList.add('active');
    }
});