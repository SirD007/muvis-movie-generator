async function getGenresList() {

    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MmQyMzEzOTg2YmNhOTllYzgzZDRlMGE4NTE1NmVkZCIsInN1YiI6IjY0ZWY4NjQwNzJjMTNlMDEzOWIzMmY4MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.dipjA6spK1pg7FhNLpcKRmkj-Jw8BhAHJ1OF-Q624bw'
        }
    };

    try {
        const genreData = await fetch('https://api.themoviedb.org/3/genre/movie/list?language=en', options)
            .then(response => response.json())

        return genreData

    } catch (error) {
        console.log(error);
    }
}

async function createGenreOptionsElement() {

    const genreData = await getGenresList()

    const inputOptions = document.getElementById("genreSelect");

    genreData.genres.map(async genre => {
        const option = document.createElement("option");
        option.value = genre.id;
        option.textContent = genre.name;
        inputOptions.appendChild(option);
    });
}

createGenreOptionsElement()

function getGenreIdFromDocument() {
    var select = document.getElementById('genreSelect');
    var value = select.options[select.selectedIndex].value;
    return "&with_genres=" + value
}

async function updateGenreId(value) {
    if (value === "&with_genres=random") {
        return "";
    }
    else {
        return value
    }
}

async function getMoviesFromAPI() {

    const randomPage = () => Math.floor(Math.random() * 500)
    const randomPageResult = randomPage()

    const inputID = getGenreIdFromDocument()

    const updatedID = await updateGenreId(inputID)

    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MmQyMzEzOTg2YmNhOTllYzgzZDRlMGE4NTE1NmVkZCIsInN1YiI6IjY0ZWY4NjQwNzJjMTNlMDEzOWIzMmY4MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.dipjA6spK1pg7FhNLpcKRmkj-Jw8BhAHJ1OF-Q624bw'
        }
    };
    document.querySelector('#movies').innerHTML = `    
        <svg class="w-12 h-12 animate-spin text-white" viewBox="0 0 24 24" fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path d="M12 4.75V6.25" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"
                stroke-linejoin="round"></path>
            <path d="M17.1266 6.87347L16.0659 7.93413" stroke="currentColor" stroke-width="1.5"
                stroke-linecap="round" stroke-linejoin="round"></path>
            <path d="M19.25 12L17.75 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"
                stroke-linejoin="round"></path>
            <path d="M17.1266 17.1265L16.0659 16.0659" stroke="currentColor" stroke-width="1.5"
                stroke-linecap="round" stroke-linejoin="round"></path>
            <path d="M12 17.75V19.25" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"
                stroke-linejoin="round"></path>
            <path d="M7.9342 16.0659L6.87354 17.1265" stroke="currentColor" stroke-width="1.5"
                stroke-linecap="round" stroke-linejoin="round"></path>
            <path d="M6.25 12L4.75 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"
                stroke-linejoin="round"></path>
            <path d="M7.9342 7.93413L6.87354 6.87347" stroke="currentColor" stroke-width="1.5"
                stroke-linecap="round" stroke-linejoin="round"></path>
        </svg>`

    document.querySelector('#newMovieListBtn').innerHTML = `<div class="flex items-center justify-center gap-2 text-base font-normal leading-tight"><span class="text-white text-base font-normal leading-tight">Searching...</span><div><img class="animate-spin h-8 w-8 bg-zinc-200 rounded-full bg-opacity-25" src="src/icons/loading.svg"</div></div>`

    try {
        const randomPageResult = randomPage()
        const data = await fetch(`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${randomPageResult}&sort_by=popularity.desc${updatedID}`, options)
            .then(response => response.json())

        document.querySelector('#newMovieListBtn').innerHTML = `
        <span class="text-white text-base font-normal leading-tight">New Recomendation</span>
        <div class="w-8 h-8 relative">
            <div class="w-8 h-8 left-0 top-0 absolute opacity-20 bg-white rounded-full"></div>
            <div class="w-[18px] h-[18px] left-[7px] top-[7px] absolute"><img src="src/icons/flash.svg"
                    alt=""></div>
        </div>`
        return data
    } catch (error) {
        console.error(error);
    }


}

