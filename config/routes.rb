Rails.application.routes.draw do
  mount RailsAdmin::Engine => '/admin', as: 'rails_admin'
  root to: 'static_pages#home'
  
  # STATIC PAGES - FRONT END!
  get '/:username/add_clients'                          => 'static_pages#add_client' # page for adding client
  get '/:username/clients/:id'                          => 'static_pages#client_profile' # Renders individual client profile page
  get '/:username/view_clients'                         => 'static_pages#view_clients' # Renders list of clients by User
  
  
  namespace :api do
    # USERS
    resources :users, only: [:create] do
      resources :clients, only: [:create, :update, :destroy]
    end
    
    # SESSIONS
    post '/sessions'                                    => 'sessions#create'
    get '/authenticated'                                => 'sessions#authenticated'
    delete '/sessions'                                  => 'sessions#destroy'
    
    # CLIENTS
    get '/users/:username/clients'                      => 'clients#index'
    get '/users/:username/clients/search'               => 'clients#search'
    get '/users/:username/clients'                      => 'clients#index_by_user'
    get '/users/:username/clients/:id'                  => 'clients#show'

    # CASH FLOWS
    post '/users/:username/clients/:client_id/cash_flows'                           => 'cash_flows#create'
    get '/users/:username/clients/:client_id/cash_flows'                            => 'cash_flows#index'
    get '/users/:username/clients/:client_id/cash_flows/:id'                        => 'cash_flows#show'
    delete '/users/:username/clients/:client_id/cash_flows/:id'                     => 'cash_flows#destroy'
    put '/users/:username/clients/:client_id/cash_flows/:id'                        => 'cash_flows#update'

    # RETURN RATES
    post '/users/:username/clients/:client_id/return_rates'                         => 'return_rates#create'
    get '/users/:username/clients/:client_id/return_rates/:id'                      => 'return_rates#show'
    put '/users/:username/clients/:client_id/return_rates/:id'                      => 'return_rates#update'
    
  end
  # REDIRECT ALL UNDEFINED ROUTES TO HOME
  # get '*path' => redirect('/')
end
