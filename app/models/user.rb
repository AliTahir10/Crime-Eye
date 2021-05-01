class User < ApplicationRecord
  # Uses the bcrypt ruby gem to hash passwords
  has_secure_password

  # Validates email is a valid format
  validates :email, presence: true, format: { with: /\A[^@\s]+@[^@\s]+\z/, message: "must be in a valid email address format."}
  validates :date_of_birth, presence: true
  validate :validate_age

  private
  def validate_age
      if date_of_birth.present? && date_of_birth > 13.years.ago.to_date
          errors.add(:date_of_birth, 'should be 13 years old or over.')
      end
  end
end
