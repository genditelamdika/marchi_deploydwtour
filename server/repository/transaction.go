package repositories

import (
	"mytask/models"

	"gorm.io/gorm"
)

type TransactionRepository interface {
	FindTransactions() ([]models.Transaction, error)
	GetTransaction(ID int) (models.Transaction, error)
	CreateTransaction(transaction models.Transaction) (models.Transaction, error)
	UpdateTransaction(transaction models.Transaction, Id int) (models.Transaction, error)
}

func RepositoryTransaction(db *gorm.DB) *repositories {
	return &repositories{db}
}

func (r *repositories) FindTransactions() ([]models.Transaction, error) {
	var transactions []models.Transaction
	err := r.db.Preload("Trip").Find(&transactions).Error

	return transactions, err
}

func (r *repositories) GetTransaction(ID int) (models.Transaction, error) {
	var transaction models.Transaction
	err := r.db.Preload("Trip").First(&transaction, ID).Error

	return transaction, err
}

func (r *repositories) CreateTransaction(transaction models.Transaction) (models.Transaction, error) {
	err := r.db.Preload("Trip").Create(&transaction).Error

	return transaction, err
}

func (r *repositories) UpdateTransaction(transaction models.Transaction, Id int) (models.Transaction, error) {
	err := r.db.Preload("Trip").Model(&transaction).Updates(&transaction).Error

	return transaction, err
}
