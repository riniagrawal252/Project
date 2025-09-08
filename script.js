document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark-theme');
    }
});

let themeToggle = document.getElementById('themeToggle');

console.log("Welcome to Spotify");

// Initialize the Variables
let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementByClassName('icons');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');

let songItems = Array.from(document.getElementsByClassName('songItem'));
let currentTimeDisplay = document.getElementById('currentTime');
let durationTimeDisplay = document.getElementById('durationTime');
// Get the volume slider element
let volumeSlider = document.getElementById('volumeSlider');

// Set initial volume for the audio element
audioElement.volume = 0.5; // Default volume (50%)

// Add event listener for volume changes
volumeSlider.addEventListener('input', () => {
    audioElement.volume = volumeSlider.value;
});
audioElement.addEventListener('timeupdate', () => {
    let progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    myProgressBar.value = progress;

    // Optionally, update a visual display for current time and duration
    currentTimeDisplay.innerText = formatTime(audioElement.currentTime);
});



let songs = [
    {songName: "Warriyo - Mortals [NCS Release]", filePath: "songs/10.mp3", coverPath: "covers/1.jpg"},
    {songName: "Cielo - Huma-Huma", filePath: "songs/2.mp3", coverPath: "covers/2.jpg"},
    {songName: "DEAF KEV - Invincible [NCS Release]-320k", filePath: "songs/3.mp3", coverPath: "covers/3.jpg"},
    {songName: "Different Heaven & EH!DE - My Heart [NCS Release]", filePath: "songs/4.mp3", coverPath: "covers/4.jpg"},
    {songName: "Janji-Heroes-Tonight-feat-Johnning-NCS-Release", filePath: "songs/5.mp3", coverPath: "covers/5.jpg"},
    {songName: "Rabba - Salam-e-Ishq", filePath: "songs/9.mp3", coverPath: "covers/6.jpg"},
    {songName: "Sakhiyaan - Salam-e-Ishq", filePath: "songs/5.mp3", coverPath: "covers/7.jpg"},
    {songName: "Bhula Dena - Salam-e-Ishq", filePath: "songs/6.mp3", coverPath: "covers/8.jpg"},
    {songName: "Tumhari Kasam - Salam-e-Ishq", filePath: "songs/7.mp3", coverPath: "covers/9.jpg"},
    {songName: "Na Jaana - Salam-e-Ishq", filePath: "songs/8.mp3", coverPath: "covers/10.jpg"},
]

songItems.forEach((element, i)=>{ 
    element.getElementsByTagName("img")[0].src = songs[i].coverPath; 
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName; 
})

 


// Handle play/pause click
masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    } else {
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }
});

// Listen to Events
audioElement.addEventListener('timeupdate', ()=>{ 
    // Update Seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)* 100); 
    myProgressBar.value = progress;
})

myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
})

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
    element.addEventListener('click', (e) => {
        makeAllPlays();

        let clickedIndex = parseInt(e.target.id);
        if (songIndex === clickedIndex && !audioElement.paused) {
            // Pause if same song clicked again
            audioElement.pause();
            e.target.classList.remove('fa-pause-circle');
            e.target.classList.add('fa-play-circle');
            masterPlay.classList.remove('fa-pause-circle');
            masterPlay.classList.add('fa-play-circle');
            gif.style.opacity = 0;
        } else {
            songIndex = clickedIndex;
            audioElement.src = `songs/${songIndex + 1}.mp3`;
            masterSongName.innerText = songs[songIndex].songName;
            audioElement.currentTime = 0;
            audioElement.play();

            e.target.classList.remove('fa-play-circle');
            e.target.classList.add('fa-pause-circle');
            masterPlay.classList.remove('fa-play-circle');
            masterPlay.classList.add('fa-pause-circle');
            gif.style.opacity = 1;
        }
    });
});
const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('songItems')).forEach((el) => {
        el.classList.remove('fa-pause-circle');
        el.classList.add('fa-play-circle');
    });
};

function playSong(index) {
    audioElement.src = `songs/${index + 1}.mp3`;
    masterSongName.innerText = songs[index].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    gif.style.opacity = 1;
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
}



document.getElementById('next').addEventListener('click', () => {
    songIndex = (songIndex >= songs.length - 1) ? 0 : songIndex + 1;
    playSong(songIndex);
});

document.getElementById('previous').addEventListener('click', () => {
    songIndex = (songIndex <= 0) ? songs.length - 1 : songIndex - 1;
    playSong(songIndex);
});


// Function to format time as mm:ss
function formatTime(time) {
    let minutes = Math.floor(time / 60);
    let seconds = Math.floor(time % 60);
    if (seconds < 10) {
        seconds = '0' + seconds;
    }
    return `${minutes}:${seconds}`;
}

// Update total duration when the metadata is loaded
audioElement.addEventListener('loadedmetadata', () => {
    durationTimeDisplay.innerText = formatTime(audioElement.duration);
});

// Update current time during playback
audioElement.addEventListener('timeupdate', () => {
    currentTimeDisplay.innerText = formatTime(audioElement.currentTime);

    // Update progress bar
    if (audioElement.duration) {
        let progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
        myProgressBar.value = progress;
    }
});
volumeSlider.addEventListener('input', () => {
    audioElement.volume = volumeSlider.value;
    let volumeIcon = document.querySelector('.volumeControl i');

    if (volumeSlider.value == 0) {
        volumeIcon.classList.remove('fa-volume-up', 'fa-volume-down');
        volumeIcon.classList.add('fa-volume-mute');
    } else if (volumeSlider.value < 0.5) {
        volumeIcon.classList.remove('fa-volume-up', 'fa-volume-mute');
        volumeIcon.classList.add('fa-volume-down');
    } else {
        volumeIcon.classList.remove('fa-volume-down', 'fa-volume-mute');
        volumeIcon.classList.add('fa-volume-up');
    }
});
// Add event listener to detect when the song ends
audioElement.addEventListener('ended', () => {
    // Proceed to the next song or loop to the first song
    if (songIndex >= songs.length - 1) {
        songIndex = 0; // Loop back to the first song if it's the last song
    } else {
        songIndex += 1; // Move to the next song
    }
    playSong(songIndex);
});
function updatePlayingIndicator() {
    songItems.forEach((element, i) => {
        if (i === songIndex) {
            element.classList.add('playing');
        } else {
            element.classList.remove('playing');
        }
    });
}

// Call this function when a new song starts playing
audioElement.addEventListener('play', updatePlayingIndicator);
audioElement.addEventListener('ended', updatePlayingIndicator); // Update when the song ends
audioElement.addEventListener('loadedmetadata', () => {
    durationTimeDisplay.innerText = formatTime(audioElement.duration);
});


let isLooping = false; // Track the loop state
let loopButton = document.getElementById('loopButton');

// Add event listener to toggle loop state
loopButton.addEventListener('click', () => {
    isLooping = !isLooping; // Toggle the loop state

    if (isLooping) {
        audioElement.loop = true; // Enable loop
        loopButton.classList.add('active'); // Add active class for visual feedback
    } else {
        audioElement.loop = false; // Disable loop
        loopButton.classList.remove('active'); // Remove active class
    }
});
let isDarkMode = false;
document.getElementById('themeToggle').addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
    isDarkMode = !isDarkMode;
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
});
// Check if a theme is saved in localStorage and apply it on page load

themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
    
    // Store the user's theme preference in localStorage
    if (document.body.classList.contains('dark-theme')) {
        localStorage.setItem('theme', 'dark');
    } else {
        localStorage.setItem('theme', 'light');
    }
});
