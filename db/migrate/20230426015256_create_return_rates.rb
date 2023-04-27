class CreateReturnRates < ActiveRecord::Migration[6.1]
  def change
    create_table :return_rates do |t|
      t.decimal :preservation
      t.decimal :income
      t.decimal :growth
      t.decimal :retirement_assets
      t.belongs_to :client, index: true, foreign_key: true

      t.timestamps
    end
  end
end
