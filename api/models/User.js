module.exports = {

   attributes: {
	  email: 
	  {
      type: 'email',
      required: true
	  },
	  password: {
      type: 'string',
      required: true
	  }
   },

  findUser: (email) => {
		return User.findOne({email: email});
  }, 

  signup: (inputs, cb) => {
    User.create({
      name: inputs.name,
      email: inputs.email,
      password: inputs.password
    })
    .exec(cb);
  }
};

