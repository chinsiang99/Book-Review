// error handling
const expressErrorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode ? res.statusCode : 404;

  if(res.statusCode == 404 || res.statusCode == 401){
    if(res.statusCode == 404){
      err.message = "Page not Found!";
    }
    const data = {
      status: 401,
      errorMessage: err.message,
    }
    res.render('login', data);
  }else{
    res.status(statusCode).json({
      status: statusCode,
      error: err.message
    })
  }
};

module.exports = { expressErrorHandler };