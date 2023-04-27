json.clients do
  json.array! @clients do |client|
    json.id	client.id
    json.first_name	client.first_name
    json.last_name	client.last_name
    json.age	client.age
    json.spouse_first_name	client.spouse_first_name
    json.spouse_last_name	client.spouse_last_name
    json.spouse_age	client.spouse_age
    json.retirement_year	client.retirement_year
  end
end