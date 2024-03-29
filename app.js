require('dotenv').config();
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const db = require('./database');
const compression = require('compression');
const session = require('express-session');
const fileUpload = require('express-fileupload'); 
const rateLimit = require("express-rate-limit");
const os = require('os');
const visitor = require('./helper/visitorCounter');

const indexRouter = require('./routes/index');
const adminRouter = require('./routes/admin');

var app = express();

// const numCpu = os.cpus().length;
const limiter = rateLimit({
  windowMs: 2 * 60 * 1000, // 2 minutes
  max: 1000,
  message:"Too many requests, please try after 2 minutes.'"
});
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// app.use(helmet());
app.use(session({ 
  secret : "WQ?wWWn_hjCa88rq%6GfTvwD&",
  // name: cookie_name,
  // store: sessionStore, // connect-mongo session store
  proxy: true,
  resave: false,
  saveUninitialized: true
}));  // session
app.use(visitor());
app.use(cors());
app.use(fileUpload());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(compression());
app.use(limiter);
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/admin', adminRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  res.render('404');
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
// ==============================================port===============================
app.listen(process.env.PORT,function(){
  console.log(`server started.... on ${process.env.PORT}`);
});

// clustering 
// if(cluster.isMaster){
//   for(let i = 0; i < numCpu; i++ ){
//     cluster.fork();
//   } 
//   cluster.on('exit', (worker, code, signal)=>{
//     console.log(`worker ${worker.process.pid} died`);
//     cluster.fork();
//   })
// } else {
//   app.listen(process.env.PORT,function(){
//     console.log(`server started.... on ${process.env.PORT} and pId is ${process.pid}`);
//   });
// }

module.exports = app;
