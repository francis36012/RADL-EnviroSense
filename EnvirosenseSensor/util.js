'use strict'

module.exports.sprintf = function(format){
	for(var i=1; i < arguments.length; i++){
		format=format.replace(/%s/, arguments[i]);
	}
	return format;
}

module.exports.zeroFill = function(i){
	return (i < 10 ? '0' : '') + i;
}

