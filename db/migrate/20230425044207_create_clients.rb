class CreateClients < ActiveRecord::Migration[6.1]
  def change
    create_table :clients do |t|
      t.string :first_name
      t.string :last_name
      t.integer :age
      t.string :spouse_first_name
      t.string :spouse_last_name
      t.integer :spouse_age
      t.integer :retirement_year
      t.belongs_to :user, index: true, foreign_key: true

      t.timestamps
    end
  end
end
