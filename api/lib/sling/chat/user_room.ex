defmodule Sling.Chat.UserRoom do
  use Ecto.Schema
  import Ecto.Changeset

  @primary_key {:id, :binary_id, autogenerate: true}
  @foreign_key_type :binary_id
  schema "user_rooms" do
    belongs_to :user, Sling.Account.User
    belongs_to :room, Sling.Chat.Room

    timestamps(type: :utc_datetime_usec)
  end

  @doc false
  def changeset(user_room, attrs) do
    attrs
    |> IO.inspect(label: "16")

    user_room
    |> cast(attrs, [:user_id, :room_id])
    |> validate_required([:user_id, :room_id])
    |> unique_constraint([:user_id, :room_id], name: :user_room_index)
  end
end
