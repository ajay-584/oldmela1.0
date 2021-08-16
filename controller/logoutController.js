exports.logout = (req, res, next) => {
  try{
    req.session.destroy();
    return res.redirect('/login');
  }catch(e){
    console.log(e);
    next();
  }
}