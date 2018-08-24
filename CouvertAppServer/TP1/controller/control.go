package controller

import (
	"net/http"
	"TP1/models"
	"crypto/md5"
	"encoding/hex"
	"encoding/json"
	"fmt"
	"strconv"
	"strings"
)

type UploadPhoto struct {
//uploadphoto handler
}
type Logger struct {
//login/out handler
}
var count=0
func (uploader UploadPhoto)ServeHTTP(w http.ResponseWriter,req *http.Request)  {
	method:=req.Method
	if method=="POST"{
		var couvert models.Couvert_info
		couvert.Uploader=req.FormValue("uploader")
		Lat:=req.FormValue("lat")
		couvert.Lat,_=strconv.ParseFloat(Lat,64)
		Lon:=req.FormValue("lon")
		couvert.Lon,_=strconv.ParseFloat(Lon,64)
		pic:=strings.Replace(req.FormValue("picture")," ","+",-1)
		couvert.Picture="data:image/jpeg;base64,"+pic
		couvert.Phototime=req.FormValue("phototime")
		couvert.Description=req.FormValue("description")
		couvert.Orientation=req.FormValue("orientation")
		var result int
		if Lat!="null"&&Lon!="null" {
			result=models.AddCouvertInfo(couvert)
		}else {
			str:=strings.Split(couvert.Phototime,"Z")
			fmt.Println(str[0])
			str1:=strings.Replace(str[0],"T"," ",1)
			fmt.Println(str1)
			couvert.Phototime=str1
			result=models.AddNoLatlngCouvert(couvert)
		}

		fmt.Println(couvert.Picture)
		if result==404{
			w.Write([]byte("404"))
			fmt.Println("add value failure")
		}else if result==200{
			w.Write([]byte("200"))
			fmt.Println("add value success")
		}
	}
	if method=="GET" {
		fmt.Println("get request coming")
		couverlist := models.GetAllCouverts()
		couverlistJso,_:=json.Marshal(couverlist)
		w.Write(couverlistJso)
		fmt.Println(couverlistJso)
	}
}
func GetMD5Hash(text string) string {
	hasher := md5.New()
	hasher.Write([]byte(text))
	return hex.EncodeToString(hasher.Sum(nil))
}
func (logger Logger)ServeHTTP(w http.ResponseWriter,req *http.Request){
	method:=req.Method
	if method=="GET"{
		var username,password string
		username=req.FormValue("username")
		password=req.FormValue("pwd")
		if models.IfUsernameExist(username){
				pwdhash:=GetMD5Hash(password)
			verify:=models.CheckPwd(username,pwdhash)
			if verify==200{
				w.Write([]byte("200"))
				fmt.Println("matched")
			}else if verify==402{
				w.Write([]byte("400"))
				fmt.Println("not matched")
			}
		}else {
			w.Write([]byte("300"))
			fmt.Println("no such a user")
		}
	}
	if method=="POST"{
		count++
		fmt.Println(count)
		username:=req.FormValue("username")
		password:=req.FormValue("pwd")
		if models.IfUsernameExist(username){
			w.Write([]byte("400"))
			fmt.Println("username has already existed")
		}else {
			pwdhash:=GetMD5Hash(password)
			stat:=models.AddUser(username,pwdhash)
			if stat==200{
				var userinfo models.User
				userinfo=models.FindUser(username)
				/*userJson,_:= json.Marshal(userinfo)*/
				w.Write([]byte("200"))
				fmt.Println(userinfo.Username)
			}
		}

	}
}
