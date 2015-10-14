class AppAcademyStudent < ActiveRecord::Base
  validates(
    :first_name,
    :first_name, 
    :last_name,
    :age,
    :city,
    :love_for_javascript,
    :love_for_react,
    :favorite_ta,
    presence: true
  )

  validates :age, numericality: { greater_than: 18 }
  validates :love_for_javascript, numericality: { less_than: 5 }
  validates :city, inclusion: ['San Francisco', 'New York']
  validates :love_for_react, numericality: { greater_than: 9000 }
  validate :favorite_ta_validation

  def favorite_ta_validation
    if favorite_ta != "Charles"
      errors[:favorite_ta] << "Favorite TA must be Charles"
    end
  end
end
