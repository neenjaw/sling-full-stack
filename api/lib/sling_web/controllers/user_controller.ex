defmodule SlingWeb.UserController do
  use SlingWeb, :controller

  alias Sling.Account
  alias Sling.Account.User

  import SlingWeb.UserSessionController, only: [login_user: 2, logout: 1]

  action_fallback SlingWeb.FallbackController

  def index(conn, _params) do
    users = Account.list_users()
    render(conn, "index.json", users: users)
  end

  def create(conn, %{"user" => user_params}) do
    with {:ok, %User{} = user} <- Account.create_user(user_params) do
      conn
      |> put_status(:created)
      |> render("show.json", user: user)
    end
  end

  def show(conn, %{"id" => id}) do
    user = Account.get_user!(id)
    render(conn, "show.json", user: user)
  end

  def update(conn, %{"id" => id, "user" => user_params}) do
    user = Account.get_user!(id)

    with {:ok, %User{} = user} <- Account.update_user(user, user_params) do
      render(conn, "show.json", user: user)
    end
  end

  def delete(conn, %{"id" => id}) do
    user = Account.get_user!(id)

    with {:ok, %User{}} <- Account.delete_user(user) do
      send_resp(conn, :no_content, "")
    end
  end

  def sign_in(conn, %{"email" => email, "password" => password}) do
    case Sling.Account.authenticate_user(email, password) do
      {:ok, user} ->
        conn
        |> login_user(user)
        |> configure_session(renew: true)
        |> put_status(:ok)
        |> put_view(SlingWeb.UserView)
        |> render("sign_in.json", user: user)

      {:error, message} ->
        conn
        |> delete_session(:current_user_id)
        |> assign(:current_user, nil)
        |> put_status(:unauthorized)
        |> put_view(SlingWeb.ErrorView)
        |> render("401.json", message: message)
    end
  end

  def sign_out(conn, _params) do
    conn
    |> logout()
    |> render("sign_out.json")
  end
end
