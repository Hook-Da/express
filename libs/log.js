var winston = require('winston');
var ENV = process.env.NODE_ENV; //раньше использовали app.get('env')

function getLogger(module){
	var path = module.filename.split('/').slice(-2).join('/');
	return new winston.createLogger({
		transports:[
			new winston.transports.Console({
				colorize:true,
				level: ENV == 'development' ? 'debug' : 'error',
				label: path
			})
		]
	});
}

module.exports = getLogger;