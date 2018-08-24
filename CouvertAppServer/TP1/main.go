package main

import (
	"TP1/router"
	"net/http"
	"log"
)

/*func main(){
	var username string
	var password string
	fmt.Scanln(&username)
	fmt.Scanln(&password)
	result:=models.IfUsernameExist(username)
	fmt.Println(result)
	
	stat:=models.AddUser(username,"hahahha")
	if stat==200{
		fmt.Println("insert success!")
	}else if stat==403{
		fmt.Println("username already exist")
	}
	
	verify:=models.CheckPwd(username,password)
	if verify==200{
		fmt.Println("matched")
	}else if verify==402{
		fmt.Println("not matched")
	}else if verify==403 {
		fmt.Println("no such a user")
	}
}*/
func main()  {
	router.Routing()
	err := http.ListenAndServe(":9000",nil)
	if err !=nil{
		log.Fatal(err)
	}
}