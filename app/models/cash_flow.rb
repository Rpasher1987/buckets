class CashFlow < ApplicationRecord
  belongs_to :client

  validates :associated_with, presence: true, allow_blank: true
  validates :cf_type, presence: true, allow_blank: true
  validates :name, presence: true, length: {maximum: 40}, allow_blank: true
  validates :amount, presence: true, length: {maximum: 25}, allow_blank: true
  validates :cola, presence: true, length: {maximum: 5}, allow_blank: true
  validates :start_year, presence: true, length: {maximum: 4}, allow_blank: true
  validates :end_year, presence: true, length: {maximum: 4}, allow_blank: true
end
