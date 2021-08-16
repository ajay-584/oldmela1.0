

exports.logout = (req, res, next)=>{
    try{
        req.session.destroy();
        return res.redirect('/admin/admin_login');
    }catch(e){
        console.log(e);
        next();
    }
}