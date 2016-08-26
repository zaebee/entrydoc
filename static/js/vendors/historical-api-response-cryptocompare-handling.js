/* this function relies on a method to transform the data from multiple decimals to a more human readable format. I'm using util.reduceFloatVal 
 * in here but feel free to use whatever you want. This applies to api responses for historical data from cryptocompare.
 * The interval parameter refers to seconds used in the current request time period. For requests on the minute api with no aggregation
 * use 60 seconds, for an aggregation of 5 minutes on your request use 5*60 seconds. On the hourly api use 60*60 for no aggregation,
 * for an aggregation of 12 hours for example use 12*60*60. For the daily api use 24*60*60 for no aggregation
 */
CCC = {
  STATIC: {}
};
CCC.STATIC.UTIL = {
	reduceFloatVal : function(value){
		value = parseFloat(value);
		if(value>1){
			value = Math.round(value * 100) / 100;
			return value;
		}
		return parseFloat(value.toPrecision(3));
    }
};
polyfillChartData = function(chartData,interval){
	var util = CCC.STATIC.UTIL;
	var arrayToReturn = [];
	var prevClose;
	var allData = chartData['Data'];
	var timestampToStop;
	var currentTimestamp = chartData.TimeFrom;
	if(!chartData.hasOwnProperty('Data')){
		return arrayToReturn;
	}
	if(allData.length>0){
		timestampToStop = allData[0]['time'];
	}else{
		timestampToStop = chartData.TimeTo;
	}
			
	//pad beginning
	if(!chartData.FirstValueInArray){
		if(chartData.hasOwnProperty("FirstValue")){
			prevClose = util.reduceFloatVal(chartData.FirstValue['close']);
		}else{
			if(allData.length>0){
				prevClose = util.reduceFloatVal(allData[0]['close']);
			}else{
				prevClose = 0;
			}
		}
		var initalValue ={};
		initalValue['time'] = chartData.TimeFrom*1000;
		initalValue['close'] = prevClose;
		initalValue['high'] = prevClose;
		initalValue['low'] = prevClose;
		initalValue['open'] = prevClose;
		initalValue['volumefrom'] = 0;
		initalValue['volumeto'] = 0;
		arrayToReturn.push(initalValue);
		prevClose = initalValue['close'];
		currentTimestamp = currentTimestamp+interval;
		while(currentTimestamp<timestampToStop){
			var newValue = {};
			newValue['time'] = currentTimestamp*1000;
			newValue['close'] = prevClose;
			newValue['high'] = prevClose;
			newValue['low'] = prevClose;
			newValue['open'] = prevClose;
			newValue['volumefrom'] = 0;
			newValue['volumeto'] = 0;
			arrayToReturn.push(newValue);
			currentTimestamp = currentTimestamp+interval;
		}
	}
	//add first value
	var newValue = {};
	currentTimestamp = allData[0]['time'];
	newValue['time'] = currentTimestamp*1000;
	newValue['close'] = util.reduceFloatVal(allData[0]['close']);
	newValue['high'] = util.reduceFloatVal(allData[0]['high']);
	newValue['low'] = util.reduceFloatVal(allData[0]['low']);
	newValue['open'] = util.reduceFloatVal(allData[0]['open']);
	newValue['open'] = util.reduceFloatVal(allData[0]['open']);
	newValue['volumefrom'] = util.reduceFloatVal(allData[0]['volumefrom']);
	newValue['volumeto'] = util.reduceFloatVal(allData[0]['volumeto']);
	arrayToReturn.push(newValue);
	prevClose = newValue['close'];
	currentTimestamp = currentTimestamp+interval;
			
	//pad middle
	for(var i=1;i<allData.length;i++){
		timestampToStop = allData[i]['time'];
		while(currentTimestamp<timestampToStop){
			var newValue = {};
			newValue['time'] = currentTimestamp*1000;
			newValue['close'] = prevClose;
			newValue['high'] = prevClose;
			newValue['low'] = prevClose;
			newValue['open'] = prevClose;
			newValue['volumefrom'] = 0;
			newValue['volumeto'] = 0;
			arrayToReturn.push(newValue);
			currentTimestamp = currentTimestamp+interval;
		}
		var newValue = {};
		newValue['time'] = currentTimestamp*1000;
		newValue['close'] = util.reduceFloatVal(allData[i]['close']);
		newValue['high'] = util.reduceFloatVal(allData[i]['high']);
		newValue['low'] = util.reduceFloatVal(allData[i]['low']);
		newValue['open'] = util.reduceFloatVal(allData[i]['open']);
		newValue['volumefrom'] = util.reduceFloatVal(allData[i]['volumefrom']);
		newValue['volumeto'] = util.reduceFloatVal(allData[i]['volumeto']);
		arrayToReturn.push(newValue);
		prevClose = newValue['close'];
		currentTimestamp = currentTimestamp+interval;
	};
			
	//pad the end
	timestampToStop = chartData.TimeTo;
	while(currentTimestamp<=timestampToStop){
		var newValue = {};
		newValue['time'] = currentTimestamp*1000;
		newValue['close'] = prevClose;
		newValue['high'] = prevClose;
		newValue['low'] = prevClose;
		newValue['open'] = prevClose;
		newValue['volumefrom'] = 0;
		newValue['volumeto'] = 0;
		arrayToReturn.push(newValue);
		currentTimestamp = currentTimestamp+interval;
	}
	return arrayToReturn;
}
