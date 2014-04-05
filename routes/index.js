
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};

exports.makanapa = function(req, res){
	res.render(
		'MakanApa_frontend', 
		{
			title: 'Makan Apa', 
			serverArrayRestaurant: makanapaDB
		}
	);
}

exports.makanapabackend = function(req, res){
	res.render(
		'MakanApa_backend',
		{
			serverArrayRestaurant: makanapaDB
		}
	);	
}

exports.addrestaurant = function(req, res){
	if(req.body.hasOwnProperty('newRestaurant')){
		console.log('post success');
		makanapaDB.arrayRestaurant.push(req.body.newRestaurant);
		res.statusCode=200;
		res.send('OK');
	} else{
		console.log('post fail');
		res.statusCode = 400;
    	res.send('Error 400: Post syntax incorrect.');	
	}
}

exports.getrestaurant = function(req, res){
	res.send(makanapaDB);	
}