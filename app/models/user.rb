class User < ApplicationRecord
  # Uses the bcrypt ruby gem to hash passwords
  has_secure_password

  validates :email, presence: true, format: { with: /\A[^@\s]+@[^@\s]+\z/, message: "Must be a valid email address format!"}
end
