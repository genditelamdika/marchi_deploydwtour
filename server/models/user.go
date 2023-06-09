package models

type User struct {
	ID          int           `json:"id"`
	Name        string        `json:"fullname" gorm:"type: varchar(255)"`
	Email       string        `json:"email" gorm:"type: varchar(255)"`
	Password    string        `json:"password" gorm:"type: varchar(255)"`
	Phone       string        `json:"phone" gorm:"type: varchar(255)"`
	Address     string        `json:"address" gorm:"type: varchar(255)"`
	Role        string        `json:"role" grom:"type:varchar(255)"`
	Gender      string        `json:"gender" grom:"type:varchar(255)"`
	Transaction []Transaction `json:"transaction"`
	Image       string        `json:"image" form:"image" grom:"type: varchar(255)"`
}

type UserProfileResponse struct {
	ID      int    `json:"id"`
	Name    string `json:"fullname" gorm:"type: varchar(255)"`
	Email   string `json:"email" gorm:"type: varchar(255)"`
	Phone   string `json:"phone" gorm:"type: varchar(255)"`
	Address string `json:"address" gorm:"type: varchar(255)"`
	Gender  string `json:"gender" grom:"type:varchar(255)"`
	Image   string `json:"image" form:"image" grom:"type: varchar(255)"`
}

func (UserProfileResponse) TableName() string {
	return "users"
}
