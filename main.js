'use strict';

var movies = [];


$(document).ready(init);


function init() {
	$('#find').click(populateMovie);
	$('#search').click(movieSearch);
	// $('#getMovie').click(getMovie);
}

function populateMovie() {

	var movie = $('#movieInput').val().trim();
	var year = $('#yearInput').val().trim();
	var type = $('.movietype').val();
	// console.log(type)

	$.ajax({
		method: 'GET',
	    url: `http://www.omdbapi.com/?t=${movie}&y=${year}&$type=${type}&r=json`,

		success: function (data) {	
			console.log("data ", data)
			if(data.Response=== "True"){
				// console.log(data.Response)
				makeMovieCard(data);
			}
			else{
				notFound();
				// alert("This movie doesn't exit!!!")
			}
		},
		error: function (err) {
			console.error('error' , err);
		}
	});
}

function makeMovieCard(data) {
	
	var $card = $('#movieTemplate').clone();
	var url=`http://www.imdb.com/title/${data.imdbID}/?ref_=nv_sr_1`
	console.log(url)
	$card.removeAttr('id');

	$card.find('.cardTitle').text(data.Title);
	$card.find('.cardYear').text(data.Year);
	$card.find('.movietype').text(data.Type);
	$card.find('.cardUrl').attr('href', url);

	$card.find('.cardImage').attr('src', data.Poster);
	// $card.append($image);
	$('#result').append($card);

	return $card;
}

function notFound() {
	// console.log("Not Found message is running")
	var $message = $('<div>').text("Movies Not Found").css('font-size', '50px')
	$('#result').append($message);
}

function movieSearch(data){

	var movie = $('#movieInput').val().trim();
	var year = $('#yearInput').val().trim();
	var type = $('.movietype').val();
	
	$.ajax({
		method: 'GET',
	    url: `http://www.omdbapi.com/?s=${movie}&y=${year}&$type=${type}&r=json`,

		success: function (data) {	
			// console.log("data ", data)
			var arrayOfMovies = data.Search;
			if( movie === undefined ){
				notFound();
				// console.log(data.Response)
				// for(var i=0; i< data.Search.length; i++){
				// 	console.log("Is this working?")
				// 	searchArrayOfMovies.push(data.Search[i])
				// }
				// showSearch(data.Search);
				// console.log(searchArrayOfMovies)
			}else{
				arrayOfMovies.forEach(function(item) {
					var $poster = '<img class="col-xs-4" ' + 'src=' +item.Poster +'>'
					var $imdb = 'http://www.imdb.com/title/' + item.imdbID ;
					$('#result').append('<a href=' +$imdb + '>' + $poster + '</a>');
				});
				// alert("This movie doesn't exit!!!")
			}
		},
		error: function (err) {
			console.error('error' , err);
		}
	});

}

// function showSearch(data) {
// 	var $card = $('#movieTemplate').clone();
// 	console.log(data)
// 	for(var j=0; j<data.length; j++){
// 		$card.find('.cardImage').attr('src', data[j].Poster);
// 		console.log(data[j].Poster)
// 		console.log($card);
// 		$card.appendTo('#result');
// 	}
// $('#result').append($card);
	




// 'use strict';
// var yourName = 'Mandy'
// console.log(`hello ${yourName}`);
// var movie = $('#movieInput').val()
// var year = $('#yearInput').val()
// url: `http://www.omdbapi.com/?t=${movie}&y=${year}&plot=short&r=json`,

// http://img.omdbapi.com/?apikey=[yourkey]&