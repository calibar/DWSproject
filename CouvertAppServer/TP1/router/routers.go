package router

import (
	"net/http"
	"TP1/controller"
)

var uploader controller.UploadPhoto
var logger controller.Logger
func Routing()  {
	http.Handle("/couvert",uploader)
	http.Handle("/login",logger)
}