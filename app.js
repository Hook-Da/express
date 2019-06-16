var createError = require('http-errors');
var http = require('http');
var path = require('path');
var config = require('config');
var log = require('libs/log')(module);

var express = require('express');
var app = express();
app.set('port',config.get('port'));
app.set('view engine', 'ejs');

http.createServer(app).listen(app.get('port'),()=>{
	log.info('Express server listening on port '+config.get('port'));
});

//Middleware
app.use((req,res,next)=>{
	if(req.url === '/'){
		res.end('Hello');
	}else{
		next();
	}
});
app.use((req,res,next)=>{
	if(req.url == '/forbidden'){
		next(new Error('wops go and fuck yourself'));
	}else{
		next();
	}
});
app.use((req,res)=>{
	res.status(404).send('Page not found');
})
app.use((err,req,res,next)=>{
	//NODE_ENV = production
	if(app.get('env') == 'development'){
		res.locals.message = err.message;
		res.locals.error = req.app.get('env') === 'development' ? err : {};
		res.status(err.status || 500);
		res.render('error');
	}else{
		res.send(500);
	}
});

/*var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;*/
