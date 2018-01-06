/* Scrape button */

$("#scrape-button").on("click", (event) => {
	event.preventDefault();

  $("#article-div").empty();

	$.ajax({
    method: "GET",
    url: "/scrape"
  })
  	.done((data) => {

  		if (data){
  			alert(`You've got ${data.length} epic lists to read!`);
  		}else{
  			alert(`No epic lists today!`);
  		}
  		
  		data.forEach((item) => {

  			const article = $("<div class='card'>");

  			article.append(`<h5 class='card-header'><a target='_blank' href='${item.link}'>${item.title}</a></h5>`);

  			article.append(`<div class='card-body'><p class='card-text'>${item.summary}</p></div>`);

  			$("#article-div").append(article);

  		};

  	});

});

/* Saved Articles Button */

$("#scrape-button").on("click", (event) => {

  event.preventDefault();

  $("#article-div").empty();

  $.ajax({
    method: "GET",
    url: "/articles"
  })
    .done((data) => {

      if (data){
        alert(`You've got ${data.length} epic lists to read!`);
      }else{
        alert(`No epic lists today!`);
      }
      
      data.forEach((item) => {

        const article = $("<div class='card'>");

        article.append(`<h5 class='card-header'><a target='_blank' href='${item.link}'>${item.title}</a></h5>`);

        article.append(`<div class='card-body'><p class='card-text'>${item.summary}</p></div>`);

        $("#article-div").append(article);

      };

    });

});

