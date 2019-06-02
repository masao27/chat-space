$(document).on('turbolinks:load', function(){
  function buildHTML(message){
 
    var img = message.image.url ? `<image src = '${message.image.url}', class: 'lower-message__image'>` : ""
    var content = message.content ? `${message.content}` : ""
  
    var html = `<div class="message">
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
      console.log(html)
      $('.messages').append(html);
      $('.form__message').val(''); 
      $('.hidden').val(''); 
      $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight});
      $(".form__submit").removeAttr("disabled");
    })
    .fail(function(data){
      alert('エラーが発生したためメッセージは送信できませんでした。');
    })
  })
});