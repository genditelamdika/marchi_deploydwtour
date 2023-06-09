package models

type Trip struct {
	ID             int    `json:"id"`
	CurrentQty     int    `json:"currentqty"`
	Title          string `json:"title" gorm:"type:varchar(255)"`
	Country        string `json:"country" gorm:"type:varchar(255)"`
	Accomodation   string `json:"accomodation" gorm:"type:varchar(255)"`
	Transportation string `json:"transportation" gorm:"type:varchar(255)"`
	Eat            string `json:"eat" gorm:"type:varchar(255)"`
	Day            int    `json:"day" gorm:"type:int"`
	Night          int    `json:"night" gorm:"type:int"`
	DateTrip       string `json:"datetrip" form:"datetrip"`
	Price          int    `json:"price" gorm:"type:int"`
	Quota          int    `json:"quota" gorm:"type:int"`
	Description    string `json:"description" form:"description" gorm:"type:varchar(255)"`
	Image          string `json:"image"  gorm:"type:varchar(255)"`
}

func (Trip) TableName() string {
	return "trips"
}
