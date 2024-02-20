/*Variables*/
const apiKey = '8hUavtoIe5mycWGkMu2vC5TVUn8_DoNcnQNms7CKB90'
const formEl = document.querySelector('.search-form');
const inputEl = document.querySelector('.search-input');
const searchBtnEl = document.querySelector('.search-btn');
const resultEl = document.querySelector('.results');
const boxEl = document.querySelector('.image-box');
const showMore = document.querySelector('.show-more');
let loading = false;

let input_data = '';
let page = 1;
let limit = 20;

async function search() {
    loading = true;
    input_data = inputEl.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&limit=${limit}&query=${input_data}&client_id=${apiKey}`
    const response = await fetch(url);
    const data = await response.json();
    loading = false;
    const results = data.results;

    results.map((result) => {
        /*Creating main image box*/
        const imageWrapper = document.createElement('div')
        imageWrapper.classList.add('image-box');

        /*Creating image cover box*/
        const imageCover = document.createElement('div')
        imageCover.classList.add('image-cover')

        /*Assigning image here*/
        const image = document.createElement('img');
        image.src = result.urls.small;
        image.alt = result.alt_description;

        /*Creating a tag/ description*/
        const imageLink = document.createElement('a');
        const spanTag = document.createElement('span')
        imageLink.href = result.links.html;
        imageLink.target = '_blank';
        spanTag.textContent = result.alt_description;

        const downloadBtn = document.createElement('button')
        downloadBtn.innerHTML = 'Download'
        downloadBtn.classList.add('btn')
        downloadBtn.classList.add('btn-outline-dark')
        /*Appending here*/
        imageWrapper.appendChild(imageCover);
        imageCover.appendChild(image);
        imageWrapper.appendChild(imageLink);
        imageLink.appendChild(spanTag);
        imageWrapper.appendChild(downloadBtn);
        resultEl.appendChild(imageWrapper);
    })
    page++
    if (page > 1) {
        showMore.style.display = 'inline-block'
    }
    if (results.length === 0) {
        showMore.style.display = 'none'
    }
}


formEl.addEventListener('submit', (event) => {
    event.preventDefault();
    resultEl.replaceChildren()
    page = 1;
    search();
})

showMore.addEventListener('click', () => {
    search();
})