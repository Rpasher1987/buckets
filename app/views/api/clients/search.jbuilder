json.clients do
  json.array! @clients do |client|
    json.id	client.id
      json.first_name	client.first_name
      json.last_name	client.last_name
      json.spouse_first_name	client.spouse_first_name
      json.retirement_year	client.retirement_year
  end
end