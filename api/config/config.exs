# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.

# General application configuration
use Mix.Config

config :sling,
  ecto_repos: [Sling.Repo],
  generators: [binary_id: true]

# Configures the endpoint
config :sling, SlingWeb.Endpoint,
  url: [host: "localhost"],
  secret_key_base: "IM4B9zXYVefR+08LYIet6wnXZQqtkFHxNMJ7DAEJ7AT4KVfYNsz/HvhIuOf9MmPq",
  render_errors: [view: SlingWeb.ErrorView, accepts: ~w(json), layout: false],
  pubsub_server: Sling.PubSub,
  live_view: [signing_salt: "B6bakbkH"]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

# Use Jason for JSON parsing in Phoenix
config :phoenix, :json_library, Jason

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env()}.exs"
