/**
 * ArticlesController
 *
 * @description :: Server-side logic for managing articles
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	add: (req, res) => {
		Articles.add({
      name: req.param('name'),
      price: req.param('price')
    }, (err, articleCreated) => {
      if (articleCreated) {
        return res.ok('Article created!');
      } else {
      	return res.json(err);
      }
    });
	}
};

