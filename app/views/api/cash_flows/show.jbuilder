json.cash_flow do
  json.id @cash_flow.id
  json.associated_with @cash_flow.associated_with
  json.cf_type @cash_flow.cf_type
  json.name @cash_flow.name
  json.amount @cash_flow.amount
  json.cola @cash_flow.cola
  json.start_year @cash_flow.start_year
  json.end_year @cash_flow.end_year

  json.client do
    json.id @cash_flow.client.id
  end

  json.user do
    json.id @cash_flow.client.user.id
    json.username @cash_flow.client.user.username
  end
end
