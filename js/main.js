// DOM elements
const leftMenu = document.querySelector('.left-menu'),
    hamburger = document.querySelector('.hamburger'),
    tvCardImg = document.querySelectorAll('.tv-card__img');


/* <-- listeners --> */
// show left menu
hamburger.addEventListener('click', () => {
    leftMenu.classList.toggle('openMenu');
    hamburger.classList.toggle('open');
});

// hide left menu
document.addEventListener('click', event => {
    if(!event.target.closest('.left-menu')) {
        leftMenu.classList.remove('openMenu');
        hamburger.classList.remove('open');
    }
});

// show dropdown
leftMenu.addEventListener('click', event => {
    const target = event.target;
    const dropdown = target.closest('.dropdown');

    if(dropdown) {
        dropdown.classList.toggle('active');
        leftMenu.classList.add('openMenu');
        hamburger.classList.add('open');
    }
});

// show new card image
tvCardImg.forEach(el => {
    let backdrop = el.dataset.backdrop;
    let src = el.src;
    el.addEventListener('mouseover', () => {
        el.src = backdrop;
    });
    el.addEventListener('mouseout', () => {
        el.src = src;
    });
});