const chek = ()=>{
    if (!req.query.hasOwnProperty('link')) {
        res.redirect('404')
    }
}

module.exports = chek;