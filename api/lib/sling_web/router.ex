defmodule SlingWeb.Router do
  use SlingWeb, :router

  pipeline :api do
    plug :accepts, ["json"]
    plug :fetch_session
  end

  pipeline :api_auth do
    plug :ensure_authenticated
  end

  scope "/api", SlingWeb do
    pipe_through :api
    post "/sign_in", UserController, :sign_in
    post "/sign_out", UserController, :sign_out
  end

  scope "/api", SlingWeb do
    pipe_through [:api, :api_auth]

    # Users
    resources "/users", UserController, except: [:edit, :new]
    get "/users/:id/rooms", UserController, :rooms

    # Rooms
    resources "/rooms", RoomController, only: [:index, :create]
    post "/rooms/:id/join", RoomController, :join
  end

  # Enables LiveDashboard only for development
  #
  # If you want to use the LiveDashboard in production, you should put
  # it behind authentication and allow only admins to access it.
  # If your application does not have an admins-only section yet,
  # you can use Plug.BasicAuth to set up some basic authentication
  # as long as you are also using SSL (which you should anyway).
  if Mix.env() in [:dev, :test] do
    import Phoenix.LiveDashboard.Router

    scope "/" do
      pipe_through [:fetch_session, :protect_from_forgery]
      live_dashboard "/dashboard", metrics: SlingWeb.Telemetry
    end
  end

  # Plug function
  defp ensure_authenticated(conn, _opts) do
    current_user_id = get_session(conn, :current_user_id)

    if current_user_id do
      conn
    else
      conn
      |> put_status(:unauthorized)
      |> put_view(SlingWeb.ErrorView)
      |> render("401.json", message: "Unauthenticated user")
      |> halt()
    end
  end
end
