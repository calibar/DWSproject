import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {ApiProvider} from '../api/api'

/*
  Generated class for the ServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ServiceProvider {
  url="http://localhost:9000/"
  /*urlAndroid="http://10.0.2.2:9000/"*/
  urlAndroid="http://localhost:9000/"
  constructor(public http: HttpClient,public api:ApiProvider) {
    console.log('Hello ServiceProvider Provider');
  }
  signup(username:string,pwd:string){
    const params = new HttpParams()
    .append("username", username)
    .append("pwd", pwd);
    console.log(params.toString())
   let seq=this.http.post(this.urlAndroid+'login',params,{ headers: {'Content-Type':'application/x-www-form-urlencoded'}})
   return seq;
  }
  login(username:string,pwd:string){
    const params = new HttpParams()
    .append("username", username)
    .append("pwd", pwd);
    let seq = this.http.get(this.urlAndroid+'login', { responseType: 'json' ,params:params});
    return seq;
  }
  signupAndroid(username:string,pwd:string){
    const params = new HttpParams()
    .append("username", username)
    .append("pwd", pwd);
    console.log(params.toString())
   let seq=this.http.post(this.urlAndroid+'login',params,{ headers: {'Content-Type':'application/x-www-form-urlencoded'}})
   return seq;
  }
  loginAndroid(username:string,pwd:string){
    const params = new HttpParams()
    .append("username", username)
    .append("pwd", pwd);
    let seq = this.http.get(this.urlAndroid+'login', { responseType: 'json' ,params:params});
    return seq;
  }
  getAllCouvert(){
    let seq=this.http.get(this.urlAndroid+'couvert',{responseType:'json'})
    return seq
  }
  uploadCouvert(couvert){
    const params = new HttpParams()
    .append("uploader", couvert.Uploader)
    .append("lat", couvert.Lat)
    .append("lon",couvert.Lon)
    .append("picture",couvert.Picture)
    .append("phototime",couvert.Phototime)
    .append("description",couvert.Description)
    .append("orientation",couvert.Orientation)
    console.log(params.toString())
   let seq=this.http.post(this.urlAndroid+'couvert',params,{ headers: {'Content-Type':'application/x-www-form-urlencoded'}})
   return seq;
  }
}
