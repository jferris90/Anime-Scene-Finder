const inputField = document.getElementById("input-field"); //Assuming this exists in your html
const form = document.getElementById("search-form"); // Assuming you have a form
const animeTitleEl = document.querySelector(`.anime__title`);
const animeEpisodeEl = document.querySelector(`.anime__episode`);
const animeTimeEl = document.querySelector(`.anime__time`);
const animeImageEl = document.querySelector(`.anime__image`);
const animeListEl = document.querySelector(`.anime-list`);
let animeListArr = [];

let isSearchModalOpen = false;
let isResultsModalOpen = false;

function toggleSearchModal() {
    if (isSearchModalOpen) {
        isSearchModalOpen = false;
        return document.body.classList.remove("search__modal--open");
    }
    isSearchModalOpen = true;
    document.body.classList += " search__modal--open";
}

function toggleResultsModal() {
    if (isResultsModalOpen) {
        isResultsModalOpen = false;
        return document.body.classList.remove("results__modal--open");
    }
    isResultsModalOpen = true;
    document.body.classList += " results__modal--open";
}

// Function to check if a URL is valid (basic check)
function isValidURL(string) {
    try {
        new URL(string);
        return true;
    } catch (_) {
        return false;
    }
}

async function getResults(event) {
    event.preventDefault();
    let inputURL = inputField.value;
    let file = document.querySelector('input[type="file"]').files[0];

    if (!inputURL && !file) {
        alert("Please enter an image URL or choose an image file.");
        return;
    }

    if (inputURL && !isValidURL(inputURL)) {
        alert("Please enter a valid image URL.");
        return;
    }
    let data;

    if(inputURL) {
        data = await fetch(`https://api.trace.moe/search?url=${encodeURIComponent(inputURL)}`,{
            method:'GET',
        }).then((response) => {
            if(!response.ok){
                alert('error, invalid request')
            }
            return response.json()
        });
    }
    else {
        const formData = new FormData();
        formData.append('image', file);
        data = await fetch('https://api.trace.moe/search', {
            method: 'POST',
            body: formData
        }).then(response => {
            if(!response.ok){
                alert('error, invalid request')
            }
            return response.json()
        })
    }

    const results = data.result;

    console.log(results);

    // let sortTimeStamp = results.sort((a, b) => a.from - b.from);
    // console.log(sortTimeStamp);

    animeListEl.innerHTML = results.map(post => postAnime(post)).join('');

    // let bestResult = results[0];

    // const title = bestResult.filename;
    // const episode = bestResult.episode;
    // const time = bestResult.from;
    // const animeImage = bestResult.image;

    // console.log(results);

    // document.getElementById("anime__image").src += `${animeImage}`;

    // let episodeTime = timeFormatting(time);


    // // animeImageEl.src += `${animeImage}`;
    // animeTitleEl.innerHTML += ` ${title}`;
    // animeEpisodeEl.innerHTML += ` ${episode}`;
    // animeTimeEl.innerHTML += ` ${episodeTime}`;
}

function timeFormatting(duration) {
    const hrs = ~~(duration / 3600)
    const mins = ~~((duration % 3600) / 60);
    const secs = ~~duration % 60;

    let ret = "";

    if (hrs > 0) {
        ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
      }
    
      ret += "" + mins + ":" + (secs < 10 ? "0" : "");
      ret += "" + secs;
    
      return ret;
}

async function sortByTimestamp(event) {
    // event.preventDefault();
    let inputURL = inputField.value;
    let file = document.querySelector('input[type="file"]').files[0];

    if (!inputURL && !file) {
        alert("Please enter an image URL or choose an image file.");
        return;
    }

    if (inputURL && !isValidURL(inputURL)) {
        alert("Please enter a valid image URL.");
        return;
    }
    let data;

    if(inputURL) {
        data = await fetch(`https://api.trace.moe/search?url=${encodeURIComponent(inputURL)}`,{
            method:'GET',
        }).then((response) => {
            if(!response.ok){
                alert('error, invalid request')
            }
            return response.json()
        });
    }
    else {
        const formData = new FormData();
        formData.append('image', file);
        data = await fetch('https://api.trace.moe/search', {
            method: 'POST',
            body: formData
        }).then(response => {
            if(!response.ok){
                alert('error, invalid request')
            }
            return response.json()
        })
    }

    const results = data.result;

    results.sort((a, b) => a.from - b.from);
    // console.log(sortTimeStamp);

    animeListEl.innerHTML = results.map(post => postAnime(post)).join('');
}

async function sortByEpisode(event) {
    // event.preventDefault();
    let inputURL = inputField.value;
    let file = document.querySelector('input[type="file"]').files[0];

    if (!inputURL && !file) {
        alert("Please enter an image URL or choose an image file.");
        return;
    }

    if (inputURL && !isValidURL(inputURL)) {
        alert("Please enter a valid image URL.");
        return;
    }
    let data;

    if(inputURL) {
        data = await fetch(`https://api.trace.moe/search?url=${encodeURIComponent(inputURL)}`,{
            method:'GET',
        }).then((response) => {
            if(!response.ok){
                alert('error, invalid request')
            }
            return response.json()
        });
    }
    else {
        const formData = new FormData();
        formData.append('image', file);
        data = await fetch('https://api.trace.moe/search', {
            method: 'POST',
            body: formData
        }).then(response => {
            if(!response.ok){
                alert('error, invalid request')
            }
            return response.json()
        })
    }

    const results = data.result;

    results.sort((a, b) => a.episode - b.episode);
    // console.log(sortTimeStamp);

    animeListEl.innerHTML = results.map(post => postAnime(post)).join('');
}

