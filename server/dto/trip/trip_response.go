package tripdto

type TripResponse struct {
	Id             int    `json:"id"`
	CurrentQty     int    `json:"currentqty"`
	Title          string `json:"title" form:"title" grom:"type: varchar(255)"`
	Country        string `json:"country" form:"country" grom:"type: varchar(255)"`
	Accomodation   string `json:"accomodation" form:"accomodation" grom:"type: varchar(255)"`
	Transportation string `json:"transportation" form:"transportation" grom:"type: varchar(255)"`
	Eat            string `json:"eat" form:"eat" grom:"type: varchar(255)"`
	Day            int    `json:"day" form:"day" grom:"type: int"`
	Night          int    `json:"night" form:"night" grom:"type: int"`
	DateTrip       string `json:"datetrip" form:"datetrip"`
	Price          int    `json:"price" form:"price" grom:"type: int"`
	Quota          int    `json:"quota" form:"quota" grom:"type: int"`
	Description    string `json:"description" form:"description" grom:"type: varchar(255)"`
	Image          string `json:"image" grom:"type: varchar(255)"`
}
