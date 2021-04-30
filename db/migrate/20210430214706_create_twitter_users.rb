class CreateTwitterUsers < ActiveRecord::Migration[6.1]
  def change
    create_table :twitter_users do |t|
      t.string :provider
      t.string :uid
      t.string :name
      t.string :email
      t.string :token
      t.string :secret
      t.string :profile_image

      t.timestamps
    end
  end
end
