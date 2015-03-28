class Photo < ActiveRecord::Base

  belongs_to :user
  has_many :comments
  has_many :tags

  validates_presence_of :user_id, :message => "must be logged in to upload photo"

  def self.search(substring)
    return [] if substring.nil? or substring.empty?
    comments = Comment.select { |comment| comment.comment.downcase.include?(substring.downcase)}
    tags = Tag.select { |tag| tag.user.first_name.downcase.include?(substring.downcase) or
        tag.user.last_name.downcase.include?(substring.downcase)}
    photos = []
    comments.each do |comment|
      if !photos.include?(comment.photo)
        photos << comment.photo
      end
    end
    tags.each do |tag|
      if !photos.include?(tag.photo)
        photos << tag.photo
      end
    end
    return photos
  end

end