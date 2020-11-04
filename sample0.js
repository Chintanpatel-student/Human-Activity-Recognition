const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient({region: 'us-east-1'});
exports.handler = function(e, ctx, callback) {
	
	let nowdate = Date.now();
	let millis = nowdate - 3600*1000;
	
	let scanningParameters = {
		TableName: 'activeEdge',
		FilterExpression: "#date between :limitdate and :nowdate",
		ExpressionAttributeNames:{
        	"#date": "date"
    	},
    	ExpressionAttributeValues: {
        	":limitdate": millis,
        	":nowdate": nowdate
    	},
    
		Limit: 100
	};

	docClient.scan(scanningParameters, function(err, data){
		if(err){
			callback(err, null);
		} else {
			callback(null, data);
		}
	});
};