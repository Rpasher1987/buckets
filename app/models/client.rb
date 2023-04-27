class Client < ApplicationRecord
  belongs_to :user
  has_many :cash_flows
  has_one :return_rate

  validates :user, presence: true
  validates :first_name, presence: true, length: {maximum: 40}
  validates :last_name, presence: true, length: {maximum: 60}
  validates :age, presence: true, length: {maximum: 3}
  validates :spouse_first_name, length: {maximum: 40}, allow_blank: true
  validates :spouse_last_name, length: {maximum: 60}, allow_blank: true
  validates :spouse_age, length: {maximum: 3}, allow_blank: true
  validates :retirement_year, presence: true, numericality: { only_integer: true }
end