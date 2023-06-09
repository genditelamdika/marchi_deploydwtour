package routes

import (
	"mytask/handlers"
	"mytask/pkg/middleware"
	"mytask/pkg/mysql"
	repositories "mytask/repository"

	"github.com/labstack/echo/v4"
)

func TripRoutes(e *echo.Group) {
	TripRepository := repositories.RepositoryTrip(mysql.DB)

	h := handlers.TripHandler(TripRepository)

	e.GET("/trip", h.GetDatasTrip)
	e.GET("/trip/:id", h.GetTrip)
	// e.POST("/trip", middleware.UploadFile(h.CreateTrip))
	e.POST("/trip", middleware.Auth(middleware.UploadFile(h.CreateTrip)))
	// e.PATCH("/trip/:id", middleware.UploadFile(h.UpdateTrip))
	e.DELETE("/trip/:id", h.DeleteTrip)
}
