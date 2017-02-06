/**
 * Articles.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
  	name: {
    	type: 'string',
    	required: true
	  },
	  price: {
      type: 'float',
      required: true
	  }
  },

  add: (inputs, cb) => {
    Articles.create({
      name: inputs.name,
      price: inputs.price
    })
    .exec(cb);
  },

  getArticlesById: () => {

  }
};

