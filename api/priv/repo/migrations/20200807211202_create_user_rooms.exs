defmodule Sling.Repo.Migrations.CreateUserRooms do
  use Ecto.Migration

  def change do
    create table(:user_rooms, primary_key: false) do
      add :id, :binary_id, primary_key: true
      add :user_id, references(:users, on_delete: :nothing, type: :binary_id), null: false
      add :room_id, references(:rooms, on_delete: :nothing, type: :binary_id), null: false

      timestamps(type: :utc_datetime_usec)
    end

    create index(:user_rooms, [:user_id])
    create index(:user_rooms, [:room_id])
    create unique_index(:user_rooms, [:user_id, :room_id], name: :user_room_index)
  end
end
