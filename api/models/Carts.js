/**
 * Carts.js
 *
 * @description : Module to add/find and calculate items in cart
 */

let User = require('./User');
let _ = require('lodash');

module.exports = {

  attributes: {
  	userId: {
  		type: 'string'
  	},
  	items: {
  		type: 'json',
  		required: true
  	}
  },

  addCart: (inputs, cb) => {
  	return User.findUser(inputs.userId)
  		.then(usrFound => {
  			if (usrFound) {
  				return Carts.create({
  					userId: inputs.userId,
  					items: inputs.listCart
  				}).then(cartCreated => {
  					return cartCreated.items;
  				}).catch(err => { return err });
  			} else {
  				return 'User not Found!';
  			}
  		}).catch(err => { return err });
  },

  findCartByUser: (usr) => {
  	let x = (usrFound) => {
  		if (usrFound) {
  			return Carts.findOne({userId: usr});
  		} else {
  			return 'User not Found!';
  		}
  		
  	}
  	return User.findUser(usr).then(x);
  },

  calculateCartByUser: (usr) => {
  	return User.findUser(usr)
  		.then(usrFound => {
  			if (usrFound) {
  				let calculeTotal = (cartFound) =>  {
  					return Carts.calculeTotalCart(cartFound.items);
  				}
  				return Carts.findOne({ userId: usr }).then(calculeTotal);
  			} else {
  				return 'User not Found!';
  			}
  		}).catch(err => { return err });
  },

  calculeTotalCart: (list) => {
  	let totalByIdCart = {carts: []};
  	let carts = [];
  	list.carts.forEach(cartItems => {
  		let totalByItem = [];
  		carts.push(cartItems);
  		cartItems.items.forEach(item => {
  			let price;
  			let article_idCart = item.article_id;
  			let quantityItem = item.quantity;

  			let priceceArticle = (article) => {
  				if (article.id == article_idCart) {
  					return price = article.price;
  				}
  			}

  			list.articles.filter(priceceArticle);
  			totalByItem.push({id: article_idCart, totalItemArticle: quantityItem * price})
  		});

  		if (totalByItem.length) {
  			let count = 0;
  			totalByItem.forEach(x => {
  				count += x.totalItemArticle;
  			});

  			totalByIdCart.carts.push({id: cartItems.id, total: count});
  		}
  	});
  	let unionArray = _.uniqBy(_.union(totalByIdCart.carts, carts), 'id');
  	let objReCalculated = {carts: unionArray};
  	return objReCalculated;
  },

  calculateDelivery: (usr) => {
  	let objReCalculated = {carts: []};
  	let mergeObjects;
  	let x = (cartFound) => {
  		return Carts.calculateCartByUser(usr).then(totalCalculated => {
  			totalCalculated.carts.forEach(item => {
  				cartFound.items.delivery_fees.forEach(deliveryFees => {
  					let eligibleMinPrice = deliveryFees.eligible_transaction_volume.min_price;
  					let eligibleMaxPrice = deliveryFees.eligible_transaction_volume.max_price;

  					if (item.total > eligibleMinPrice && item.total < eligibleMaxPrice) {
  						objReCalculated.carts.push({id: item.id, total: item.total += deliveryFees.price})
  					}

  				});
  			});
  			let unionArray = _.uniqBy(_.union(totalCalculated.carts, objReCalculated.carts), 'id');
  			let deliveryCalculated = {carts: unionArray};
  			return deliveryCalculated;
  		})
  		
  	}
  	return Carts.findCartByUser(usr).then(x).catch(err => { return err });
  }
};

