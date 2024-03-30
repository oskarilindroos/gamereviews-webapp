package db

import (
	"database/sql"
	"fmt"
	"log"
	"os"

	"github.com/go-sql-driver/mysql"
)

func ConnectToDB() (*sql.DB, error) {
	var db *sql.DB
	// Capture connection properties
	cfg := mysql.Config{
		User:      os.Getenv("DB_USER"),
		Passwd:    os.Getenv("DB_PASSWORD"),
		Net:       os.Getenv("DB_NET"),
		Addr:      os.Getenv("DB_ADDR"),
		DBName:    os.Getenv("DB_DATABASE"),
	}

	// Get database handle
	var err error
	db, err = sql.Open("mysql", cfg.FormatDSN())
	if err != nil {
		log.Fatal(err)
		return nil, err
	}

	pingErr := db.Ping()
	if pingErr != nil {
		log.Fatal(pingErr)
		return nil, pingErr
	}
	fmt.Println("connected!")

	return db, nil
}

