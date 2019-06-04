$(document).on('turbolinks:load', function(){
  function buildHTML(message){
 
    var img = message.image.url ? `<image src = '${message.image.url}', class: 'lower-message__image'>` : ""
    var content = message.content ? `${message.content}` : ""

    var html = `<div class="message" data-id=${message.id}>
                  <div class="upper-message">
                    <div class="upper-message__user-name">
                      ${message.user_name}  
                    </div>
                    <div class="upper-message__date">
                      ${message.date}
                    </div>
                  </div>
                  <div class="lower-meesage">
                    <p class="lower-message__content">
                      ${content}
                    </p>
                    ${img}
                  </div>
                </div>`
    return html;
  }
  
  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var message = new FormData(this);
    var url = (window.location.href); 
    $.ajax({  
      url: url,
      type: 'POST',
      data: message,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.messages').append(html);
      $('form')[0].reset();
      $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight});
      $(".form__submit").removeAttr("disabled");
    })
    .fail(function(data){
      alert('エラーが発生したためメッセージは送信できませんでした。');
    })
  })

  var reloadMessages = function() {
    var group_id = location.pathname.split('/')[2]
    var message_id = $('.message').last().data('id');
    var make_url = location.pathname.replace("messages","api/messages.json")

    $.ajax({
      url: make_url,
      type: 'get',
      data: {group_id,message_id},
      dataType: 'json'
    })
    .done(function(messages) {
      messages.forEach(function(message) {
        var html = buildHTML(message);
        $('.messages').append(html);
        $(".messages").animate({scrollTop:$('.messages')[0].scrollHeight});
      })
    })
    .fail(function() {
      alert('自動更新に失敗しました');
    });
  };

  if (location.pathname.match(/\/groups\/\d+\/messages/)){
    setInterval(reloadMessages, 5000);
  }

});
