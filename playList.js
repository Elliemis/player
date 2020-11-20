class PlayList{
	constructor(el, app){
		this.app = app;
		this.listDom = document.querySelector(el);
		this.itemList = this.listDom.querySelector(".item-list");
		this.addBtn = this.listDom.querySelector("#openDialog");
		this.fileInput = this.listDom.querySelector("#audioFile");
		
		this.itemList.innerHTML = "";
		this.fileList = [];
		this.playIdx = null;
		
		this.addListener();
	}
	
	addListener(){
		this.addBtn.addEventListener("click", e => this.fileInput.click());
		this.fileInput.addEventListener("change", this.addList.bind(this));
	}
	
	addList(e){
		Array.from(e.target.files).forEach(file => {
			let obj = {idx: this.fileList.length, file: file, dom: null};
			this.fileList.push(obj);
			let item = document.createElement("li");
			item.classList.add("item");
			obj.dom = item;
			item.addEventListener("dblclick", (e) => {
				let idx = obj.idx;
				let data = this.fileList.find(x => x.idx == idx);
				this.playItem(data);
			});
			item.innerHTML = file.name;
			this.itemList.appendChild(item);
		});
	}
	
	playItem(data){
		$(data.dom).addClass("active").siblings().removeClass("active");
		this.currentMusic = data.idx;
		
		this.app.player.loadMusic(data.file);
	}
	
	getNextMusic(loop){
		let now = this.fileList.findIndex(x => x.idx === this.currentMusic);
		if(now < this.fileList.length - 1)
			this.playItem(this.fileList[now + 1]);
		else if(loop)
			this.playItem(this.fileList[0]);
	}
}