let title = document.querySelector(".title");
let artist = document.querySelector(".artist");
let art = document.querySelector(".track-art");

let play = document.querySelector(".play");
let next = document.querySelector(".next");
let previous = document.querySelector(".previous");
let progressBar = document.querySelector(".duration-bar-progress")

let curr_time = document.querySelector(".current-time");
let total_duration = document.querySelector(".total-duration");

let index = 0;
let isPlaying = false;
let updateTimer;

let playlist = [
    { name: "LOTO", artist: "rusowsky", image: "https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/53/50/3d/53503d1d-fa48-f1e7-147b-b2783288131f/196922602917.jpg/600x600bf-60.jpg", path: "tracks/LOTO.mp3" },
    { name: "VOYCONTODO", artist: "Ralphie Choo", image: "https://images.genius.com/ec27746598f58c5bf3ccd239db864a75.1000x1000x1.png", path: "tracks/VOYCONTODO.mp3" },
    { name: "zarcillos de plata", artist: "Judeline", image: "https://cdn-images.dzcdn.net/images/cover/e045aacae62898d02e49c14f7cac81f8/0x1900-000000-80-0-0.jpg", path: "tracks/zarcillos de plata.mp3" },
    { name: "CHIRI", artist: "ROSALÍA", image: "https://i.scdn.co/image/ab67616d0000b2730c179967a265de0fc76382fe", path: "tracks/CHIRI.mp3" },
    { name: "COMO UN G", artist: "ROSALÍA", image: "https://i.scdn.co/image/ab67616d0000b2730c179967a265de0fc76382fe", path: "tracks/COMO UN G.mp3" },
    { name: "INRI", artist: "Judeline", image: "https://cdn-images.dzcdn.net/images/cover/40c58ff9e5b40a87449f1e98690f2f1b/0x1900-000000-80-0-0.jpg", path: "tracks/INRI.mp3" },
    { name: "Ni soy santo", artist: "Dellafuente", image: "https://www.mondosonoro.com/wp-content/uploads/2023/04/dellafuente-lagrimas-.jpg", path: "tracks/Ni soy santo.mp3" },
];

let song = document.createElement('audio');
let songDuration = 0;
let seekProgress = 0;



function resetValues() {
    curr_time.textContent = "00:00";
    total_duration.textContent = "00:00";
}

function playPause() {
    if (isPlaying) {
        song.pause();
        isPlaying = false;
        play.src = "images/play.png";
    } else playTrack()
};

function playTrack() {
    song.play();
    isPlaying = true;
    play.src = "images/pause.png";

}

//we make song change its current time according to the progress bar value
function changeProgress(){
    song.currentTime = progressBar.value * songDuration/100;
}

//after meta data is loaded, we display the song's duration
song.addEventListener("loadedmetadata", function() {
    songDuration = song.duration;
    const minutes = Math.floor(songDuration / 60).toString().padStart(2, '0');;
    const seconds = Math.floor(songDuration % 60).toString().padStart(2, '0');;
    total_duration.textContent = minutes + ":" + seconds;
});

//we update the songs timer as it plays
song.addEventListener("timeupdate", () => {
    const minutes = Math.floor(song.currentTime / 60).toString().padStart(2, '0');;
    const seconds = Math.floor(song.currentTime % 60).toString().padStart(2, '0');;
    curr_time.textContent = minutes + ":" + seconds;
    if (songDuration > 0) {
        //we make the progress bar change its width depending on the currentTime of the audio
        const currentDuration = song.currentTime;
        seekProgress = currentDuration * (100 / songDuration);
        progressBar.value = seekProgress;
    };


});

function loadTrack(index) {
    clearInterval(updateTimer);
    resetValues();
    song.src = playlist[index].path;
    song.load();
    playTrack();
    art.src = playlist[index].image;
    title.textContent = playlist[index].name;
    artist.textContent = playlist[index].artist;
    updateTimer = setInterval(seekUpdate, 1000);
    
}
song.addEventListener("ended", skipTrack());

//I generate a number between 0 and the playlist length
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function shuffleTrack() {
    //new index will be a random number
    let newIndex = getRandomInt(playlist.length);
    //if the new index is the same as te actual songs', i keep generating indexs
    while (index === newIndex) {
        newIndex = getRandomInt(playlist.length);
    }
    index = newIndex;
    loadTrack(newIndex)

}


function skipTrack() {
    if (playlist.length > index) {
        index += 1;

    } else {
        index = 0;
    }
    loadTrack(index);
}

function previousTrack() {
    if (index > 0) {
        index -= 1;

    } else {
        index = playlist.length;
    }
    loadTrack(index);
}

loadTrack(0);