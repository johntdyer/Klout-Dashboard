
function load_klout_scores(){
    $.getJSON("/klout.json").success(function(data) { 

      $.each(data, function(i, item) {  // Still ordered
         console.log(item.twitter_screen_name);
        $.ajax({    // Ajax call to twitter API using twitter name from above
            type: "GET",
            url: "http://api.twitter.com/1/users/show/"+item.twitter_screen_name+".json",
            dataType: "jsonp",
            async: false,
            cache: "false",
                success: function(json,textStatus,jqXHR) {
                    html="";
                    html +='<div class="tweets">';//' id="userId_'+json.id_str+'">';
                    html +='<li><img class="user_img" src="' + json.profile_image_url + '"/>';
                    html += '<span class="user_name">' + json.name + '</span>';
                    html += '<a class="user_link" href="http://www.twitter.com/'+json.screen_name+'">@'+json.screen_name+'</a>';
                    html +='<li>&nbsp;&nbsp;' + parseInt(item.kscore) + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + json.statuses_count + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + json.friends_count + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + json.listed_count + '</br>';
                    html +='Klout      Tweets   Followers   Listed  </li>';
                    html +='</div>';
                    $('#page_body').append(html);
                },
                error: function(jqXHR,textStatus,errorThrown) {
                    console.error("SHIT");
                }
      });
      })
    });
}