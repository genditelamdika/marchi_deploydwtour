package handlers

import (
	"fmt"
	"log"
	dto "mytask/dto/result"
	transactiondto "mytask/dto/transaction"
	"mytask/models"
	repositories "mytask/repository"
	"net/http"
	"os"
	"strconv"
	"time"

	"github.com/go-playground/validator"
	"github.com/golang-jwt/jwt/v4"
	"github.com/labstack/echo/v4"
	"github.com/midtrans/midtrans-go"
	"github.com/midtrans/midtrans-go/snap"
	"gopkg.in/gomail.v2"
)

type handlerTransaction struct {
	TransactionRepository repositories.TransactionRepository
	TripRepository        repositories.TripRepository
	userRepository        repositories.UseRepository
}

func HandlerTransaction(TransactionRepository repositories.TransactionRepository, TripRepository repositories.TripRepository, userRepository repositories.UseRepository) *handlerTransaction {
	return &handlerTransaction{TransactionRepository, TripRepository, userRepository}
}
func (h *handlerTransaction) FindTransactions(c echo.Context) error {
	transactions, err := h.TransactionRepository.FindTransactions()
	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}
	// for i, p := range transactions {
	// 	transactions[i].Attachment = path_file + p.Attachment
	// }

	return c.JSON(http.StatusOK, dto.SuccessResult{Code: http.StatusOK, Data: transactions})
}
func (h *handlerTransaction) GetTransaction(c echo.Context) error {
	id, _ := strconv.Atoi(c.Param("id"))

	transaction, err := h.TransactionRepository.GetTransaction(id)
	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}
	// transaction.Attachment = path_file + transaction.Attachment

	return c.JSON(http.StatusOK, dto.SuccessResult{Code: http.StatusOK, Data: transaction})
}
func (h *handlerTransaction) CreateTransaction(c echo.Context) error {
	// Get image here
	request := new(transactiondto.CreateTransactionRequest)
	if err := c.Bind(request); err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}
	userLogin := c.Get("userLogin")
	userID := userLogin.(jwt.MapClaims)["id"].(float64)
	// dataFile := c.Get("dataFile").(string)

	// tripid, _ := strconv.Atoi(c.FormValue("tripid"))
	// counterqty, _ := strconv.Atoi(c.FormValue("counterqty"))
	// total, _ := strconv.Atoi(c.FormValue("total"))

	// 	Counterqty: request,
	// 	Total:      total,
	// 	Status:     c.FormValue("status"),
	// 	// Attachment: dataFile,
	// 	TripID: tripid,
	// 	UserID: int(userID),
	// }

	validation := validator.New()
	err := validation.Struct(request)
	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}

	var transactionIsMatch = false
	var transactionId int
	for !transactionIsMatch {
		transactionId = int(time.Now().Unix())
		transactionData, _ := h.TransactionRepository.GetTransaction(transactionId)
		if transactionData.ID == 0 {
			transactionIsMatch = true
		}
	}

	userRes, _ := h.userRepository.GetUser(int(userID))

	transaction := models.Transaction{
		ID:         transactionId,
		Counterqty: request.Counterqty,
		Total:      request.Total,
		Status:     "Pending",
		// Attachment: request.Attachment,
		TripID: request.TripID,
		UserID: int(userID),
		User:   UserResponse(userRes),
	}

	dataTransactions, err := h.TransactionRepository.CreateTransaction(transaction)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()})
	}
	// transaction, _ = h.TransactionRepository.GetTransaction(transaction.ID)

	var s = snap.Client{}
	s.New(os.Getenv("SERVER_KEY"), midtrans.Sandbox)

	// 2. Initiate Snap request param
	req := &snap.Request{
		TransactionDetails: midtrans.TransactionDetails{
			OrderID:  strconv.Itoa(dataTransactions.ID),
			GrossAmt: int64(dataTransactions.Total),
		},
		CreditCard: &snap.CreditCardDetails{
			Secure: true,
		},
		CustomerDetail: &midtrans.CustomerDetails{
			FName: dataTransactions.User.Name,
			Email: dataTransactions.User.Email,
		},
	}

	//3. Execute request create Snap transaction to Midtrans Snap API
	snapResp, _ := s.CreateTransaction(req)

	return c.JSON(http.StatusOK, dto.SuccessResult{Code: http.StatusOK, Data: snapResp})
}

