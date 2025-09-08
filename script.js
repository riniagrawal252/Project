document.addEventListener('DOMContentLoaded', () => {
    // Apply saved theme
    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark-theme');
    }
});

let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));
let currentTimeDisplay = document.getElementById('currentTime');
let durationTimeDisplay = document.getElementById('durationTime');
let volumeSlider = document.getElementById('volumeSlider');
let loopButton = document.getElementById('loopButton');
let themeToggle = document.getElementById('themeToggle');

// Song list
let songs = [
    {songName: "Warriyo - Mortals [NCS Release]", filePath: "songs/1.mp3", coverPath: "covers/1.jpg"},
    {songName: "Cielo - Huma-Huma", filePath: "songs/2.mp3", coverPath: "covers/2.jpg"},
    {songName: "DEAF KEV - Invincible [NCS Release]-320k", filePath: "songs/3.mp3", coverPath: "covers/3.jpg"},
    {songName: "Different Heaven & EH!DE - My Heart [NCS Release]", filePath: "songs/4.mp3", coverPath: "covers/4.jpg"},
    {songName: "Janji-Heroes-Tonight-feat-Johnning-NCS-Release", filePath: "songs/5.mp3", coverPath: "covers/5.jpg"},
    {songName: "Rabba - Salam-e-Ishq", filePath: "songs/6.mp3", coverPath: "covers/6.jpg"},
    {songName: "Sakhiyaan - Salam-e-Ishq", filePath: "songs/7.mp3", coverPath: "covers/7.jpg"},
    {songName: "Bhula Dena - Salam-e-Ishq", filePath: "songs/8.mp3", coverPath: "covers/8.jpg"},
    {songName: "Tumhari Kasam - Salam-e-Ishq", filePath: "songs/9.mp3", coverPath: "covers/9.jpg"},
    {songName: "Na Jaana - Salam-e-Ishq", filePath: "songs/10.mp3", coverPath: "covers/10.jpg"},
];

// Initialize song list UI
songItems.forEach((element, i) => { 
    element.getElementsByTagName("img")[0].src = songs[i].coverPath; 
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName; 
});

// Default volume
audioElement.volume = 0.5;

// Format time as mm:ss
function formatTime(time) {
    let minutes = Math.floor(time / 60);
    let seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
}

// Update playing indicator
function updatePlayingIndicator() {
    songItems.forEach((element, i) => {
        element.classList.remove('playing', 'finished');
        if (i === songIndex && !audioElement.paused) {
            element.classList.add('playing');
        }
    });
}

// Play a specific song
function playSong(index) {
    songIndex = index;
    audioElement.src = songs[index].filePath;
    masterSongName.innerText = songs[index].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    gif.style.opacity = 1;
    masterPlay.classList.replace('fa-play-circle', 'fa-pause-circle');
    updatePlayingIndicator();
}

// Handle play/pause
masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.replace('fa-play-circle', 'fa-pause-circle');
        gif.style.opacity = 1;
    } else {
        audioElement.pause();
        masterPlay.classList.replace('fa-pause-circle', 'fa-play-circle');
        gif.style.opacity = 0;
    }
    updatePlayingIndicator();
});

// Update progress + time display
audioElement.addEventListener('timeupdate', () => {
    if (audioElement.duration) {
        myProgressBar.value = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    }
    currentTimeDisplay.innerText = formatTime(audioElement.currentTime);
});

audioElement.addEventListener('loadedmetadata', () => {
    durationTimeDisplay.innerText = formatTime(audioElement.duration);
});

// Seek functionality
myProgressBar.addEventListener('change', () => {
    audioElement.currentTime = myProgressBar.value * audioElement.duration / 100;
});

// Volume control + icon change
volumeSlider.addEventListener('input', () => {
    audioElement.volume = volumeSlider.value;
    let volumeIcon = document.getElementById('volumeIcon');
    if (volumeSlider.value == 0) {
        volumeIcon.className = 'fas fa-volume-mute';
    } else if (volumeSlider.value < 0.5) {
        volumeIcon.className = 'fas fa-volume-down';
    } else {
        volumeIcon.className = 'fas fa-volume-up';
    }
});

// Play song from list
Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
    element.addEventListener('click', (e) => {
        let index = parseInt(e.target.id);
        if (songIndex === index && !audioElement.paused) {
            audioElement.pause();
            e.target.classList.replace('fa-pause-circle', 'fa-play-circle');
            masterPlay.classList.replace('fa-pause-circle', 'fa-play-circle');
            gif.style.opacity = 0;
        } else {
            playSong(index);
            makeAllPlays();
            e.target.classList.replace('fa-play-circle', 'fa-pause-circle');
        }
    });
});

function makeAllPlays() {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
        element.classList.replace('fa-pause-circle', 'fa-play-circle');
    });
}

// Next/Previous
document.getElementById('next').addEventListener('click', () => {
    songIndex = (songIndex + 1) % songs.length;
    playSong(songIndex);
});

document.getElementById('previous').addEventListener('click', () => {
    songIndex = (songIndex - 1 + songs.length) % songs.length;
    playSong(songIndex);
});

// Song ended → next or mark finished
audioElement.addEventListener('ended', () => {
    songItems[songIndex].classList.add('finished');
    if (!audioElement.loop) {
        songIndex = (songIndex + 1) % songs.length;
        playSong(songIndex);
    }
});

// Loop toggle
let isLooping = false;
loopButton.addEventListener('click', () => {
    isLooping = !isLooping;
    audioElement.loop = isLooping;
    loopButton.classList.toggle('active', isLooping);
});

// Theme toggle
themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
    localStorage.setItem('theme',
        document.body.classList.contains('dark-theme') ? 'dark' : 'light'
    );
});