async function sortByLeastLikely(event) {
    // event.preventDefault();
    let inputURL = inputField.value;
    let file = document.querySelector('input[type="file"]').files[0];

    if (!inputURL && !file) {
        alert("Please enter an image URL or choose an image file.");
        return;
    }

    if (inputURL && !isValidURL(inputURL)) {
        alert("Please enter a valid image URL.");
        return;
    }
    let data;

    if(inputURL) {
        data = await fetch(`https://api.trace.moe/search?url=${encodeURIComponent(inputURL)}`,{
            method:'GET',
        }).then((response) => {
            if(!response.ok){
                alert('error, invalid request')
            }
            return response.json()
        });
    }
    else {
        const formData = new FormData();
        formData.append('image', file);
        data = await fetch('https://api.trace.moe/search', {
            method: 'POST',
            body: formData
        }).then(response => {
            if(!response.ok){
                alert('error, invalid request')
            }
            return response.json()
        })
    }

    const results = data.result;

    results.sort((a, b) => a.similarity - b.similarity);
    // console.log(sortTimeStamp);

    animeListEl.innerHTML = results.map(post => postAnime(post)).join('');
}

async function sortByMostLikely(event) {
    // event.preventDefault();
    let inputURL = inputField.value;
    let file = document.querySelector('input[type="file"]').files[0];

    if (!inputURL && !file) {
        alert("Please enter an image URL or choose an image file.");
        return;
    }

    if (inputURL && !isValidURL(inputURL)) {
        alert("Please enter a valid image URL.");
        return;
    }
    let data;

    if(inputURL) {
        data = await fetch(`https://api.trace.moe/search?url=${encodeURIComponent(inputURL)}`,{
            method:'GET',
        }).then((response) => {
            if(!response.ok){
                alert('error, invalid request')
            }
            return response.json()
        });
    }
    else {
        const formData = new FormData();
        formData.append('image', file);
        data = await fetch('https://api.trace.moe/search', {
            method: 'POST',
            body: formData
        }).then(response => {
            if(!response.ok){
                alert('error, invalid request')
            }
            return response.json()
        })
    }

    const results = data.result;

    results.sort((a, b) => b.similarity - a.similarity);
    // console.log(sortTimeStamp);

    animeListEl.innerHTML = results.map(post => postAnime(post)).join('');
}

function postAnime(post) {
    let episodeTime = timeFormatting(post.from);
    return `
        <div class="anime">
            <div class="anime__title">
                Anime Title: ${post.filename}
            </div>
            <div class="anime__episode">
                Episode #: ${post.episode}
            </div>
            <div class="anime__time">
                Timestamp: ${episodeTime}
            </div>
        </div>
    `
}

console.log(animeListArr);

// Attach event listener to the form
form.addEventListener("submit", getResults);



// async function getResults(event) {
//     event.preventDefault();
//     let inputURL = inputField.value;
//     let file = document.querySelector('input[type="file"]').files[0];

//     if (!inputURL && !file) {
//         alert("Please enter an image URL or choose an image file.");
//         return;
//     }

//     if (inputURL && !isValidURL(inputURL)) {
//         alert("Please enter a valid image URL.");
//         return;
//     }
//     let data;

//     if(inputURL) {
//         data = await fetch(`https://api.trace.moe/search?url=${encodeURIComponent(inputURL)}`,{
//             method:'GET',
//         }).then((response) => {
//             if(!response.ok){
//                 alert('error, invalid request')
//             }
//             return response.json()
//         });
//     }
//     else {
//         const formData = new FormData();
//         formData.append('image', file);
//         data = await fetch('https://api.trace.moe/search', {
//             method: 'POST',
//             body: formData
//         }).then(response => {
//             if(!response.ok){
//                 alert('error, invalid request')
//             }
//             return response.json()
//         })
//     }

//     const results = data.result;

//     let bestResult = results[0];

//     const title = bestResult.filename;
//     const episode = bestResult.episode;
//     const time = bestResult.from;
//     const animeImage = bestResult.image;

//     console.log(results);

//     document.getElementById("anime__image").src += `${animeImage}`;

//     let episodeTime = timeFormatting(time);


//     // animeImageEl.src += `${animeImage}`;
//     animeTitleEl.innerHTML += ` ${title}`;
//     animeEpisodeEl.innerHTML += ` ${episode}`;
//     animeTimeEl.innerHTML += ` ${episodeTime}`;
//     // console.log(bestResult);
//     // console.log(title);
//     // console.log(episode);
//     // console.log(episodeTime);
// }