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
            }
        }
    })
    splideTransfer.mount()

    var splideHistory = new Splide('#history', {
        perPage: 3,
        gap: 28,
        perMove: 1,
        breakpoints: {
            991: {
                perPage:2,
            },
            768: {
                perPage:1,
            }
        }
    })
    splideHistory.mount()

    var splideRating = new Splide('#rating', {
        perPage: 4,
        gap: 18,
        perMove: 1,
        breakpoints: {
            991: {
                perPage:3,
            },
            768: {
                perPage:2,
            },
            575: {
                perPage:1,
            }
        }
    })
    splideRating.mount()
});


