exports.logout = (req, res) => {
    req.session.destroy((err, result) => {
      if (err) throw err
    //   console.log("logout ho gya", result);
    })
    return res.redirect('/login');
  }