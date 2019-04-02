function Choice(data){
	this.consequences = data.consequences;
	this.body = data.name;
	this.nextSnippet = data.nextSnippet;
	
	if(data.transition.toAct.isPopulated){
		this.toAct = data.transition.toAct.where;
	}
	else{
		this.toAct = "";
	}
	
	if(data.transition.toScene.isPopulated){
		this.toScene = data.transition.toScene.where;
	}
	else{
		this.toScene = "";
	}
}

Choice.prototype.getNextSnippetString = function(){
	return (this.toAct + "/" + this.toScene + "/" + this.nextSnippet);
}

Choice.prototype.getConsequences = function(){
	return this.consequences;
}

Choice.prototype.getBody = function(){
	return this.body;
}

export default Choice;