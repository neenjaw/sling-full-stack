defmodule Sling.Chat.Room do
  use Ecto.Schema
  import Ecto.Changeset

  alias Sling.Account.User

  @primary_key {:id, :binary_id, autogenerate: true}
  @foreign_key_type :binary_id
  schema "rooms" do
    field :name, :string
    field :topic, :string

    field :created_by_user_id, :binary_id
    belongs_to :user, User, define_field: false

    many_to_many :users, User, join_through: "user_rooms"

    timestamps(type: :utc_datetime_usec)
  end

  @doc false
  def changeset(room, attrs) do
    room
    |> cast(attrs, [:name, :topic, :created_by_user_id])
    |> validate_required([:name, :created_by_user_id])
    |> unique_constraint(:name)
  end
end
