function State(){
	this.tuples = [];
	
	this.addIfNotPresent = function(){
		//TO DO
	}
	
};

State.prototype.add = function(values){
	var valuesWithKey = Object.entries(values);
	
	var pos;
	for(pos = 0; pos < valuesWithKey.length; pos++){
		var key = valuesWithKey[pos][0];
		var value = valuesWithKey[pos][1];
		
		var tuple = new Tuple(key,value);
		
		this.addIfNotPresent();
	}
}

State.prototype.get = function(key){
	//1) find key
	//2) get value
}

//TUPLE
function Tuple(key, value){
	this.key = key;
	this.value = value;
}

Tuple.prototype.getValue = function(){
	return this.value;
}

Tuple.prototype.getKey = function(){
	return this.key;
}

Tuple.prototype.setValue = function(newValue){
	this.value = newValue;
}

export default State;