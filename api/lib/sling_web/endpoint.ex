defmodule SlingWeb.Endpoint do
  use Phoenix.Endpoint, otp_app: :sling

  # use SiteEncrypt.Phoenix

  # @impl SiteEncrypt
  # def certification do
  #   SiteEncrypt.configure(
  #     client: :native,
  #     domains: ["sling.neenjaw.com"],
  #     emails: ["tim@neenjaw.com"],
  #     db_folder: Application.app_dir(:sling, Path.join(~w/priv site_encrypt/)),
  #     directory_url:
  #       case System.get_env("MODE", "local") do
  #         "local" -> {:internal, port: 4002}
  #         "staging" -> "https://acme-staging-v02.api.letsencrypt.org/directory"
  #         "production" -> "https://acme-v02.api.letsencrypt.org/directory"
  #       end
  #   )
  # end

  # The session will be stored in the cookie and signed,
  # this means its contents can be read but not tampered with.
  # Set :encryption_salt if you would also like to encrypt it.
  @session_options [
    store: :cookie,
    key: "_sling_key",
    signing_salt: "BWkabncA"
  ]

  socket "/socket", SlingWeb.UserSocket,
    websocket: true,
    longpoll: false

  socket "/live", Phoenix.LiveView.Socket, websocket: [connect_info: [session: @session_options]]

  # Serve at "/" the static files from "priv/static" directory.
  #
  # You should set gzip to true if you are running phx.digest
  # when deploying your static files in production.
  plug Plug.Static,
    at: "/",
    from: :sling,
    gzip: false,
    only: ~w(css fonts images js favicon.ico robots.txt)

  # Code reloading can be explicitly enabled under the
  # :code_reloader configuration of your endpoint.
  if code_reloading? do
    plug Phoenix.CodeReloader
    plug Phoenix.Ecto.CheckRepoStatus, otp_app: :sling
  end

  plug Phoenix.LiveDashboard.RequestLogger,
    param_key: "request_logger",
    cookie_key: "request_logger"

  plug Plug.RequestId
  plug Plug.Telemetry, event_prefix: [:phoenix, :endpoint]

  plug Plug.Parsers,
    parsers: [:urlencoded, :multipart, :json],
    pass: ["*/*"],
    json_decoder: Phoenix.json_library()

  plug Plug.MethodOverride
  plug Plug.Head

  plug Corsica,
    max_age: 600,
    allow_credentials: true,
    origins: ~r{^https?://localhost:3000$},
    allow_headers: :all

  plug Plug.Session, @session_options
  plug SlingWeb.Router
end
