FROM golang:1.22.1

WORKDIR /app

COPY go.mod go.sum ./

RUN go mod download && go mod verify

COPY . .

RUN go build .../cmd/review-app 

EXPOSE 5050

CMD ["./review-app"]