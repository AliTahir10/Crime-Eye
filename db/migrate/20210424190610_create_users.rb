class CreateUsers < ActiveRecord::Migration[5.2]
  def change
    create_table :users do |t|
      t.string :email, null: false
      t.date :date_of_birth
      t.string :password_digest

      t.timestamps
    end
  end
end
