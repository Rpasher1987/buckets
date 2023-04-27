class StaticPagesController < ApplicationController
  def home
    render 'home'
  end
  
  def add_client
    render 'add_clients'
  end

  # def client_profile
  #   @client = Client.find(params[:id])
  #   @user = @client.user
  #   @cash_flows = @client.cash_flows
  #   @return_rate = @client.return_rate
  #   @data = { client_id: params[:id], username: @user.username }.to_json
  #   render 'client_profile'
  # end
  
  
  def client_profile
    @client = Client.find(params[:id])
    @user = @client.user
    @cash_flows = @client.cash_flows
    @return_rate = @client.return_rate
    puts "@client: #{@client.inspect}" # Debugging
    puts "@user: #{@user.inspect}"     # Debugging
    @data = { client_id: params[:id], username: @user.username, cash_flows: @cash_flows, return_rate: @return_rate }.to_json
    render 'client_profile'
  end  
  

  def view_clients
    @data = { username: params[:username] }.to_json
    render 'view_clients'
  end
  
end
