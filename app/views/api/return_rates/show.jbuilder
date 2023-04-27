json.return_rate do
  json.id @return_rate.id
  json.preservation @return_rate.preservation
  json.income @return_rate.income
  json.growth @return_rate.growth
  json.retirement_assets @return_rate.retirement_assets

  json.client do
    json.id @return_rate.client.id
  end

  json.user do
    json.id @return_rate.client.user.id
    json.username @return_rate.client.user.username
  end
end
