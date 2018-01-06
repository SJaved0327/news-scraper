/* Scrape button */

$("#scrape-button").on("click", function(event){
	event.preventDefault();

	$.ajax({
    method: "GET",
    url: "/scrape"
  })
  	.done(function(data){

  		if (data){
  			alert(`You've got ${data.length} epic lists to read!`);
  		}else{
  			alert(`No epic lists today!`);
  		}
  		
  		for(var i = 0; i < data.length; i++){
  			
  			var row = data[i];

  			var article = $("<div class='card'>");

  			article.append(`<h5 class='card-header'><a target='_blank' href='${data[i].link}'>${data[i].title}</a></h5>`);

  			article.append(`<div class='card-body'><p class='card-text'>${data[i].summary}</p></div>`);

  			$("#article-div").append(article);

  		};

  	});

});



