# Script for populating the database. You can run it as:
#
#     mix run priv/repo/seeds.exs
#
# Inside the script, you can read and write to any of your
# repositories directly:
#
#     Sling.Repo.insert!(%Sling.SomeSchema{})
#
# We recommend using the bang functions (`insert!`, `update!`
# and so on) as they will fail if something goes wrong.

Sling.Account.create_user(%{email: "first@first.com", password: "qwerty", username: "First"})
Sling.Account.create_user(%{email: "second@second.com", password: "asdfgh", username: "Second"})
