function Choice(data){
	this.consequences = data.consequences;
	this.body = data.name;
	this.nextSnippet = data.nextSnippet;

	this.nextAct = data.nextAct;

	this.nextScene = data.nextScene;
}

Choice.prototype.getNextSnippetString = function(){
	return (this.nextAct + "/" + this.nextScene + "/" + this.nextSnippet);
}

Choice.prototype.getConsequences = function(){
	return this.consequences;
}

Choice.prototype.getBody = function(){
	return this.body;
}

export default Choice;