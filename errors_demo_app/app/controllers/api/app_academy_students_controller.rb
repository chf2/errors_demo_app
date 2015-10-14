class Api::AppAcademyStudentsController < ApplicationController
  def create
    @student = AppAcademyStudent.new(student_params)
    if @student.save
      render json: @student
    else
      render json: @student.errors.full_messages, status: 422
    end
  end

  private

  def student_params
    params
      .require(:app_academy_student)
      .permit(
        :first_name, 
        :last_name,
        :age,
        :city,
        :love_for_javascript,
        :love_for_react,
        :favorite_ta
      )
  end
end
