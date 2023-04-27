class ReturnRate < ApplicationRecord
  belongs_to :client

  validates :preservation, length: {maximum: 5}, allow_blank: true
  validates :income, length: {maximum: 5}, allow_blank: true
  validates :growth, length: {maximum: 5}, allow_blank: true
  validates :retirement_assets, length: {maximum: 25}, allow_blank: true
end
