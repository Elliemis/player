const MODE = {
	"NO": 0,
	"ONE": 1,
	"LIST": 2
};

class Player{
	constructor(el, app){
		this.app = app;
		this.playerDom = document.querySelector(el);
		this.audio = this.playerDom.querySelector("audio");
		this.controlBtn = this.playerDom.querySelector(".play");
		this.stopBtn = this.playerDom.querySelector(".stop");
		this.isPlay = false;
		
		this.progressBar = this.playerDom.querySelector(".bar");
		
		this.currentSpan = this.playerDom.querySelector(".current-time");
		this.totalSpan = this.playerDom.querySelector(".total-time");
		
		this.progress = this.playerDom.querySelector(".progress");
		this.fileName = this.playerDom.querySelector(".file-name");
		
		this.playable = false;
		
		this.repeatMode = MODE.NO;
		this.modeBtnList = document.querySelectorAll(".repeat-btn");
		
		this.addListener();
		requestAnimationFrame(this.frame.bind(this));
	}
	
	addListener(){
		this.controlBtn.addEventListener("click", this.control.bind(this));
		this.stopBtn.addEventListener("click", this.stop.bind(this));
		this.progress.addEventListener("click", this.changeSeeking.bind(this));
		this.audio.addEventListener("ended", this.musicEnd.bind(this));
		
		this.modeBtnList.forEach(btn => {
			btn.addEventListener("click", (e) => {
				this.repeatMode = e.target.value * 1;
			});
		});
	}
	
	musicEnd(){
		switch(this.repeatMode){
			case MODE.ONE:
				this.isPlay = true;
				this.control();
				break;
			case MODE.LIST:
				this.app.playList.getNextMusic(true);
				break;
			case MODE.NO:
				this.app.playList.getNextMusic(false);
		}
	}
	
	changeSeeking(e){
		if(!this.playable) return;
		let target = e.offsetX / this.progress.clientWidth * this.audio.duration;
		this.audio.currentTime = target;
	}
	
	control(){
		if(!this.playable) return;
		if(this.isPlay)
			this.play();
		else
			this.pause();
	}
	
	play(){
		this.audio.play();
		this.controlBtn.querySelector("svg").classList.replace("fa-play", "fa-pause");
		this.isPlay = false;
	}
	
	pause(){
		this.audio.pause();
		this.controlBtn.querySelector("svg").classList.replace("fa-pause", "fa-play");
		this.isPlay = true;
	}
	
	stop(){
		if(!this.playable) return;
		this.pause();
		this.audio.currentTime = 0;
	}
	
	frame(timestamp){
		requestAnimationFrame(this.frame.bind(this));
		this.render();
	}
	
	render(){
		if(!this.playable) return;
		let current = this.audio.currentTime;
		let duration = this.audio.duration;
		this.progressBar.style.width = `${current / duration * 100}%`;
		
		this.currentSpan.innerHTML = current.timeFormat();
		this.totalSpan.innerHTML = duration.timeFormat();
	}
	
	loadMusic(musficFile){
		let fileURL = URL.createObjectURL(musficFile);
		this.audio.pause();
		this.audio.src = fileURL;
		
		this.audio.addEventListener("loadeddata", () => {
			this.fileName.innerHTML = musficFile.name;
			this.play();
			this.playable = true;
		});
	}
}