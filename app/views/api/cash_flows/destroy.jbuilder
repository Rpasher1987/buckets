json.deleted_cash_flow do
  json.id @cash_flow.id

  json.client do
    json.id @cash_flow.client.id
  end

  json.user do
    json.id @cash_flow.client.user.id
    json.username @cash_flow.client.user.username
  end
end
