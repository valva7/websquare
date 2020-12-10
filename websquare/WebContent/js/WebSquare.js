/**
 * @target
 */
var WebSquare_js= {}; //This is WebSquare JavaScript Marker. Do not remove this line.

commonJs = {};

commonJs.test = function (dataMap1, dataMap2) {
	console.log(dataMap1.getInfo().keyInfo);
	console.log(dataMap2.getInfo().keyInfo);
	
	var dataMapKeyArr1 = dataMap1.getInfo().keyInfo;
	var dataMapKeyArr2 = dataMap2.getInfo().keyInfo;
	
	for (var i = 0; i < dataMapKeyArr1.length; i++) {
		for (var j = 0; j < dataMapKeyArr2.length; j++) {
			var key1 = dataMapKeyArr1[i];
			var key2 = dataMapKeyArr2[j];
			
			if (key1 == key2) {
				dataMap2.set(key1, dataMap1.get(key2));
			}
		}
	}
}