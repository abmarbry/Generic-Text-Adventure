import Snippet from "./snippet.js";
import State from "./state.js";
import Choice from "./choice.js";

Processor.prototype.translate = function(json){
	var body = json.body;
	var bodyPos = 0;

	while(bodyPos < body.length){
		Processor.snippet.startParagraph();
		Processor.processString(json, body[bodyPos]);
		Processor.snippet.endParagraph();		
		bodyPos++;
	}
	
	return Processor.snippet;
};

Processor.prototype.handleChoice = function(consequences){
	if( Object.keys(consequences).length > 0){
		Processor.state.add(consequences);
	}
}

Processor.prototype.outsideDataToHtml = function(title, subtitle){
	
	var body = "";
	
	if(title.length > 0){
		body += "<div class='title'>" + title + "</div>";
	}
	if(subtitle.length > 0){
		body += "<div class='subtitle'>" + subtitle + "</div>";
	}
	
	return body;
}

Processor.prototype.clear = function(){
	Processor.snippet = new Snippet();
}

Processor.prototype.clearState = function(){
	if(Processor.state.getLength() > 0){
		Processor.state = new State();
	}
}





function Processor (){
	Processor.snippet = new Snippet();
	Processor.state = new State();
	
	
	//HELPER FUNCTIONS
	Processor.processString = function(json, string){
		var fetcher = new WordFetcher(string);
			while(!fetcher.isEmpty()){
				var word = fetcher.next();
				//TO DO LATER: minimize json data sent
				Processor.handleAndInsert(json, word);
			}
	}
	

	Processor.handleAndInsert = function(json, word){
		
		//TO DO LATER: Handle if there's a choice / variable in the body, but none in the actual JSON
		
		if(Processor.containsVar(word)){
			var atomizer = new Atomizer(word);
			var result = atomizer.get();
			
			console.log(result)
			
			let pos;
			for(pos = 0; pos < result.body.length; pos++){
				if(result.type[pos] === "CHOICE"){
					var id = Processor.findInnerID(result.body[pos]);
						
					var choiceData = Processor.findJSONContent(json.choices.content, id);
						
					var choice = new Choice(choiceData);
					//TO DO LATER: A choice should be able to process any possible variable text that's within it.
					Processor.snippet.addHtmlChoice(choice.getNextSnippetData(), choice.getConsequences(), choice.getIsOutside(), choice.getBody());
				}
				else if (result.type[pos] === "VARIABLE"){
					var id = Processor.findInnerID(result.body[pos]);
						
					var value = Processor.state.getValue(id);
					var variableData = Processor.findJSONContent(json.variables.content, id);
					var body = Processor.processVariable(variableData, value);
						
					Processor.processString(json, body);
				}
				else{
					Processor.snippet.add(result.body[pos]);
				}
		}
		}
	}
	
	Processor.processVariable = function(variable, value){
		//TO DO LATER: Make less terrible and ugly
		if(variable.returnValue){
			return value;
		}
		else {
			var options = variable.options
			var valueString = value.toString();
			
			var optionsWithKey = Object.entries(options);
			
			var rightOption = optionsWithKey.find(function(o){
				return o[0] === valueString;
			});
			
			return rightOption[1];

		}

	}
	 
	 
	Processor.containsVar = function(word){
		//TO DO: Determine if there's punctuation at the end and handle that separately
		//TO DO SOON PLEASE: possible fix somewhere for splitting a word if there's a \t or something at the end
		return word.indexOf("<CHOICE(") !== -1 || word.indexOf("<VARIABLE(") !== -1;
	}
	

	Processor.isChoice = function(word){
		var bigWord = word.toUpperCase();
		return (bigWord.indexOf("CHOICE") !== -1); 
	}
	

	Processor.isVariable = function(word){
		var bigWord = word.toUpperCase();
		return (bigWord.indexOf("VARIABLE") !== -1); 
	}
	
	
	Processor.findInnerID = function(word){
		var start = word.indexOf("(")+1;
		var end = word.lastIndexOf(")");
		
		return word.substring(start, end);
	}
	
	
	Processor.findJSONContent = function(data, id){
		var correct;
		var found = false;
		var pos = 0;
		while(!found && pos < data.length){
			if(data[pos].id === id){
				correct = data[pos];
				found = true;
			}
			else{
				pos++;	
			}
		}
		return correct;
	}
	
};





//WORD FETCHER
function WordFetcher(string){
	this.string = string;
	this.pos = 0;
}

WordFetcher.prototype.next = function(){
	var wordFound = false;
	var pos = this.pos;
	var string = this.string;
	
	while(!wordFound && pos < string.length) {
		//TO DO: Infinite loop bug if string ends in space?
		var c = string.charAt(pos);
		if(c === ' '){
			pos++;
			c = string.charAt(pos);
		}
		else {
			wordFound = true;
		}
	}
	
	if(!wordFound){
		return "";
	}
	else{
		var end = pos;
		c = string.charAt(end);
		while(c !== ' ' && end < string.length){
			end++;
			c = string.charAt(end);
		}
		
		var word = string.substring(pos, end);
		this.pos = end;
		
		return word;
	}
}

WordFetcher.prototype.isEmpty = function(){
	return !(this.pos < this.string.length);
}
//WORD FETCHER END





//ATOMIZER
function Atomizer(string){
	this.string = string;
	this.pos = 0;
	this.result = {};
	this.result.body = [];
	this.result.type = [];
}

Atomizer.prototype.get = function(){
	//TO DO LATER: Refactor
	var pos = this.pos;
	var string = this.string;
	var endPos = pos;
	
	while(pos < string.length){
		var varFound = false;
		var varText = "";
		var endPoint = false;
		
		while(!endPoint && endPos < string.length) {
			//TO DO: Infinite loop bug if string ends in space?
			var c = string.charAt(endPos);
			if(c === '<'){
				if(!varFound && endPos===pos){
					varFound = true;
				}
				else {
					endPoint = true;
				}
			}
			else if(c === '>'){
				if(varFound){
					endPoint = true;
				}
			}
			
			endPos++;
		}
		
		var substring = string.substring(pos, endPos);
		
		this.result.body.push(substring);
		
		if(varFound){
			//TO DO: Fix magic variables
			if(substring.includes("VARIABLE")){
				varText = "VARIABLE";
			}
			else if(substring.includes("CHOICE")){
				varText = "CHOICE";
			}
			else{
				varFound = false;
			}
		}
		
		if(varFound){
			this.result.type.push(varText);
		}
		else{
			this.result.type.push("NONE");
		}
		
		pos = endPos;
	}
	return this.result;
	

}

Atomizer.prototype.isEmpty = function(){
	return !(this.pos < this.string.length);
}
//VAR EXTRACT END
 

export default Processor;