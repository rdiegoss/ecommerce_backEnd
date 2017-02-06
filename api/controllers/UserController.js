module.exports = {
	/**
   * `UserController.login()`
   */
  login: (req, res) => {

    let x = (usr) => {
        if (usr) {
          return res.ok('Logged! :)');
        } else {
          return res.ok('Usuário não encontrado!');
        }  
      }; 
    return User.findUser(req.param('email')).then(x);
  },

  /**
   * `UserController.logout()`
   */
  logout: (req, res) => {
    return res.json({
      todo: 'logout() is not implemented yet!'
    });
  },


  signup: (req, res) => {
    User.signup({
      name: 'test-Joyjet',
      email: req.param('email'),
      password: req.param('password')
    }, function (err, user) {
      if (err) return res.negotiate(err);
      req.session.me = user.id;
      if (req.wantsJSON) {
        return res.ok('Signup successful!');
      }
      return res.redirect('/welcome');
    });
  }
};

