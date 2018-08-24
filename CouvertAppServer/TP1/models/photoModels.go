package models

import (
	"database/sql"
	_ "github.com/go-sql-driver/mysql"
	"time"
	"strings"
	"fmt"
	"log"
)

type User struct {
	Uid int `json:"userId"`
	Username string
	Pwdhash string `json:"PasswordHashed"`
	Createtime time.Time
}
type Couvert_info struct {
	Cid int
	Uploader string
	Lat float64
	Lon float64
	Picture string
	Phototime string
	Description string
	Orientation string
}
var dataSource="root:lmx1993917@tcp(127.0.0.1:3306)/couvertinfo?parseTime=true"
func connnection ()(*sql.DB,error){
	db,err := sql.Open("mysql",dataSource)
	return  db,err
}
func IfUsernameExist(name string)bool{
	db,err := sql.Open("mysql",dataSource)
	if err != nil {
		fmt.Println(err)
	}
	var flag=true
	var userinfo User
	err = db.QueryRow("select * from users where username = ?",name).Scan(&userinfo.Uid,&userinfo.Username,&userinfo.Pwdhash,&userinfo.Createtime)
	if err != nil {
		if err != sql.ErrNoRows {
			fmt.Println(err)
		}else {
			flag= false
		}
	}
	/*defer rows.Close()
	for rows.Next(){
		var userinfo user
		err := rows.Scan(&userinfo.uid,&userinfo.username,&userinfo.pwdhash)
		if err != nil {
			log.Fatal(err)
		}
		userlist=append(userlist, userinfo)
	}
	fmt.Println(userlist)*/
	defer db.Close()
	return flag
}
func AddUser(username string, pwdhash string) int {
	if IfUsernameExist(username)!= true {
		db,err:=connnection()
		/*db,err := sql.Open("mysql",dataSource)*/
		if err != nil {
			fmt.Println(err)
			return 404
		}
		stmt,err:=db.Prepare("insert into users(username,pwdhash) values (?,?)")
		if err != nil{
			fmt.Println(err)
			return 404
		}
		_, er := stmt.Exec(username,pwdhash)
		if er != nil{
			fmt.Println(err)
			return 404 //insert failure
		}
	}else {
		return 403 //already exist
	}
	return 200 //insert success
}
func FindUser(username string)User{
	/*db,err := sql.Open("mysql",dataSource)*/
	db,err:=connnection()
	if err != nil {
		fmt.Println(err)
	}
	var userinfo User
	err = db.QueryRow("select * from users where username = ?",username).Scan(&userinfo.Uid,&userinfo.Username,&userinfo.Pwdhash,&userinfo.Createtime)
	return userinfo
}
func CheckPwd(username string, pwdhash string)int{

  if IfUsernameExist(username)!=true{
	  return 403 //username not exist
  }else {
	  db,err := sql.Open("mysql",dataSource)
	  if err != nil {
		 fmt.Println(err)
		  return 404
	  }
	  var userinfo User
	  err = db.QueryRow("select * from users where username = ?",username).Scan(&userinfo.Uid,&userinfo.Username,&userinfo.Pwdhash,&userinfo.Createtime)
	  if userinfo.Pwdhash!=pwdhash {
	  	return 402 // password not matched
	  }
  }
  return 200
}
func AddNoLatlngCouvert(couvert Couvert_info)int{
	db,err:=connnection()
	if err != nil {
		fmt.Println("e1")
		return 404
	}
	stmt,err:=db.Prepare("insert into couvertwithoutlatlon(uploader,picture,phototime,description) values (?,?,?,?)")
	if err != nil{
		fmt.Println("e2")
		return 404
	}
	_, er := stmt.Exec(couvert.Uploader,couvert.Picture,couvert.Phototime,couvert.Description)
	if er != nil{
		log.Fatal(er)
		return 404 //insert failure
	}
	return 200
}
func AddCouvertInfo(couvert Couvert_info)int{
	/*db,err := sql.Open("mysql",dataSource)*/
	db,err:=connnection()
	if err != nil {
		fmt.Println(err)
		return 404
	}
	stmt,err:=db.Prepare("insert into couverts_info(uploader,lat,lon,picture,phototime,description,orientation) values (?,?,?,?,?,?,?)")
	if err != nil{
		fmt.Println(err)
		return 404
	}
	_, er := stmt.Exec(couvert.Uploader,couvert.Lat,couvert.Lon,couvert.Picture,couvert.Phototime,couvert.Description,couvert.Orientation)
	if er != nil{
		fmt.Println(err)
		return 404 //insert failure
	}
	return 200
}
func GetAllCouverts()[]Couvert_info{
	var couvertlist []Couvert_info
	/*db,err := sql.Open("mysql",dataSource)*/
	db,err :=connnection()
	if err != nil {
		fmt.Println(err)
	}
	rows,_:=db.Query("select * from couverts_info")
	defer rows.Close()
	for rows.Next(){
		var couvert Couvert_info
		err:=rows.Scan(&couvert.Cid,&couvert.Uploader,&couvert.Lat,&couvert.Lon,&couvert.Picture,&couvert.Phototime,&couvert.Description,&couvert.Orientation)
		couvert.Phototime=strings.Replace(couvert.Phototime,"T"," ",1)
		couvert.Phototime=strings.Replace(couvert.Phototime,"Z"," ",1)
		if err!=nil{
			fmt.Println(err)
		}
		couvertlist= append(couvertlist, couvert)
	}
	err = rows.Err()
	if err != nil {
		fmt.Println(err)
	}
	return couvertlist
}