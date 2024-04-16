# ReviewApp Golang Backend

## To run the project locally

1. Copy the following into backend/.env.development:
```
CORS_ORIGIN=http://localhost:5173
PORT=5050
DB_USER=admin
DB_PASSWORD=admin
DB_NET=tcp
DB_ADDR=localhost
DB_DATABASE=review_db

TWITCH_CLIENT_ID= {Your_igdb_id}
IGDB_TOKEN_TILL_17_05 = {Your_igdb_token}
```
2. Install Go.
3. Create .env file in the root directory with DB credentials etc.
4. `go run cmd/review-app/main.go`

