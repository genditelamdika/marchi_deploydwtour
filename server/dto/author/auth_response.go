package authdto

type RegResponse struct {
	Email string `json:"email" `
	Token string `gorm:"type: varchar(255)" json:"token"`
}

type LoginResponse struct {
	Email    string `gorm:"type: varchar(255)" json:"email"`
	Token    string `gorm:"type: varchar(255)" json:"token"`
	Role     string `gorm:"type: varchar(255)" json:"role"`
	FullName string `json:"fullname" gorm:"type: varchar(255)" `
	Password string `json:"password" gorm:"type: varchar(255)" `
	Phone    string `json:"phone" gorm:"type: varchar(255)" `
	Address  string `json:"address" gorm:"type: varchar(255)" `
	Gender   string `json:"gender" gorm:"type: varchar(255)" `
}

type AuthResponse struct {
	Email string      `gorm:"type: varchar(255)" json:"email"`
	Token string      `gorm:"type: varchar(255)" json:"token"`
	Data  interface{} `json:"-"`
}
