json.cash_flows do
  json.array! @cash_flows do |cash_flow|
    json.id	cash_flow.id
    json.associated_with	cash_flow.associated_with
    json.cf_type	cash_flow.cf_type
    json.name	cash_flow.name
    json.amount	cash_flow.amount
    json.cola	cash_flow.cola
    json.start_year	cash_flow.start_year
    json.end_year	cash_flow.end_year
  end
end