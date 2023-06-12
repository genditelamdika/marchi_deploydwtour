package routes

import (
	"mytask/handlers"
	"mytask/pkg/middleware"
	"mytask/pkg/mysql"
	repositories "mytask/repository"

	"github.com/labstack/echo/v4"
)

func UserRoutes(e *echo.Group) {
	userRepository := repositories.RepositoryUser(mysql.DB)
	h := handlers.UserHandler(userRepository)

	e.GET("/users", h.FindUsers)
	e.GET("/user", middleware.Auth(h.GetUser))
	e.POST("/user", h.CreateUser)
	e.DELETE("/user/:id", h.DeleteUser)
	e.PATCH("/user/:id", middleware.UploadFile(h.UpdateUser))

}
