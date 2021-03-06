# README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation
## users table
|Column|Type|Options|
|------|----|-------|
|name|string|null: false,  unique: true, index: true|
|email|string|null: false, default: ""|
|password|string|null: false,  default: ""|

### Association
- has_many :messages
- has_many :members 
- has_many :groups, through: :members

## groups table
|Column|Type|Options|
|------|----|-------|
|name|string|null: false|

### Association
- has_many :messages
- has_many :members 
- has_many :users, through: :members

## members table
|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :user
- belongs_to :group

## messages table
|Column|Type|Options|
|------|----|-------|
|comment|text|
|image|text|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...
