import Splide from '@splidejs/splide';


//slider
document.addEventListener('DOMContentLoaded', function () {
    var splide = new Splide('#slider', {
        perPage: 1,
    });
    splide.mount();

    var splideTransfer = new Splide('#transfers', {
        perPage: 3,
        gap: 30,
        perMove: 1
    })
    splideTransfer.mount()

});

