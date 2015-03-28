class AddPassword < ActiveRecord::Migration
  def change
    add_column :users, :password_digest, :string
    add_column :users, :salt, :float

    User.reset_column_information

    users = User.all
    users.each do |user|
      user.salt = Random.rand
      user.password_digest = Digest::SHA1.hexdigest(user.last_name.downcase + user.salt.to_s)
      user.save(:validate => false)
    end
  end
end