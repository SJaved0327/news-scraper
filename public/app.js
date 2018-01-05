/* Webscraping from AutoStraddle.com

<section id="article-list">
	<article>
**			<a href = article link>
				<img src=> = image link
			</a>
		</div>

		<header class="entry-header">
			<h1 class="entry-title">
**				<a> Text = article title </a>
**				<a> Text = author name </a>
			</p>
		</header>

		<div class="entry-summary">
**			<p> Text = summary of article </p>
		</div>

*/

$("#scrape-button").on("click", function(event){
	event.preventDefault();

	$.ajax({
    method: "GET",
    url: "/scrape"
  })
  	.done(function(data){

  		console.log(data);

  	})
});



