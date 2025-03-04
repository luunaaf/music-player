let title = document.querySelector(".title");
let artist = document.querySelector(".artist");
let art = document.querySelector(".art");

let play = document.querySelector(".play");
let next = document.querySelector(".next");
let previous = document.querySelector(".previous");

let curr_time = document.querySelector(".current-time");
let total_duration = document.querySelector(".total-duration");

let index = 0;
let isPlaying = false;
let updateTimer;

let playlist = [
    { name: "LOTO", artist: "rusowsky", image: "https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/53/50/3d/53503d1d-fa48-f1e7-147b-b2783288131f/196922602917.jpg/600x600bf-60.jpg", path: "tracks/LOTO.mp3" },
    { name: "VOYCONTODO", artist: "Ralphie Choo", image: "https://images.genius.com/ec27746598f58c5bf3ccd239db864a75.1000x1000x1.png", path: "tracks/VOYCONTODO.mp3" },
    { name: "zarcillos de plata", artist: "Judeline", image: "https://cdn-images.dzcdn.net/images/cover/e045aacae62898d02e49c14f7cac81f8/0x1900-000000-80-0-0.jpg", path: "tracks/zarcillos de plata.mp3" },
];


let song = document.createElement('audio');

function resetValues() {
    curr_time.textContent = "00:00";
    total_duration.textContent = "00:00";
}

function playPause() {
    if (!isPlaying) {
        song.pause();
        isPlaying = false;
        play.src = "images/pause.png";
    } else {
        song.play();
        isPlaying = true;
        play.src = "images/play.png";
    }
}

function loadTrack(index) {
    clearInterval(updateTimer);
    resetValues();
    song.src = playlist[index].path;
    song.load();
    art.style.backgroundImage =
        "url(" + playlist[index].image + ")";
    title.textContent = playlist[index].name;
    artist.textContent = playlist[index].artist;
    updateTimer = setInterval(seekUpdate, 1000);
    song.addEventListener("ended", nextTrack);
}

loadTrack(0);