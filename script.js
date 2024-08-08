let audioElement = document.getElementById('song');
let playBtn = document.getElementById('play-pause');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let currentSong = 1;
let isFirstPlay = true; // Flag to track if the first song has been played

const songs = [
    { songName: "Dreamer", filePath: "songs/1.mp3", coverPath: "images/image 1.jpg", banner: "images/banner1.jpg" },
    { songName: "Sky High", filePath: "songs/2.mp3", coverPath: "images/image 2.jpg", banner: "images/banner2.jpg" },
    { songName: "Slow Mo", filePath: "songs/3.mp3", coverPath: "images/image 3.jpg" },
    { songName: "On & On", filePath: "songs/4.mp3", coverPath: "images/image 4.jpg" },
    { songName: "Be", filePath: "songs/5.mp3", coverPath: "images/image 5.jpg" },
    { songName: "Where We Started", filePath: "songs/6.mp3", coverPath: "images/image 6.jpg" },
    { songName: "Bassline", filePath: "songs/7.mp3", coverPath: "images/image 7.jpg" },
    { songName: "Feel Good", filePath: "songs/8.mp3", coverPath: "images/image 8.jpg" },
    { songName: "Strangers", filePath: "songs/9.mp3", coverPath: "images/image 9.jpg" },
    { songName: "Fearless Pt. II", filePath: "songs/10.mp3", coverPath: "images/image 10.jpg" }
];

function playAll(songNumber) {
    currentSong = songNumber;
    loadSong(songs[songNumber - 1]);
}

function loadSong(song) {
    audioElement.src = song.filePath;
    masterSongName.textContent = song.songName;
    gif.style.visibility = 'visible';
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
    document.querySelector('.left-img').src = song.coverPath;
    playBtn.querySelector('img').src = 'images/pause-button.svg'; 
    // Show the bottom controls
    document.querySelector('.bottom').classList.remove('hide');
}

function playaudio() {
    if (isFirstPlay) {
        // Load the first song and play it
        loadSong(songs[currentSong - 1]);
        isFirstPlay = false; // Set to false after playing the first song
    } 
    else {
        // Regular play/pause functionality
        if (audioElement.paused || audioElement.currentTime <= 0) {
            audioElement.play();
            masterPlay.classList.remove('fa-play-circle');
            masterPlay.classList.add('fa-pause-circle');
            gif.style.visibility = 'visible';
            playBtn.querySelector('img').src = 'images/pause-button.svg'; 
        } else {
            audioElement.pause();
            masterPlay.classList.remove('fa-pause-circle');
            masterPlay.classList.add('fa-play-circle');
            gif.style.visibility = 'hidden';
            playBtn.querySelector('img').src = 'images/play-button.svg'; 
        }
        
        // Show the bottom controls
        document.querySelector('.bottom').classList.remove('hide');
    }
}

audioElement.addEventListener('timeupdate', () => {
    let progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    myProgressBar.value = progress;
});

myProgressBar.addEventListener('change', () => {
    audioElement.currentTime = myProgressBar.value * audioElement.duration / 100;
});

function nextSong() {
    if (currentSong >= songs.length) {
        currentSong = 1;
    } else {
        currentSong += 1;
    }
    loadSong(songs[currentSong - 1]);
}

function previousSong() {
    if (currentSong <= 1) {
        currentSong = songs.length;
    } else {
        currentSong -= 1;
    }
    loadSong(songs[currentSong - 1]);
}