func (h *handlerTransaction) Notification(c echo.Context) error {
	var notificationPayload map[string]interface{}

	if err := c.Bind(&notificationPayload); err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}

	transactionStatus := notificationPayload["transaction_status"].(string)
	fraudStatus := notificationPayload["fraud_status"].(string)
	orderId := notificationPayload["order_id"].(string)

	order_id, _ := strconv.Atoi(orderId)

	fmt.Print("ini payloadnya", notificationPayload)

	if transactionStatus == "capture" {
		if fraudStatus == "challenge" {
			// TODO set transaction status on your database to 'challenge'
			// e.g: 'Payment status challenged. Please take action on your Merchant Administration Portal
			h.TransactionRepository.UpdateTransaction("pending", order_id)
		} else if fraudStatus == "accept" {
			// TODO set transaction status on your database to 'success'
			h.TransactionRepository.UpdateTransaction("success", order_id)
		}
	} else if transactionStatus == "settlement" {
		// TODO set transaction status on your databaase to 'success'
		h.TransactionRepository.UpdateTransaction("success", order_id)
	} else if transactionStatus == "deny" {
		// TODO you can ignore 'deny', because most of the time it allows payment retries
		// and later can become success
		h.TransactionRepository.UpdateTransaction("failed", order_id)
	} else if transactionStatus == "cancel" || transactionStatus == "expire" {
		// TODO set transaction status on your databaase to 'failure'
		h.TransactionRepository.UpdateTransaction("failed", order_id)
	} else if transactionStatus == "pending" {
		// TODO set transaction status on your databaase to 'pending' / waiting payment
		h.TransactionRepository.UpdateTransaction("pending", order_id)
	}

	return c.JSON(http.StatusOK, dto.SuccessResult{Code: http.StatusOK, Data: notificationPayload})
}

func SendMail(status string, transaction models.Transaction) {

	if status != transaction.Status && (status == "success") {
		var CONFIG_SMTP_HOST = "smtp.gmail.com"
		var CONFIG_SMTP_PORT = 587
		var CONFIG_SENDER_NAME = "DEWETOUR <demo.misaeltimpolas04@gmail.com>"
		var CONFIG_AUTH_EMAIL = os.Getenv("EMAIL_SYSTEM")
		var CONFIG_AUTH_PASSWORD = os.Getenv("PASSWORD_SYSTEM")

		var trip = "TRIP BOOKING"
		var price = strconv.Itoa(transaction.Total)

		mailer := gomail.NewMessage()
		mailer.SetHeader("From", CONFIG_SENDER_NAME)
		mailer.SetHeader("To", transaction.User.Email)
		mailer.SetHeader("Subject", "Transaction Status")
		mailer.SetBody("text/html", fmt.Sprintf(`<!DOCTYPE html>
	  <html lang="en">
		<head>
		<meta charset="UTF-8" />
		<meta http-equiv="X-UA-Compatible" content="IE=edge" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<title>Document</title>
		<style>
		  h1 {
		  color: brown;
		  }
		</style>
		</head>
		<body>
		<h2>Product payment :</h2>
		<ul style="list-style-type:none;">
		  <li>Name : %s</li>
		  <li>Total payment: Rp.%s</li>
		  <li>Status : <b>%s</b></li>
		</ul>
		</body>
	  </html>`, trip, price, status))

		dialer := gomail.NewDialer(
			CONFIG_SMTP_HOST,
			CONFIG_SMTP_PORT,
			CONFIG_AUTH_EMAIL,
			CONFIG_AUTH_PASSWORD,
		)

		err := dialer.DialAndSend(mailer)
		if err != nil {
			log.Fatal(err.Error())
		}

		log.Println("Mail sent! to " + transaction.User.Email)
	}
}

// func (h *handlerTransaction) UpdateTransaction(c echo.Context) error {

// 	// dataFile := c.Get("dataFile").(string)

// 	tripid, _ := strconv.Atoi(c.FormValue("tripid"))
// 	counterqty, _ := strconv.Atoi(c.FormValue("counterqty"))
// 	total, _ := strconv.Atoi(c.FormValue("total"))

// 	request := transactiondto.CreateTransactionRequest{
// 		Counterqty: counterqty,
// 		Total:      total,
// 		Status:     c.FormValue("status"),
// 		// Attachment: dataFile,
// 		TripID: tripid,
// 	}

// 	id, _ := strconv.Atoi(c.Param("id"))

// 	transaction, err := h.TransactionRepository.GetTransaction(id)

// 	if err != nil {
// 		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
// 	}

// 	if request.Counterqty != 0 {
// 		transaction.Counterqty = request.Counterqty
// 	}
// 	if request.Total != 0 {
// 		transaction.Total = request.Total
// 	}
// 	if request.Status != "" {
// 		transaction.Status = request.Status
// 	}
// 	// if request.Attachment != "" {
// 	// 	transaction.Attachment = request.Attachment
// 	// }
// 	if request.TripID != 0 {
// 		transaction.TripID = request.TripID
// 	}

// 	data, err := h.TransactionRepository.UpdateTransaction(transaction, id)
// 	if err != nil {
// 		return c.JSON(http.StatusInternalServerError, dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()})
// 	}

// 	return c.JSON(http.StatusOK, dto.SuccessResult{Code: http.StatusOK, Data: data})
// }

func TripConvertResponse(c models.Trip) models.Trip {
	return models.Trip{
		ID:             c.ID,
		Title:          c.Title,
		Country:        c.Country,
		Accomodation:   c.Accomodation,
		Transportation: c.Transportation,
		Eat:            c.Eat,
		Day:            c.Day,
		Night:          c.Night,
		DateTrip:       c.DateTrip,
		Price:          c.Price,
		Quota:          c.Quota,
		Description:    c.Description,
		Image:          c.Image,
	}
}

func UserResponse(c models.User) models.User {
	return models.User{
		ID:      c.ID,
		Name:    c.Name,
		Email:   c.Email,
		Phone:   c.Phone,
		Address: c.Address,
		Gender:  c.Gender,
		Image:   c.Image,
	}
}
