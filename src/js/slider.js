import Splide from '@splidejs/splide';


//slider
document.addEventListener('DOMContentLoaded', function () {
    var splide = new Splide('#slider', {
        perPage: 1,
    });
    splide.mount();

    var splideTransfer = new Splide('#transfers', {
        perPage: 3,
        gap: 28,
        perMove: 1,
        breakpoints: {
            575: {
                perPage:1,
                // pagination: 'slider'
            }
        }
    })
    splideTransfer.mount()

});

