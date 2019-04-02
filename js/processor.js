//Line 2 or 4, which one is better?
//var Processor = {};

function Processor (){
	Processor.htmlStrings = [];
	
	//Helper Functions
	Processor.processString = function(json, string){
		var fetcher = new WordFetcher(string);
			while(!fetcher.isEmpty()){
				var word = fetcher.next();
				console.log("/" + word + "/");
				//TO DO: minimize json data sent
				Processor.handleAndInsert(json, word);
			}
	}

	Processor.handleAndInsert = function(json, word){
		var parsedHTML = word;
		
		if(Processor.isChoiceOrVariable(word)){
			if(Processor.isChoice(word)){
				//TO DO: Process choice and consequences
			}
			else if (Processor.isVariable(word)){
				//TO DO: Extract variable, insert into wordFetcher, handleAndInsert again
			}
		}
		
		Processor.addHTML(parsedHTML);
		//TO DO
	}
	 
	 
	Processor.isChoiceOrVariable = function(word){
		//TO DO LATER: possible fix somewhere for splitting a word if there's a \t or something at the end
		return (word.charAt(0) === '<' && word.charAt(word.length-1) === '>');
	}

	Processor.isChoice = function(word){
		return false;
	}

	Processor.isVariable = function(word){
		return false;
	}

	Processor.addHTML = function(string){
		console.log(this.htmlStrings);
		this.htmlStrings.push(string);
	}

	Processor.addBreak = function(){
		this.htmlStrings.push("</br>");
	}
	
};




Processor.prototype.translate = function(json){
	var body = json.body;
	var bodyPos = 0;

	while(bodyPos < body.length){	
		Processor.processString(json, body[bodyPos]);
		Processor.addBreak();		
		bodyPos++;
	}
	
	/*
		X	1) Fetch word in "body"
		X	2) If end of String, make paragraph break
		X		a) If no other Strings in the array, mark exit condition true.
			3) Else if choice, process choice consequences
			4) Else if variable, insert variable accordingly
			5) Else, normal word, paste accordingly
			6) Go to 1) until exit condition is met
	*/
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
 

export default Processor;