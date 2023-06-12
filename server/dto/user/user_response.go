package usersdto

type UserResponse struct {
	ID       int    `json:"id"`
	Name     string `json:"fullname" `
	Email    string `json:"email" `
	Password string `json:"password" `
	Phone    string `json:"phone" `
	Address  string `json:"address" `
	Role     string `json:"role" `
	Image    string `json:"image"`
}
