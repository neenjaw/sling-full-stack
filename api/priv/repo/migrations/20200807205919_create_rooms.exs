defmodule Sling.Repo.Migrations.CreateRooms do
  use Ecto.Migration

  def change do
    create table(:rooms, primary_key: false) do
      add :id, :binary_id, primary_key: true
      add :name, :string, null: false
      add :topic, :string, default: ""

      timestamps(type: :utc_datetime_usec)
    end

    create unique_index(:rooms, [:name])
  end
end