function createMovieLayout({
    id,
    title,
    stars,
    releaseDate,
    poster,
    duration,
}) {

    return `
    <div class="flex flex-col justify-center items-start gap-3">
    <div class="self-stretch justify-between items-center gap-0.5 inline-flex h-1">
        <span class="text-white text-lg font-medium leading-tight">${title}</span>
        <div class="items-center flex">
            <img class="" src="src/icons/star.svg" alt="">
            <div class="text-yellow-400 text-base font-semibold">${stars}</div>
        </div>
    </div>
    <div class="flex-col justify-center items-start gap-2 flex">
            <div class="w-[210px] bg-opacity-20 rounded-lg relative">
                    <img class="rounded-lg"
                    src="https://tmdb.org/t/p/w500${poster}" alt="Imagem de ${title}" />
            </div>
        <div class="self-stretch justify-between items-center gap-2 inline-flex">
            <div class="justify-start items-center gap-1 flex">
                <div class="w-5 h-5 relative"><img src="/src/icons/clock.svg" alt=""></div>
                <div class="text-zinc-400 text-xs font-normal leading-tight">${duration}</div>
            </div>
            <div class="justify-start items-center gap-1 flex">
                <div class="w-5 h-5 relative"><img src="src/icons/calendar.svg" alt=""></div>
                <div class="text-zinc-400 text-xs font-normal leading-tight">${releaseDate}</div>
            </div>
        </div>
        <button onclick="watch(event)" data-id="${id}"
            class="self-stretch px-4 py-2 bg-zinc-700 hover:bg-zinc-600 rounded justify-center items-center gap-2 inline-flex">
            <div class="w-7 h-7 relative">
                <div class="w-7 h-7 left-0 top-0 absolute bg-neutral-800 rounded-full"><img
                        src="src/icons/playBtn.svg" alt=""></div>
            </div>
            <div class="text-white text-base font-normal leading-tight">Watch Trailer</div>
        </button>
    </div>
</div>`
}

async function getMoreInformation(id) {
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MmQyMzEzOTg2YmNhOTllYzgzZDRlMGE4NTE1NmVkZCIsInN1YiI6IjY0ZWY4NjQwNzJjMTNlMDEzOWIzMmY4MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.dipjA6spK1pg7FhNLpcKRmkj-Jw8BhAHJ1OF-Q624bw'
        }
    };

    try {
        const data = await fetch('https://api.themoviedb.org/3/movie/' + id, options)
            .then(response => response.json())

        return data
    } catch (error) {
        console.log(error)
    }

}

async function watch(event) {
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MmQyMzEzOTg2YmNhOTllYzgzZDRlMGE4NTE1NmVkZCIsInN1YiI6IjY0ZWY4NjQwNzJjMTNlMDEzOWIzMmY4MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.dipjA6spK1pg7FhNLpcKRmkj-Jw8BhAHJ1OF-Q624bw'
        }
    };

    try {
        const data = await fetch(`https://api.themoviedb.org/3/movie/${event.currentTarget.dataset.id}/videos?language=en-US`, options)
            .then(response => response.json());

        const { results } = data

        const youtubeVideo = results.find(video => video.type === "Trailer")

        window.open(`https://youtube.com/watch?v=${youtubeVideo.key}`)
    } catch (error) {
        console.log(error);
        document.querySelector('#trailerErrorMsg').innerText = "Trailer unvaliable"

        setTimeout(() => {
            document.querySelector('#trailerErrorMsg').innerText = ""
        }, 3000)
    }


}

function select3videosID(results) {
    const random = () => Math.floor(Math.random() * results.length);

    let selectedVideos = new Set()
    while (selectedVideos.size < 3) {
        selectedVideos.add(results[random()].id)
    }

    return [...selectedVideos]
}

function MinuntesToHoursMinutesAndSeconds(minutes) {
    let date = new Date(null)
    date.setMinutes(minutes)
    return date.toISOString().slice(11, 19)
}

async function start() {

    const { results } = await getMoviesFromAPI()

    const best3 = select3videosID(results)

        .map(async movie => {
            const info = await getMoreInformation(movie)
            const props = {
                id: info.id,
                title: info.title.slice(0, 10) + '...',
                stars: Number(info.vote_average).toFixed(1),
                releaseDate: info.release_date.slice(0, 4),
                duration: MinuntesToHoursMinutesAndSeconds(info.runtime),
                poster: info.poster_path,
            }

            return createMovieLayout(props)
        })

    const output = await Promise.all(best3)

    document.querySelector('#movies').innerHTML = output.join('')
}

start()