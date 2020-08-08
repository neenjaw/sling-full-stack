defmodule SlingWeb.RoomController do
  use SlingWeb, :controller

  alias Sling.Chat
  alias Sling.Chat.Room
  alias Sling.Chat.UserRoom

  action_fallback SlingWeb.FallbackController

  def index(conn, _params) do
    rooms = Chat.list_rooms()
    render(conn, "index.json", rooms: rooms)
  end

  def create(conn, %{"room" => room_params}) do
    current_user_id = get_session(conn, :current_user_id)
    room_params = Map.put(room_params, "created_by_user_id", current_user_id)

    with {:room, {:ok, %Room{} = room}} <- {:room, Chat.create_room(room_params)},
         user_room_attrs <- %{user_id: current_user_id, room_id: room.id},
         {:ok, %UserRoom{}} <- Chat.create_user_room(user_room_attrs) do
      conn
      |> put_status(:created)
      |> render("show_join.json", room: room)
    else
      {:room, {:error, changeset}} ->
        errors =
          changeset
          |> Ecto.Changeset.traverse_errors(fn {msg, opts} ->
            Enum.reduce(opts, msg, fn {key, value}, acc ->
              String.replace(acc, "%{#{key}}", to_string(value))
            end)
          end)

        conn
        |> put_status(:bad_request)
        |> render("error.json", errors: %{room: errors})
    end
  end

  def join(conn, %{"id" => room_id}) do
    current_user_id = get_session(conn, :current_user_id)

    case Sling.Repo.get(Room, room_id) do
      nil ->
        conn
        |> put_status(:bad_request)
        |> render("error.json", errors: %{room: %{id: "does not exist"}})

      room ->
        with user_room_attrs <- %{user_id: current_user_id, room_id: room.id},
             {:ok, %UserRoom{}} <- Chat.create_user_room(user_room_attrs) do
          conn
          |> put_status(:accepted)
          |> render("show_join.json", room: room)
        end
    end
  end

  # def show(conn, %{"id" => id}) do
  #   room = Chat.get_room!(id)
  #   render(conn, "show.json", room: room)
  # end

  # def update(conn, %{"id" => id, "room" => room_params}) do
  #   room = Chat.get_room!(id)

  #   with {:ok, %Room{} = room} <- Chat.update_room(room, room_params) do
  #     render(conn, "show.json", room: room)
  #   end
  # end

  ##
  # When implemented, a check should be done so to prevent any user from deleting any channel
  #
  # def delete(conn, %{"id" => id}) do
  #   room = Chat.get_room!(id)

  #   with {:ok, %Room{}} <- Chat.delete_room(room) do
  #     send_resp(conn, :no_content, "")
  #   end
  # end
end
