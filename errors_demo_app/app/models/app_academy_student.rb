class AppAcademyStudent < ActiveRecord::Base
  validates(
    :first_name,
    :last_name,
    :age,
    :city,
    :love_for_javascript,
    :favorite_ta,
    presence: true
  )

  validates :age, numericality: { greater_than: 18 }
  validates :love_for_javascript, numericality: { greater_than: 2 }
  validates :city, inclusion: ['San Francisco', 'New York']
  validate :favorite_ta_validation

  def favorite_ta_validation
    if favorite_ta != "Charles"
      errors[:favorite_ta] << "must be Charles"
    end
  end
end
