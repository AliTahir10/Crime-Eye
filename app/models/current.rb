class Current < ActiveSupport::CurrentAttributes
  # Keeps track of the current user account for different requests
  attribute :user
end
