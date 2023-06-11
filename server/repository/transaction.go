package repositories

import (
	"mytask/models"

	"gorm.io/gorm"
)

type TransactionRepository interface {
	FindTransactions() ([]models.Transaction, error)
	GetTransaction(transactionId int) (models.Transaction, error)
	CreateTransaction(transaction models.Transaction) (models.Transaction, error)
	// UpdateTransaction(transaction models.Transaction, Id int) (models.Transaction, error)
	UpdateTransaction(status string, orderId int) (models.Transaction, error)
}

func RepositoryTransaction(db *gorm.DB) *repositories {
	return &repositories{db}
}

func (r *repositories) FindTransactions() ([]models.Transaction, error) {
	var transactions []models.Transaction
	err := r.db.Preload("Trip").Preload("User").Find(&transactions).Error

	return transactions, err
}

func (r *repositories) GetTransaction(transactionId int) (models.Transaction, error) {
	var transaction models.Transaction
	err := r.db.Preload("Trip").Preload("User").First(&transaction, transactionId).Error

	return transaction, err
}

func (r *repositories) CreateTransaction(transaction models.Transaction) (models.Transaction, error) {
	err := r.db.Preload("Trip").Preload("User").Create(&transaction).Error

	return transaction, err
}

// func (r *repositories) UpdateTransaction(transaction models.Transaction, Id int) (models.Transaction, error) {
// 	err := r.db.Preload("Trip").Model(&transaction).Updates(&transaction).Error

// 	return transaction, err
// }

func (r *repositories) UpdateTransaction(status string, orderId int) (models.Transaction, error) {
	var transaction models.Transaction
	r.db.Preload("Trip").First(&transaction, orderId)

	if status != transaction.Status && status == "SUCCESS" {
		var trip models.Trip
		r.db.First(&trip, transaction.TripID)
		trip.CurrentQty = trip.CurrentQty + transaction.Counterqty
		r.db.Save(&trip)
	}

	transaction.Status = status
	err := r.db.Save(&transaction).Error
	return transaction, err
}
