module Api
  class CashFlowsController < ApplicationController
    def index
      puts "Params: #{params}"
      user = User.find_by(username: params[:username])
      client = user.clients.find_by(id: params[:client_id])
      @cash_flows = CashFlow.where(client_id: params[:client_id])
      render 'api/cash_flows/index'
    end    
    
    def show
      puts "Params: #{params}"
      user = User.find_by(username: params[:username])
      return render json: { error: 'user_not_found' }, status: :not_found if !user
      @client = user.clients.find_by(id: params[:client_id])
      return render json: { error: 'client_not_found' }, status: :not_found if !@client
      @cash_flow = @client.cash_flows.find_by(id: params[:id])
      return render json: { error: 'cash_flow_not_found' }, status: :not_found if !@cash_flow
      render 'api/cash_flows/show'
    end
    
    def create
      puts "Params: #{params}"
      token = cookies.signed[:bucket_session_token]
      session = Session.find_by(token: token)
      user = session.user
      client = Client.find_by(id: params[:client_id], user_id: user.id)
      return render json: {message: 'not authorized'}, status: :forbidden unless client
      @cash_flow = client.cash_flows.new(cash_flow_params)
      if @cash_flow.save
        render 'api/cash_flows/create', status: :created
      else
        render json: @cash_flow.errors, status: :unprocessable_entity
      end
    end

    def update
      puts "Params: #{params}"
      token = cookies.signed[:bucket_session_token]
      session = Session.find_by(token: token)
      user = session.user
      @client = Client.find_by(id: params[:client_id], user_id: user.id)
      return render json: { message: 'not authorized' }, status: :forbidden unless @client
      @cash_flow = @client.cash_flows.find_by(id: params[:id])
      return render json: { message: 'not authorized' }, status: :forbidden unless @cash_flow
      if @cash_flow.update(cash_flow_params)
        render 'api/cash_flows/show', status: :ok
      else
        render json: { errors: @cash_flow.errors.full_messages }, status: :unprocessable_entity
      end
    end

    def destroy
      puts "Params: #{params}"
      token = cookies.signed[:bucket_session_token]
      session = Session.find_by(token: token)
      user = session.user
      client = Client.find_by(id: params[:client_id], user_id: user.id)
      return render json: { message: 'not authorized' }, status: :forbidden unless client
      @cash_flow = client.cash_flows.find_by(id: params[:id])
      if @cash_flow.destroy
        render json: { success: true }, status: :ok
      else
        render json: { success: false }, status: :unprocessable_entity
      end
    end
    

    private
    
    def cash_flow_params
      params.require(:cash_flow).permit(:associated_with, :cf_type, :name, :amount, :cola, :start_year, :end_year)
    end    
  end
end
