const wrapper = document.querySelector(".wrapper"),
musicImg = wrapper.querySelector(".img-area img"),
musicName = wrapper.querySelector(".song-details .name"),
musicArtist = wrapper.querySelector(".song-details .artist"),
playPauseBtn = wrapper.querySelector(".play-pause"),
prevBtn = wrapper.querySelector("#prev"),
nextBtn = wrapper.querySelector("#next"),
mainAudio = wrapper.querySelector("#main-audio"),
progressArea = wrapper.querySelector(".progress-area"),
progressBar = progressArea.querySelector(".progress-bar"),
musicList = wrapper.querySelector(".music-list"),
favorite = wrapper.querySelector("#like"),
closefavMusic = musicList.querySelector("#close");

let musicIndex = 1;

window.addEventListener("load", ()=>{
    loadMusic(musicIndex);
})

function loadMusic(indexNumb){
    musicName.innerHTML = music[indexNumb -1].name;
    musicArtist.innerHTML = music[indexNumb -1].artist;
    musicImg.src = `music/${music[indexNumb -1].img}`;
    mainAudio.src = `songs/${music[indexNumb -1].src}`;
    isLiked = music[indexNumb -1].fav; 
    isLiked ?  fav() : unfav();
}

function fav() {
   favorite.classList.remove("fa-regular");
    favorite.classList.add("fa-solid");
}

function unfav(){ 
    favorite.classList.remove("fa-solid");
    favorite.classList.add("fa-regular");
}

favorite.addEventListener("click", (e)=>{
    const isfavorite = favorite.classList.contains("fa-regular");
    if(isfavorite){
        fav()
    }else{
        unfav()
    }
});

function playMusic(){
    wrapper.classList.add("paused");
    playPauseBtn.querySelector("i").classList.remove("fa-circle-play");
    playPauseBtn.querySelector("i").classList.add("fa-circle-pause");
    mainAudio.play();
}

function nextMusic(){
    musicIndex++;
    musicIndex > music.length ? musicIndex = 1 : musicIndex = musicIndex;
    loadMusic(musicIndex);
    playMusic();
}

function prevMusic(){
    musicIndex--;
    musicIndex < music.length ? musicIndex = music.length : musicIndex = musicIndex;
    loadMusic(musicIndex);
    playMusic();
}

function pauseMusic(){
    wrapper.classList.remove("paused");
    playPauseBtn.querySelector("i").classList.remove("fa-circle-pause");
    playPauseBtn.querySelector("i").classList.add("fa-circle-play");
    mainAudio.pause();
}

playPauseBtn.addEventListener("click", ()=>{
 const isMusicPaused = wrapper.classList.contains("paused");
 isMusicPaused ?  pauseMusic() : playMusic();
});

nextBtn.addEventListener("click", ()=>{
  nextMusic();
});

prevBtn.addEventListener("click", ()=>{
    prevMusic();
});

mainAudio.addEventListener("timeupdate", (e)=>{
    const currentTime = e.target.currentTime; //getting playing song currentTime
    const duration = e.target.duration; //getting playing song total duration
    let progressWidth = (currentTime / duration) * 100;
    progressBar.style.width = `${progressWidth}%`;
  
    let musicCurrentTime = wrapper.querySelector(".current-time");
    let musicDuartion = wrapper.querySelector(".max-duration");
    mainAudio.addEventListener("loadeddata", ()=>{
      // update song total duration
      let mainAdDuration = mainAudio.duration;
      let totalMin = Math.floor(mainAdDuration / 60);
      let totalSec = Math.floor(mainAdDuration % 60);
      
      if(totalSec < 10){
        totalSec = `0${totalSec}`;
      }
      musicDuartion.innerText = `${totalMin}:${totalSec}`;
    });

    let currentMin = Math.floor(currentTime / 60);
    let currentSec = Math.floor(currentTime % 60);

    if(currentSec < 10){
        currentSec = `0${currentSec}`;
    }
   
    musicCurrentTime.innerText = `${currentMin}:${currentSec}`;
});

progressArea.addEventListener("click", (e)=>{
    let progressWidth = progressArea.clientWidth;
    let clickedOffsetX = e.offsetX;
    let songDuration = mainAudio.duration;

    mainAudio.currentTime = (clickedOffsetX / progressWidth) * songDuration;
    playMusic();
})


