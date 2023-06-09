package routes

import (
	"mytask/handlers"
	"mytask/pkg/middleware"
	"mytask/pkg/mysql"
	repositories "mytask/repository"

	"github.com/labstack/echo/v4"
)

func TransactionRoutes(e *echo.Group) {
	transactionRepository := repositories.RepositoryTransaction(mysql.DB)
	TripRepository := repositories.RepositoryTrip(mysql.DB)
	UserRepository := repositories.RepositoryUser(mysql.DB)
	h := handlers.HandlerTransaction(transactionRepository, TripRepository, UserRepository)

	e.GET("/transactions", h.FindTransactions)
	// e.GET("/transaction/:id", h.GetTransaction)
	e.POST("/transaction", middleware.Auth(h.CreateTransaction))
	// e.PATCH("/transaction/:id", h.UpdateTransaction)
	e.POST("/notification", h.Notification)

}
