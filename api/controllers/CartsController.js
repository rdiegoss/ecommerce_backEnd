

module.exports = {
	create: (req, res) => {
		let list = {articles: req.body.articles, carts: req.body.carts, delivery_fees: req.body.delivery_fees}
		return Carts.addCart({
			userId: req.param('id'),
			listCart: list
		}).then(cartCreated => {
			if (cartCreated) {
        return res.ok(cartCreated);
      }
		}).catch(err => { return res.json(err) });
	},

	calculateByUser: (req, res) => {
		let userId = req.param('id');
		return Carts.calculateCartByUser(userId)
			.then(cartFound => {
				return res.ok(cartFound);	
			}).catch(err => { return err });
	},

	findByUser: (req, res) => {
		let userId = req.param('id');
		let x = (cartFound) => { return res.ok(cartFound.items)	};
		Carts.findCartByUser(userId).then(x).catch(err => { return err });
	},

	calculateDelivery: (req, res) => {
		let userId = req.param('id');
		let x = (deliveryCalculated) => { return res.ok(deliveryCalculated)	};
		Carts.calculateDelivery(userId).then(x).catch(err => { return err });
	}
};

