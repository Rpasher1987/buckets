module Api
  class ClientsController < ApplicationController

    def index
      @clients = Client.order(created_at: :desc).page(params[:page]).per(6)
      return render json: { error: 'not_found' }, status: :not_found if !@clients

      render 'api/clients/index', status: :ok
    end

    def search
      @clients = Client.order(created_at: :desc)
      return render json: { error: 'not_found' }, status: :not_found if !@clients
      render 'api/clients/search', status: :ok
    end

    def show
      # token = cookies.signed[:bucket_session_token]
      # session = Session.find_by(token: token)
      # user = session.user
      user = User.find_by(username: params[:username])
      return render json: { error: 'user_not_found' }, status: :not_found if !user
    
      @client = user.clients.find_by(id: params[:id])
      return render json: { error: 'client_not_found' }, status: :not_found if !@client
      render 'api/clients/show'
    end
    

    def create
      token = cookies.signed[:bucket_session_token]
      session = Session.find_by(token: token)
      user = session.user
      @client = user.clients.new(client_params)
      if @client.save
        render 'api/clients/create'
      end
    end

    def update
      token = cookies.signed[:bucket_session_token]
      session = Session.find_by(token: token)
      user = session.user
      client = Client.find_by(id: params[:id], user_id: user.id)
      return render json: {message: 'not authorized'}, status: :forbidden unless @client
      return render 'not_found', status: :not_found unless @client.update(client_params)
      render 'api/clients/show', status: :ok
    end

    def destroy
      token = cookies.signed[:bucket_session_token]
      session = Session.find_by(token: token)
      return render json: { success: false } unless session
      user = session.user
      client = Client.find_by(id: params[:id])
      # if client and client.user == user and client.destroy
      if client and client.destroy
        render json: {
          success: true
        }
      else
        render json: {
          success: false
        }
      end
    end

    def index_by_user
      user = User.find_by(username: params[:username])
      if user == current_user
        @clients = user.clients
        render 'api/clients/details'
      else
        render json: { error: 'not_authorized' }, status: :forbidden
      end
    end
    
    private

    def client_params
      params.require(:client).permit(:first_name, :last_name, :age, :spouse_first_name, :spouse_last_name, :spouse_age, :retirement_year, :user)
    end
   
  end
end
