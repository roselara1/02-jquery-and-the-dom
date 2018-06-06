'use strict';

let articles = [];

// COMMENT: What is the purpose of the following function? Why is its name capitalized? Explain the context of "this" within the function. What does "rawDataObj" represent? DONE!
// The purpose is to create new articles to move into the array (and place in the page). It is capitalized because it is ia constructor function. This refers to the newly instantiated article object. rawDataObj is the input object. 

function Article (rawDataObj) {
  // TODO: Use the JS object that is passed in to complete this constructor function:
  // Save ALL the properties of `rawDataObj` into `this` DONE!
  this.title = rawDataObj.title;
  this.category = rawDataObj.category;
  this.author = rawDataObj.author;
  this.authorUrl = rawDataObj.authorUrl;
  this.publishedOn = rawDataObj.publishedOn;
  this.body = rawDataObj.body;
}

Article.prototype.toHtml = function() {
  // COMMENT: What is the benefit of cloning the article? (see the jQuery docs) DONE!
  // The benefit is that it copies all of the elements and descendent elements in the article and gives you the ability to manipulate them before re-inserting them. 

  let $newArticle = $('article.template').clone().removeClass('template');
  // /* TODO: This cloned article still has a class of template. In our modules.css stylesheet, we should give all elements with a class of template a display of none so that our template does not display in the browser. But, we also need to make sure we're not accidentally hiding our cloned article. */ DONE!!!!!!

  if (!this.publishedOn) $newArticle.addClass('draft');
  $newArticle.attr('data-category', this.category);
  $newArticle.find('a').text(this.author).attr('href', this.authorUrl).attr('target', this.authorUrl);
  $newArticle.find('h1').text(this.title);
  $newArticle.find('time').text(this.publishedOn);
  $newArticle.find('section').html(this.body);



  /* TODO: Now use jQuery traversal and setter methods to fill in the rest of the current template clone with values of the properties of this particular Article instance.
    We need to fill in:
      1. author name,
      2. author url,
      3. article title,
      4. article body, and
      5. publication date.  DONE!!*/


  // REVIEW: Display the date as a relative number of 'days ago' DONE!
  $newArticle.find('time').html('about ' + parseInt((new Date() - new Date(this.publishedOn))/60/60/24/1000) + ' days ago');
  $newArticle.append('<hr>');
  return $newArticle;
};

rawData.sort(function(a,b) {
  // REVIEW: Take a look at this sort method; This may be the first time we've seen it. Look at the docs and think about how the dates would be sorted if the callback were not included in this method.
  return (new Date(b.publishedOn)) - (new Date(a.publishedOn));
});

// TODO: Refactor these for loops using the .forEach() array method. DONE!

rawData.forEach(function(element, i) {
articles.push(new Article(rawData[i])) 
});


for(let i = 0; i < articles.length; i++) {
  $('#articles').append(articles[i].toHtml());
}
