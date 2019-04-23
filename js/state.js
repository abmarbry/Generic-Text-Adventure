function State(){
	this.tuples = [];
	
	this.addIfNotPresent = function(tuple){
		var pos = 0;
		var found = false;
		
		while(!found && pos < this.tuples.length){
			if(this.tuples[pos].getKey() === tuple.getKey()){
				found = true;
			}
			else{
				pos++;
			}
		}
		
		if(!found){
			this.tuples.push(tuple);
		}
		else{
			this.tuples[pos].setValue(tuple.getValue());
		}
	}
	
};

State.prototype.add = function(values){
	var valuesWithKey = Object.entries(values);
	
	var pos;
	for(pos = 0; pos < valuesWithKey.length; pos++){
		var key = valuesWithKey[pos][0];
		var value = valuesWithKey[pos][1];
		
		var tuple = new Tuple(key,value);
			
		this.addIfNotPresent(tuple);
	}
}

State.prototype.getValue = function(key){
	//TO DO LATER: What to return if it's not found
	var found = false;
	var pos = 0;
	var value;
	
		while(!found && pos < this.tuples.length){
			if(this.tuples[pos].getKey() === key){
				found = true;
				value = this.tuples[pos].getValue();
			}
			else{
				pos++;
			}
		}
		
		if(!found){
			//:^(
		}
		
		return value;
}

State.prototype.getLength = function(){
	return this.tuples.length;
}

//TUPLE
function Tuple(key, value){
	this.key = key;
	this.value = value;
}

Tuple.prototype.getKey = function(){
	return this.key;
}

Tuple.prototype.getValue = function(){
	return this.value;
}

Tuple.prototype.setValue = function(newValue){
	this.value = newValue;
}

export default State;