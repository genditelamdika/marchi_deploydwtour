package repositories

import (
	"mytask/models"

	"gorm.io/gorm"
)

// sign a Contract
type UseRepository interface {
	FindUser() ([]models.User, error)
	CreateUser(user models.User) (models.User, error)
	GetUser(ID int) (models.User, error)
	DeleteUser(user models.User, ID int) (models.User, error)
	UpdateUser(user models.User) (models.User, error)
}

// func Connection

func RepositoryUser(db *gorm.DB) *repositories {
	return &repositories{db}
}

func (r *repositories) CreateUser(user models.User) (models.User, error) {
	err := r.db.Create(&user).Error

	return user, err
}

func (r *repositories) FindUser() ([]models.User, error) {
	var Users []models.User
	err := r.db.Preload("Transaction.Trip").Find(&Users).Error

	return Users, err
}

func (r *repositories) GetUser(ID int) (models.User, error) {
	var User models.User
	err := r.db.Preload("Transaction.Trip").First(&User, ID).Error

	return User, err
}

func (r *repositories) DeleteUser(user models.User, ID int) (models.User, error) {
	err := r.db.Delete(&user, ID).Scan(&user).Error

	return user, err
}

func (r *repositories) UpdateUser(user models.User) (models.User, error) {
	err := r.db.Save(&user).Error

	return user, err
}
