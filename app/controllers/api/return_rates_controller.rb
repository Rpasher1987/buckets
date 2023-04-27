module Api
  class ReturnRatesController < ApplicationController
    
    # def index
    #   user = User.find_by(username: params[:username])
    #   client = user.clients.find_by(id: params[:client_id])
    #   @return_rates = ReturnRate.where(client_id: params[:client_id])
    #   render 'api/return_rates/index'
    # end

    def create
      token = cookies.signed[:bucket_session_token]
      session = Session.find_by(token: token)
      user = session.user
      client = Client.find_by(id: params[:client_id], user_id: user.id)
      @return_rate = client.return_rate.new(return_rate_params)
      if @return_rate.save
        render 'api/return_rates/show', status: :created
      else
        render json: @return_rate.errors, status: :unprocessable_entity
      end
    end

    def show
      user = User.find_by(username: params[:username])
      client = user.clients.find_by(id: params[:client_id])
      @return_rate = client.return_rates.find_by(id: params[:id])
      return render json: { error: 'return_rate_not_found' }, status: :not_found if !@return_rate 
      render 'api/return_rates/show'
    end

    def update
      token = cookies.signed[:bucket_session_token]
      session = Session.find_by(token: token)
      user = session.user
      @client = Client.find_by(id: params[:client_id], user_id: user.id)
      return render json: { message: 'not authorized' }, status: :forbidden unless @client
      @return_rate = @client.return_rates.find_by(id: params[:id])
      return render json: { message: 'not authorized' }, status: :forbidden unless @return_rate
      if @return_rate.update(return_rate_params)
        render 'api/return_rates/show', status: :ok
      else
        render json: { errors: @return_rate.errors.full_messages }, status: :unprocessable_entity
      end
    end 

    private

    def return_rate_params
      params.require(:return_rate).permit(:preservation, :income, :growth, :retirement_assets)
    end
  end
end

