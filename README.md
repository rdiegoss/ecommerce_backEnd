# BACK-END #

### Install dependencies project

back-end requires [Node.js](https://nodejs.org/) latest version to run.

Install the dependencies and devDependencies and start the server.

```sh
$ cd ecommerce_backEnd
$ npm install
$ sails lift
```

### Database configuration
	- this project run in memory, that is, if you close server, re-run yours scripts.
	- but it configured for MongoDB, MySqlServer too.

# Level 1 #

* ROUTES 
	 This route create an user to autentication others rests
	-  POST http://localhost:[port]/signup
	  - type head to send : Application/json or form-data
	  
			 body: 
				{
		    	    "email": yourEmail,
			  	    "password": yourPass
				}
	  
	
	#### Login to test you user created
	- GET http://localhost:[portServerStarted]/login/[userCreated]
	
	#### Add new articles (optional)
	- POST http://localhost:[portServerStarted]/article
      - type head to send : Application/json(raw) or form-data
      
				 body: 
					{
					    "name": "water",
						"price": 1000
					}
		
	#### Add articles in your cart (data.json)
	- POST http://localhost:[portServerStarted]/user/rdiegoss@teste.com/cart/products
	  - type head to send : Application/json(raw) or form-data
	   
             body: 
	            {
    			  "articles": [
    				{ "id": 1, "name": "water", "price": 200 },
    				{ "id": 2, "name": "honey", "price": 300 },
    				{ "id": 3, "name": "mango", "price": 500 },
    				{ "id": 4, "name": "tea", "price": 2000 }
    			  ],
    			  "carts": [
    				{
    				  "id": 1,
    				  "items": [
    					{ "article_id": 1, "quantity": 1 },
    					{ "article_id": 2, "quantity": 1 },
    					{ "article_id": 4, "quantity": 1 }
    				  ]
    				},
    				{
    				  "id": 2,
    				  "items": [
    					{ "article_id": 2, "quantity": 1 },
    					{ "article_id": 3, "quantity": 1 }
    				  ]
    				},
    				{
    				  "id": 3,
    				  "items": []
    				}
    			  ],
    			  "delivery_fees": [
    				{
    				  "eligible_transaction_volume": {
    					"min_price": 0,
    					"max_price": 1000
    				  },
    				  "price": 800
    				},
    				{
    				  "eligible_transaction_volume": {
    					"min_price": 1000,
    					"max_price": 2000
    				  },
    				  "price": 400
    				},
    				{
    				  "eligible_transaction_volume": {
    					"min_price": 2000,
    					"max_price": null
    				  },
    				  "price": 0
    				}
    			  ]
    		  }

	#### Find you cart with items added
	- GET http://localhost:1337/user/[userCreated]/cart

	#### Calcule total items added in cart
	- GET http://localhost:[portServerStarted]/user/[userCreated]/cart/calculateItems

	* Finish Level 1

 # Level 2 #
  
  * Calcule total Delivery
	- GET http://localhost:[portServerStarted]/user/[userCreated]/cart/calculateDelivery


### This backEnd have supported for SocketIO, JWT Authentication, Policies, and others.