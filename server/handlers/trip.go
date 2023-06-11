package handlers

import (
	"context"
	"fmt"
	dto "mytask/dto/result"
	tripdto "mytask/dto/trip"
	"mytask/models"
	repositories "mytask/repository"
	"net/http"
	"os"
	"strconv"

	"github.com/cloudinary/cloudinary-go/v2"
	"github.com/cloudinary/cloudinary-go/v2/api/uploader"
	"github.com/go-playground/validator"
	"github.com/golang-jwt/jwt/v4"
	"github.com/labstack/echo/v4"
)

// var path_file = "http://localhost:5000/uploads/"

type HandlerTrip struct {
	TripRepository repositories.TripRepository
}

func TripHandler(TripRepository repositories.TripRepository) *HandlerTrip {
	return &HandlerTrip{TripRepository}

}

func (h *HandlerTrip) GetDatasTrip(c echo.Context) error {
	trips, err := h.TripRepository.GetDatasTrip()
	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}

	// for i, p := range trips {
	// 	trips[i].Image = path_file + p.Image
	// }

	return c.JSON(http.StatusOK, dto.SuccessResult{Code: http.StatusOK, Data: trips})
}

func (h *HandlerTrip) GetTrip(c echo.Context) error {
	id, _ := strconv.Atoi(c.Param("id"))

	trip, err := h.TripRepository.GetTrip(id)
	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}

	// trip.Image = path_file + trip.Image

	return c.JSON(http.StatusOK, dto.SuccessResult{Code: http.StatusOK, Data: TripConvert(trip)})
}

func (h *HandlerTrip) CreateTrip(c echo.Context) error {
	userLogin := c.Get("userLogin")
	role := userLogin.(jwt.MapClaims)["role"].(string)
	fmt.Println(role, "'ini role'")
	// if role == "admin" {
	dataFile := c.Get("dataFile").(string)
	fmt.Println("this is data file", dataFile)

	day, _ := strconv.Atoi(c.FormValue("day"))
	price, _ := strconv.Atoi(c.FormValue("price"))
	quota, _ := strconv.Atoi(c.FormValue("quota"))
	night, _ := strconv.Atoi(c.FormValue("night"))

	request := tripdto.CreateTripRequest{
		Title:          c.FormValue("title"),
		Country:        c.FormValue("country"),
		Accomodation:   c.FormValue("accomodation"),
		Transportation: c.FormValue("transportation"),
		Eat:            c.FormValue("eat"),
		Day:            day,
		Night:          night,
		DateTrip:       c.FormValue("datetrip"),
		Price:          price,
		Quota:          quota,
		Description:    c.FormValue("description"),
		Image:          dataFile,
	}

	validation := validator.New()
	err := validation.Struct(request)
	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}

	var ctx = context.Background()
	var CLOUD_NAME = os.Getenv("CLOUD_NAME")
	var API_KEY = os.Getenv("API_KEY")
	var API_SECRET = os.Getenv("API_SECRET")

	// Add your Cloudinary credentials ...
	cld, _ := cloudinary.NewFromParams(CLOUD_NAME, API_KEY, API_SECRET)

	// Upload file to Cloudinary ...
	resp, err := cld.Upload.Upload(ctx, dataFile, uploader.UploadParams{Folder: "uploads"})

	if err != nil {
		fmt.Println(err.Error())
	}

	trip := models.Trip{
		Title: request.Title,

		Country:        request.Country,
		Accomodation:   request.Accomodation,
		Transportation: request.Transportation,
		Eat:            request.Eat,
		Day:            request.Day,
		Night:          request.Night,
		DateTrip:       request.DateTrip,
		Price:          request.Price,
		Quota:          request.Quota,
		Description:    request.Description,
		Image:          resp.SecureURL,
	}

	data, err := h.TripRepository.CreateTrip(trip)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()})
	}
	trip, _ = h.TripRepository.GetTrip(trip.ID)
	return c.JSON(http.StatusOK, dto.SuccessResult{Code: http.StatusOK, Data: data})
	// }
	// return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: "u re not admin"})
}

func (h *HandlerTrip) DeleteTrip(c echo.Context) error {
	id, _ := strconv.Atoi(c.Param("id"))

	trip, err := h.TripRepository.GetTrip(id)
	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}

	data, err := h.TripRepository.DeleteTrip(trip)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()})
	}

	return c.JSON(http.StatusOK, dto.SuccessResult{Code: http.StatusOK, Data: data})
}

// func (h *HandlerTrip) UpdateTrip(c echo.Context) error {

// 	dataFile := c.Get("dataFile").(string)

// 	day, _ := strconv.Atoi(c.FormValue("day"))
// 	price, _ := strconv.Atoi(c.FormValue("price"))
// 	quota, _ := strconv.Atoi(c.FormValue("quota"))
// 	night, _ := strconv.Atoi(c.FormValue("night"))

// 	request := tripdto.UpdateTripRequest{
// 		Title:          c.FormValue("title"),
// 		Country:        c.FormValue("country"),
// 		Accomodation:   c.FormValue("accomodation"),
// 		Transportation: c.FormValue("transportation"),
// 		Eat:            c.FormValue("eat"),
// 		Day:            day,
// 		Night:          night,
// 		DateTrip:       c.FormValue("datetrip"),
// 		Price:          price,
// 		Quota:          quota,
// 		Description:    c.FormValue("description"),
// 		Image:          dataFile,
// 	}

// 	id, _ := strconv.Atoi(c.Param("id"))

// 	trip, err := h.TripRepository.GetTrip(id)
// 	if err != nil {
// 		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
// 	}

// 	if request.Title != "" {
// 		trip.Title = request.Title
// 	}

// 	if request.Title != "" {
// 		trip.Title = request.Title
// 	}
// 	if request.Accomodation != "" {
// 		trip.Accomodation = request.Accomodation
// 	}
// 	if request.Transportation != "" {
// 		trip.Transportation = request.Transportation
// 	}
// 	if request.Eat != "" {
// 		trip.Eat = request.Eat
// 	}
// 	if request.Day != 0 {
// 		trip.Day = request.Day
// 	}
// 	if request.Night != 0 {
// 		trip.Night = request.Night
// 	}
// 	if request.DateTrip != "" {
// 		trip.DateTrip = request.DateTrip
// 	}
// 	if request.Price != 0 {
// 		trip.Price = request.Price
// 	}
// 	if request.Description != "" {
// 		trip.Description = request.Description
// 	}
// 	if request.Image != "" {
// 		trip.Image = request.Image
// 	}

// 	data, err := h.TripRepository.UpdateTrip(trip)
// 	if err != nil {
// 		return c.JSON(http.StatusInternalServerError, dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()})
// 	}

// 	return c.JSON(http.StatusOK, dto.SuccessResult{Code: http.StatusOK, Data: TripConvert(data)})

// }

func TripConvert(trip models.Trip) tripdto.TripResponse {
	return tripdto.TripResponse{
		Id:             trip.ID,
		CurrentQty:     trip.CurrentQty,
		Title:          trip.Title,
		Country:        trip.Country,
		Accomodation:   trip.Accomodation,
		Transportation: trip.Transportation,
		Eat:            trip.Eat,
		Day:            trip.Day,
		Night:          trip.Night,
		DateTrip:       trip.DateTrip,
		Price:          trip.Price,
		Quota:          trip.Quota,
		Description:    trip.Description,
		Image:          trip.Image,
	}
}

// convert for showing on response body
