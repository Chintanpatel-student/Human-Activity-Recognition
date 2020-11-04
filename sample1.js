const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient({region: 'eu-east-1'});

exports.handler = function(event, ctx, callback) {
	
    let x = parseFloat(event.x);
    let y = parseFloat(event.y);
    let z = parseFloat(event.z);
    
    let sma = Math.abs(x) + Math.abs(y) + Math.abs(z);
    let act;
    if (sma < 1.5) {
    	act = "still";
    }
    if (sma > 1.5 && sma < 4) {
    	act = "walking";
    }
    if (sma > 4) {
    	act = "running";
    }
	
	var params = {
		Item: {
			date: Date.now(),
			activity: act
		},

		TableName: 'activeCloud'
	};

	docClient.put(params, function(err, data){
		if(err){
			callback(err, null);
		} else {
			callback(null, data);
		}
	});
}