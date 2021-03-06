class AppointmentsController < ApplicationController
  def deny
  end

  def accept
    @appointment = Appointment.find(params[:id])
    @appointment.status = "Accepted"
    @appointment.save
    redirect_to profile_path(current_user)
  end

  def deny
    @appointment = Appointment.find(params[:id])
    @appointment.status = "Rejected"
    @appointment.save
    redirect_to profile_path(current_user)
  end

  def show
    @appointment = Appointment.find(params[:id])
  end

  # This needs to go to Dog#show
  # def new
  #   @appointment = Appointment.new
  # end

  def create
    @dog = Dog.find(params[:dog_id])
    @appointment = Appointment.new(appointment_params)

    @appointment.user = current_user
    @appointment.dog = @dog

    if @appointment.save
      redirect_to profile_path(current_user)
    else
      render 'dogs/show'
    end
  end

  private

  def appointment_params
    params.require(:appointment).permit(:request_message, :date, :time_start, :time_end)
  end
end
