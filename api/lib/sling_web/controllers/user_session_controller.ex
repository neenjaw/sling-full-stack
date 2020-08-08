defmodule SlingWeb.UserSessionController do
  use SlingWeb, :controller

  def login_user(conn, user) do
    conn
    |> put_session(:current_user_id, user.id)
    |> assign(:current_user, user)
  end

  def logout(conn) do
    conn
    |> delete_session(:current_user_id)
    |> assign(:current_user, nil)
  end

  def current_user(conn) do
    conn.assigns[:current_user] || load_current_user(conn)
  end

  defp load_current_user(conn) do
    id = get_session(conn, :current_user_id)

    if id do
      user = Sling.Repo.get!(Sling.Account.User, id)
      login_user(conn, user)
    end
  end
end
