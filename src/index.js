function loadReddit(e) {
  e.preventDefault();
  var subreddit = $("#text").val();
  if (subreddit == '') {
    $("#reddit-content").empty().append($('<h1></h1>').text('Please enter a subreddit'));
  } else {
    $.getJSON("https://www.reddit.com/r/" + subreddit + ".json", function(data) {
      if (data.data.children.length < 1) {
        $("#reddit-content").empty().append($('<h1></h1>').text('Error, subreddit not found'));
        $("#reddit-content").append($('<p></p>').text('Please check your spelling and ensure entry has no spaces or special characters.'));
        return;
      }
      var group = $('<div class="group"></div>')
      $.each(data.data.children.slice(0, 10), function(i, post) {
        // var title = $('<h2></h2>')
        group.append($('<h1></h1>').text('Title: ' + post.data.title));
        // var url = $('<a href='#'></a>')
        var subGroup = $('<div class="subGroup"></div>')
        group.append($('<span class="center"></span>').text('URL: '));
        group.append($('<a></a>').attr('href', post.data.url).text(post.data.url));
        // // var ups = $('<p></p>')

        var upvotes = $('<div class="upvotes"></div>')
        upvotes.append($('<span class="upvotes-label"></span>').text('Upvotes: '));
        upvotes.append($('<span class="value"></span>').text(post.data.ups));
        subGroup.append(upvotes);

        var downvotes = $('<div class="downvotes"></div>')
        downvotes.append($('<span class="downvotes-label"></span>').text('Downvotes: '));
        downvotes.append($('<span class="value"></span>').text(post.data.downs));
        subGroup.append(downvotes);

        group.append(subGroup);
        group.append($('<hr>'));
        // $("#reddit-content").replaceWith('<br>' + 'Title: ' + post.data.title);
        // $("#reddit-content").replaceWith('<br>' + 'URL: ' + post.data.url);
        // $("#reddit-content").replaceWith('<br>' + 'Upvotes: ' + post.data.ups);
        // $("#reddit-content").replaceWith('<br>' + 'Downvotes: ' + post.data.downs);
        // $("#reddit-content").replaceWith('<hr>');
      })
      $("#reddit-content").empty().append(group);
    }).fail(function(){
      $("#reddit-content").empty().append($('<h1></h1>').text('Error, subreddit not found'));
      $("#reddit-content").append($('<p></p>').text('Please check your spelling and ensure entry has no spaces or special characters.'));
    })
  }
}

$("#subreddit-form").on("submit", loadReddit);
