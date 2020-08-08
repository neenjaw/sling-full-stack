defmodule SlingWeb.RoomView do
  use SlingWeb, :view
  alias SlingWeb.RoomView

  def render("index.json", %{rooms: rooms}) do
    %{data: render_many(rooms, RoomView, "room.json")}
  end

  def render("show.json", %{room: room}) do
    %{data: render_one(room, RoomView, "room.json")}
  end

  def render("show_join.json", %{room: room}) do
    %{
      data: %{
        room: render_one(room, RoomView, "room.json"),
        joined: true
      }
    }
  end

  def render("room.json", %{room: room}) do
    %{id: room.id, name: room.name, topic: room.topic}
  end
end
