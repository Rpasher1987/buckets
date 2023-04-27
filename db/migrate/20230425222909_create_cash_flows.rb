class CreateCashFlows < ActiveRecord::Migration[6.1]
  def change
    create_table :cash_flows do |t|
      t.string :associated_with
      t.string :cf_type
      t.string :name
      t.decimal :amount, precision: 10, scale: 2
      t.decimal :cola, precision: 10, scale: 2
      t.integer :start_year
      t.integer :end_year
      t.belongs_to :client, index: true, foreign_key: true

      t.timestamps
    end
  end
end
