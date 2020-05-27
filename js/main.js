/* <-- DOM elements --> */
const IMG_URL = 'https://image.tmdb.org/t/p/w185_and_h278_bestv2';
const APY_KEY = '556da80ca1cf477118e78c8afe561766';

const leftMenu = document.querySelector('.left-menu'),
    hamburger = document.querySelector('.hamburger'),
    tvCardImg = document.querySelectorAll('.tv-card__img'),
    tvShowsList = document.querySelector('.tv-shows__list'),
    modal = document.querySelector('.modal');


const DBService = class {
    getData = async (url) => {
        const res = await fetch(url);
        if(res.ok) {
            return res.json();
        }
        else {
            throw new Error(`Не удалось получить данные по адресу: ${url}`);
        }
    }

    getTestData = async () => {
        return await this.getData('test.json');
    }
}

const renderCard = data => {
    console.log(data);
    tvShowsList.textContent = '';

    data.results.forEach(item => {

        const {
            name: title, 
            backdrop_path: backdrop, 
            vote_average: vote, 
            poster_path: poster
        } = item;

        const card = document.createElement('li');
        card.classList.add('tv-show__item');

        const posterImg = poster ? IMG_URL + poster : '../img/no-poster.jpg';
        const backdropImg = backdrop ? IMG_URL + backdrop : '../img/no-poster.jpg';
        const voteElem = vote != 0 ? vote : '';

        card.innerHTML = `
                    <a href="#" class="tv-card">
                        <span class="tv-card__vote">${voteElem}</span>
                        <img class="tv-card__img"
                            src="${posterImg}"
                            data-backdrop="${backdropImg}"
                            alt="${title}">
                        <h4 class="tv-card__head">${title}</h4>
                    </a>`;

        tvShowsList.append(card);
    });
};

new DBService().getTestData().then(renderCard);


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

// show/hide new card image
const showHideImgCard = event => {
    const card = event.target.closest('.tv-show__item');
    
    if(card) {
        const img = card.querySelector('.tv-card__img');
        if(img.dataset.backdrop) {
            [img.src, img.dataset.backdrop] = [img.dataset.backdrop, img.src];
        }
    }
};

tvShowsList.addEventListener('mouseover', showHideImgCard);
tvShowsList.addEventListener('mouseout', showHideImgCard);
// tvCardImg.forEach(el => {
//     let backdrop = el.dataset.backdrop;
//     let src = el.src;
//     el.addEventListener('mouseover', () => {
//         if(backdrop) {
//             el.src = backdrop;
//         }
//     });
//     el.addEventListener('mouseout', () => {
//         el.src = src;
//     });
// });

//open modal
tvShowsList.addEventListener('click', event => {
    event.preventDefault();
    const target = event.target;
    const card = target.closest('.tv-card')

    if(card) {
        document.body.style.overflow = 'hidden';
        modal.classList.remove('hide');
    }
});

//close modal
modal.addEventListener('click', event => {
    if(event.target.closest('.cross') ||
        event.target.classList.contains('modal')) {
        document.body.style.overflow = '';
        modal.classList.add('hide');
    }
});