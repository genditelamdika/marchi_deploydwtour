package repositories

import (
	"mytask/models"

	"gorm.io/gorm"
)

type TripRepository interface {
	GetDatasTrip() ([]models.Trip, error)
	GetTrip(ID int) (models.Trip, error)
	CreateTrip(Trip models.Trip) (models.Trip, error)
	UpdateTrip(Trip models.Trip) (models.Trip, error)
	DeleteTrip(Trip models.Trip) (models.Trip, error)
}

func RepositoryTrip(db *gorm.DB) *repositories {
	return &repositories{db}
}

func (r *repositories) GetDatasTrip() ([]models.Trip, error) {
	var trips []models.Trip
	err := r.db.Find(&trips).Error

	return trips, err
}

func (r *repositories) GetTrip(ID int) (models.Trip, error) {
	var trip models.Trip
	err := r.db.First(&trip, ID).Error

	return trip, err
}

func (r *repositories) CreateTrip(trip models.Trip) (models.Trip, error) {
	err := r.db.Create(&trip).Error

	return trip, err
}

func (r *repositories) UpdateTrip(trip models.Trip) (models.Trip, error) {
	err := r.db.Save(&trip).Error

	return trip, err
}
func (r *repositories) DeleteTrip(trip models.Trip) (models.Trip, error) {
	err := r.db.Delete(&trip).Error

	return trip, err
}
