class Comment < ActiveRecord::Base

  belongs_to :photo
  belongs_to :user

  validates_presence_of :comment, :message => "can't be blank"

  validates_presence_of :user_id, :message => "must be logged in to comment"
  
end