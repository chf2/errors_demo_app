class CreateAppAcademyStudents < ActiveRecord::Migration
  def change
    create_table :app_academy_students do |t|
      t.string :first_name
      t.string :last_name
      t.integer :age
      t.string :city
      t.integer :love_for_javascript
      t.integer :love_for_react
      t.string :favorite_ta

      t.timestamps null: false
    end
  end
end
