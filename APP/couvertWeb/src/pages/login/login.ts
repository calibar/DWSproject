import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {UserInfoModel} from "../../models/models"
import {ServiceProvider} from "../../providers/service/service"
import { HomePage } from '../home/home';
import { Geolocation } from '@ionic-native/geolocation';
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  public User: UserInfoModel
  public home: any
  public lat:number
  public lon:number
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public service:ServiceProvider,
    private geolocation:Geolocation) {
      this.User= new UserInfoModel
      this.home=HomePage
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');

  }
  signup(){
    if(this.User.username!=""&&this.User.pwd!=""){
          this.service.signup(this.User.username,this.User.pwd)
          .subscribe(data=>{
            console.log(data)
            if(data=="200"){
              localStorage.setItem('CurrentUser',this.User.username)
                this.navCtrl.setRoot(this.home)
                this.navCtrl.popToRoot
            }else if (data=="400"){
              alert("username has already existed")
            }
          },err=>{
            console.log(err.error)
          })
        /* .subscribe((resp) => {

            console.log("hello");
            alert(resp)
            //this.img.ID=uuid;
           
            
          }, (err) => {
            
            console.log(err);
          });*/
    }
  }
  getLocation(){
    this.geolocation.getCurrentPosition().then((resp) => {
      this.lat=resp.coords.latitude// resp.coords.latitude
      this.lon=resp.coords.longitude// resp.coords.longitude
     }).catch((error) => {
       console.log('Error getting location', error);
     });
  }
  login(){
    console.log("click");
    if(this.User.username!=""&&this.User.pwd!=""){
      this.service.login(this.User.username,this.User.pwd)
      .subscribe(data=>{
        console.log(data)
        if(data=="200"){
          localStorage.setItem('CurrentUser',this.User.username)
          this.getLocation();
          this.navCtrl.setRoot(this.home)
          this.navCtrl.popToRoot
      }else if (data=="400"){
        alert("Password not matched")
      }else if(data=="300"){
        alert("no such a user")
      }else {
        alert("connection error")
      }
      },err=>{
        console.log(err.error)
      })
    }
  }
  test(){
    this.getLocation();
    this.navCtrl.setRoot(this.home)
          this.navCtrl.popToRoot
  }
}
