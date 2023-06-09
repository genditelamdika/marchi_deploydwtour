package tripdto

type CreateTripRequest struct {
	//json hasil response di postman
	//form untuk menerima inputan dari mananya
	//validate perintah harus di isi jika tidak di isi akan eror
	Title          string `json:"title" form:"title" gorm:"type: varchar(255)"`
	Country        string `json:"country" form:"country"`
	Accomodation   string `json:"accomodation" form:"accomodation" gorm:"type: varchar(255)"`
	Transportation string `json:"transportasion" form:"transportasion" gorm:"type: varchar(255)"`
	Eat            string `json:"eat" form:"eat" gorm:"type: varchar(255)"`
	Day            int    `json:"day" form:"day" gorm:"type: int"`
	Night          int    `json:"night" form:"night" gorm:"type: int"`
	DateTrip       string `json:"datetrip" form:"datetrip" gorm:"type: varchar(255)"`
	Price          int    `json:"price" form:"price" gorm:"type: int"`
	Quota          int    `json:"quota" form:"quota" gorm:"type: int"`
	Description    string `json:"description" form:"description" gorm:"type: varchar(255)"`
	Image          string `json:"image" form:"image" gorm:"type: varchar(255)"`
}

type UpdateTripRequest struct {
	Title          string `json:"title" form:"title" gorm:"type: varchar(255)"`
	Country        string `json:"country" form:"country"`
	Accomodation   string `json:"acommodation" form:"acommodation" gorm:"type: varchar(255)"`
	Transportation string `json:"transportasion" form:"transportasion" gorm:"type: varchar(255)"`
	Eat            string `json:"eat" form:"eat" gorm:"type: varchar(255)"`
	Day            int    `json:"day" form:"day" gorm:"type: int"`
	Night          int    `json:"night" form:"night" gorm:"type: int"`
	DateTrip       string `json:"datetrip" form:"datetrip" gorm:"type: varchar(255)"`
	Price          int    `json:"price" form:"price" gorm:"type: int"`
	Quota          int    `json:"quota" form:"quota" gorm:"type: int"`
	Description    string `json:"description" form:"description" gorm:"type: varchar(255)"`
	Image          string `json:"image" form:"image" gorm:"type: varchar(255)"`
}
