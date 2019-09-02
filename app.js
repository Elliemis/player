class Player{
	constructor(element){
		this.playerDom = $(element);
		this.audio = this.playerDom.querySelector("audio");
		this.playBtn = this.playerDom.querySelector(".play");
		this.stopBtn = this.playerDom.querySelector(".stop");
		this.progress = this.playerDom.querySelector(".progress");
		
		this.progressBar = this.playerDom.querySelector(".bar");
		
		this.addListner();
		requestAnimationFrame(this.frame.bind(this));
		
		this.playerDom.querySelector(".info .total-time").innerHTML = this.getTimeString(this.audio.duration);
	}
	
	addListner(){
		this.playBtn.addEventListener("click", this.play.bind(this));
		this.stopBtn.addEventListener("click", this.stop.bind(this));
		this.progress.addEventListener("click", this.changeSeeking.bind(this));
	}
	
	changeSeeking(e){
		
		this.audio.currentTime = e.offsetX / this.progress.clientWidth * this.audio.duration;
	}
	
	play(){
		this.audio.play();
	}
	
	stop(){
		this.audio.pause();
	}
	
	frame(timestamp){
		requestAnimationFrame(this.frame.bind(this));
		this.render();
	}
	
	render(){
		let current = this.audio.currentTime;
		let duration = this.audio.duration;
		this.progressBar.style.width = `${current / duration * 100}%`;
		
		this.playerDom.querySelector(".info .current-time").innerHTML = this.getTimeString(current);
		// this.playerDom.querySelector(".info .total-time").innerHTML = this.getTimeString(duration);
	}
	
	getTimeString(seconds){
		let time = [];
		time[0] = Math.floor(seconds / 3600);
		time[1] = Math.floor(seconds % 60 / 60);
		time[2] = Math.floor(seconds % 60);
		for(let i = 0; i < time.length; i++){
			time[i] = time[i] + "";
			time[i] = time[i].length >= 2 ? time[i] : new Array(2 - time[i].length + 1).join("0") + time[i];
		}
		return `${time[0]}:${time[1]}:${time[2]}`;
	}
}

window.addEventListener("load", () => {
	
	let palyer = new Player("#player");
	console.log(palyer);
});

function $(selector){
	return document.querySelector(selector);
}

function $$(selector){
	return document.querySelectorAll(selector);
}