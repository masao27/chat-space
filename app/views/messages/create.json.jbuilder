json.user_name  @message.user.name
json.date       (@message.created_at + (60*60*9)).strftime("%Y/%m/%d %H:%M")
json.content    @message.content
json.image      @message.image
json.id         @message.id