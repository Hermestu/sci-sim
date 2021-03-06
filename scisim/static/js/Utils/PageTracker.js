var PageChain = function(){
	this.currentPointer = -1;
	this.chain = [];
};

PageChain.prototype.add = function (page) {
	if(this.chain.length >= 1){ // the first page is where simulation starts
		for (var i = 0; i < this.chain.length; i++) {
			if(_.isEqual(this.chain[i], page)){
				this.currentPointer = i;
				return;
			}
		}
	}
	
	this.chain.push(page);
	this.currentPointer += 1;
};

PageChain.prototype.goBack = function(){
	var current = this.currentPointer;
	this.currentPointer -= 1;
	
	this.revivePage(current, this.currentPointer);
};

PageChain.prototype.goForward = function(){
	var current = this.currentPointer;
	this.currentPointer += 1;
	
	this.revivePage(current, this.currentPointer);
};

PageChain.prototype.revivePage = function(current, newPage){
	this.chain[current].sleep();
	this.chain[newPage].revive();
};

PageChain.prototype.getCurrentPage = function(){
	return this.chain[this.chain.length];
}

PageChain.prototype.getLastPage = function(){
	return this.chain[this.chain.length - 1];
}

PageChain.prototype.count = function(){
	return this.chain.length;
};