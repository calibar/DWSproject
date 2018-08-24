import { Component } from '@angular/core';
import { NavController,LoadingController,AlertController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import {ServiceProvider} from '../../providers/service/service'
import {CouvertInfoModel} from '../../models/models'
import { Platform } from 'ionic-angular';
import {MapPage} from '../map/map'
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Geolocation } from '@ionic-native/geolocation';
import { DeviceOrientation, DeviceOrientationCompassHeading } from '@ionic-native/device-orientation';
import {
  LocationService,
  GoogleMap,
  GoogleMapOptions,
  MyLocation
} from '@ionic-native/google-maps';
import * as EXIF from 'exif-js';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public login:any
  public map: any
  public currentUser: any
  public couvertinfoList: CouvertInfoModel[];
  private loader:any
  public couverinfo: CouvertInfoModel
  public base64Image: any
  private alertinfo:any
  constructor(public navCtrl: NavController,
    public service :ServiceProvider,
    public loading :LoadingController,
    private camera :Camera,
    private geolocation:Geolocation,
    private deviceOrientation: DeviceOrientation,
    private alertCtrl: AlertController) {
      this.login=LoginPage;
      this.couvertinfoList=[];   
      this.map=MapPage;
      this.couverinfo= new CouvertInfoModel
  }
  ionViewDidLoad(){
    this.currentUser=localStorage.getItem('CurrentUser')
    this.couverinfo.Uploader=this.currentUser
    var test :any
    this.getOrientation();
    /*this.loader = this.loading.create({
      content: 'Loading...',})
    this.loader.present().then(()=>{
        this.service.getAllCouvert()
        .subscribe((resp:any)=>{
         if (resp){
            resp.forEach(element => {
              this.couverinfo= new CouvertInfoModel
              this.couverinfo.Description=element.Description
              this.couverinfo.Uploader=element.Uploader
              this.couverinfo.Phototime=element.Phototime
              this.couverinfo.Lat=element.Lat
              this.couverinfo.Lon=element.Lon
              this.couvertinfoList.push(this.couverinfo)
              
            });
            this.loader.dismiss();

         }else{
           this.loader.dismiss()
           console.log("no result")
         }
        },err=>{
          this.loader.dismiss();
          alert("error")
        })
    })
    console.log(this.couvertinfoList)*/
  }
  presentAlert(title,content) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: content,
      buttons: ['OK']
    });
    alert.present();
  }
  GetDirection(Ovalue:number,Direction:string){
    if(Ovalue==0||Ovalue==360){
        Direction="North  "+String(Ovalue)+"°";
    }else if(0<Ovalue&&Ovalue<90){
        Direction="NorthEast  "+String(Ovalue)+"°";
    }else if(Ovalue==90){
        Direction="East  "+String(Ovalue)+"°"
    }else if(Ovalue>90&&Ovalue<180){
        Direction="SouthEast  "+String(Ovalue)+"°"
    }else if(Ovalue==180){
        Direction="South  "+String(Ovalue)+"°"
    }else if(Ovalue>180&&Ovalue<270){
        Direction="SouthWest  "+String(Ovalue)+"°"
    }else if(Ovalue==270){
      Direction="West  "+String(Ovalue)+"°"
    }else if(Ovalue>270&&Ovalue<360){
      Direction="NorthWest  "+String(Ovalue)+"°"
    }else{
      Direction="out of range"
    }

  } 
  takePicture(){
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      targetWidth: 200
    }

      this.camera.getPicture(options).then((imageData) => {
        // imageData is either a base64 encoded string or a file URI
        // If it's base64:
        this.couverinfo.Uploader=localStorage.getItem('CurrentUser')
        this.couverinfo.Phototime=this.getCurrentTime()
        this.couverinfo.Picture=imageData;
        this.base64Image = 'data:image/jpeg;base64,' + imageData;
       }, (err) => {
        // Handle error
       });
      /*let loading = this.loading.create({
        showBackdrop: true,
        enableBackdropDismiss: true,
        content: 'Getting location, it may take a minute. Please wait...'
      });
      loading.present();
       this.geolocation.getCurrentPosition().then(resp=>{
         this.couverinfo.Lat=resp.coords.latitude;
         this.couverinfo.Lon=resp.coords.longitude;
         var heading=resp.coords.heading;
         alert(heading)
         loading.dismiss()
       }).catch(err=>{
         loading.dismiss()
         alert("Fail to get position")
       })*/
      let loading = this.loading.create({
        showBackdrop: true,
        enableBackdropDismiss: true,
        content: 'Getting location, it may take a minute. Please wait...'
      });
      loading.present();    
      LocationService.getMyLocation().then((myLocation: MyLocation)=>{
         this.couverinfo.Lat=myLocation.latLng.lat;
         this.couverinfo.Lon=myLocation.latLng.lng;
         this.deviceOrientation.getCurrentHeading().then(
          (data: DeviceOrientationCompassHeading) => {
           var Ovalue=data.trueHeading;
           
           var Direction:string
           if((Ovalue>337.5&&Ovalue<360)||(Ovalue>=0&&Ovalue<22.5)){
            Direction="North  "+Ovalue.toFixed(2)+"°";
        }else if(22.5<=Ovalue&&Ovalue<=67.5){
            Direction="NorthEast  "+Ovalue.toFixed(2)+"°";
        }else if(Ovalue>67.5&&Ovalue<112.5){
            Direction="East  "+Ovalue.toFixed(2)+"°"
        }else if(Ovalue>=112.5&&Ovalue<=157.5){
            Direction="SouthEast  "+Ovalue.toFixed(2)+"°"
        }else if(Ovalue>157.5&&Ovalue<202.5){
            Direction="South  "+Ovalue.toFixed(2)+"°"
        }else if(Ovalue>=202.5&&Ovalue<=247.5){
            Direction="SouthWest  "+Ovalue.toFixed(2)+"°"
        }else if(Ovalue>247.5&&Ovalue<292.5){
          Direction="West  "+Ovalue.toFixed(2)+"°"
        }else if(Ovalue>=292.5&&Ovalue<=337.5){
          Direction="NorthWest  "+Ovalue.toFixed(2)+"°"
        }else{
          Direction="out of range"
        }
           this.couverinfo.Orientation=Direction
            loading.dismiss();
          },err=>{
            loading.dismiss();
            /*alert("Orientation failed","Cannot ")*/
            this.presentAlert("Orientation failed","Cannot detect your device current direction.")
          }  
        )
         loading.dismiss();
       }).catch(err=>{
         this.presentAlert("Location failed","Cannot get your device current location.")
         loading.dismiss();
      })
     }
    changeListener($event) : void {
      this.readThis($event.target);
    }
    
   async readThis(inputValue: any) {
      var file= inputValue.files[0];
     var result=await this.getExifData(file,this.couverinfo)
  
   /* this.couverinfo.Lat=result[0];
    this.couverinfo.Lon=result[1];
    this.couverinfo.Phototime=result[2];*/
 /* this.couverinfo.Lat=Number(localStorage.getItem('exifLat'));
  this.couverinfo.Lon=Number(localStorage.getItem('exifLon'));
  this.couverinfo.Phototime=localStorage.getItem('PhotoedTime')*/
      var myReader:FileReader = new FileReader();
    
      myReader.onloadend = (e) => {
        this.base64Image = myReader.result;
        var str=this.base64Image.split('base64,');
        this.couverinfo.Picture=str[1];
      }
      myReader.readAsDataURL(file);
    }
  getExifData(file,couverinfo){
    return new Promise(resolve => {
      var latitude,longitude,photoedTime
      EXIF.getData(file, function() {
        var Lat = EXIF.getTag(this, "GPSLatitude"); 
        var LatRef=EXIF.getTag(this,'GPSLatitudeRef')
        var Lon = EXIF.getTag(this, 'GPSLongitude'); 
        var LonRef=EXIF.getTag(this,'	GPSLongitudeRef')
        photoedTime=EXIF.getTag(this,'DateTimeOriginal');
        if(Lat&&Lon){
          if(typeof(Lat[0].numerator)!="undefined"){
           console.log(Lat[0].numerator)
            var lat=Lat[0].numerator/Lat[0].denominator
            +Lat[1].numerator/(60*Lat[1].denominator)
            +Lat[2].numerator/(3600*Lat[2].denominator)
      
            var lon=Lon[0].numerator/Lon[0].denominator
            +Lon[1].numerator/(60*Lon[1].denominator)
            +Lon[2].numerator/(3600*Lon[2].denominator)
          }else{
            var lat:number=Lat[0]+Lat[1]/60+Lat[2]/3600;
            var lon:number=Lon[0]+Lon[1]/60+Lon[2]/3600;
          }
         
          if(LatRef=="S"){
            lat=-lat;
          }
          if(LonRef=="W"){
            lon=-lon;
          }
          latitude=lat.toFixed(6);
          longitude=lon.toFixed(6);     
          couverinfo.Lat=latitude;
          couverinfo.Lon=longitude;
          photoedTime=photoedTime.replace(':','-');
          couverinfo.Phototime=photoedTime.replace(':','-')
          
        }else{
          alert("Your picture do not have location information, Please describe photoed location and time in the Description section.")
          couverinfo.Photoedtime="2018-01-01 00:00:00"
          /*var alerting :AlertController
          let alertbox= alerting.create({
            title: 'No Location information',
            subTitle: "Your picture do not have location information, Please describe your location in the Description section.",
            buttons: ['OK']
          })
          alertbox.present();*/
          /*let alert = this.alertCtrl.create({
            title: 'No Location information',
            subTitle: "Your picture do not have location information, Please describe your location in the Description section.",
            buttons: ['OK']
          });
          alert.present();*/
        }
       
    });
     resolve([latitude,longitude,photoedTime]);
    });
  }
  getOrientation(){ 
    this.deviceOrientation.getCurrentHeading().then(
    (data: DeviceOrientationCompassHeading) => {console.log(data)},
    (error: any) => console.log(error)

  );}
  getCurrentTime(){
    var date = new Date();
    var seperator1 = "-";``
    var seperator2 = ":";
    var month = date.getMonth() + 1;
    var Smonth,SstrDate
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
      Smonth = "0" + month;
    }else{
      Smonth=month
    }
    if (strDate >= 0 && strDate <= 9) {
      SstrDate = "0" + strDate;
    }else{
      SstrDate=strDate
    }
    var currentdate = date.getFullYear() + seperator1 + Smonth + seperator1 + SstrDate
            + " " + date.getHours() + seperator2 + date.getMinutes()
            + seperator2 + date.getSeconds();
            console.log(currentdate)
    return currentdate;
  }
  getLocation(couverinfo){
    this.geolocation.getCurrentPosition().then((resp) => {
      couverinfo.Lat=resp.coords.latitude// resp.coords.latitude
      couverinfo.Lon=resp.coords.longitude// resp.coords.longitude
     }).catch((error) => {
       console.log('Error getting location', error);
     });
  }
  uploadCouvert(){
   
    if(this.couverinfo.Lat&&this.couverinfo.Lon){
      this.loader = this.loading.create({
        duration:5000,
        content: 'Uploading Couvert infomation. Please wait...'
      });
      this.loader.onDidDismiss(()=>{
        this.presentAlert("Time out","Time out. No connection to server.")
      })
      this.loader.present();
      this.service.uploadCouvert(this.couverinfo)
    .subscribe(resp=>{
      this.loader.onDidDismiss(()=>{
        console.log("Connection success")
      })
      this.loader.dismiss();
      if(resp=="200")
      {
        this.presentAlert("Operation success","Thank you for your contribution!")
        this.base64Image=""
      }else{
        alert("Bad Request")
        this.base64Image=""
      }
    },err=>{
      this.loader.dismiss();
      console.log(err)
      this.base64Image=""
    })
    this.base64Image=""
      this.initCouverinfo();
    }else{

     
     if(this.couverinfo.Phototime&&this.couverinfo.Description){
      this.doUpload();
      this.initCouverinfo();
     }else{
       this.presentAlert("Notificaton","You must select a photoed time and add description for the data without location and time information.")
     }
     
      
    }
    
  }
  doUpload(){
    this.loader = this.loading.create({
      duration:5000,
      content: 'Uploading Couvert infomation. Please wait...'
    });
    this.loader.onDidDismiss(()=>{
      this.presentAlert("Time out","Time out. No connection to server.")
    })
    this.loader.present();
    this.service.uploadCouvert(this.couverinfo)
  .subscribe(resp=>{
    this.loader.onDidDismiss(()=>{
      console.log("Connection success")
    })
    this.loader.dismiss();
    if(resp=="200")
    {
     this.presentAlert("Thank you","Thank you, but data without location information cannot be shown on the map.")
      this.base64Image=""
    }else{
      alert("Bad Request")
      this.base64Image=""
    }
  },err=>{
    this.loader.dismiss();
    console.log(err)
    this.base64Image=""
  })
    this.initCouverinfo();
  }
  cancelUpload(){
    this.base64Image=""
    this.initCouverinfo();
  }
  initCouverinfo(){
    this.couverinfo.Picture=""
    this.couverinfo.Phototime=""
    this.couverinfo.Orientation=""
    this.couverinfo.Description=""
    this.couverinfo.Lat=null
    this.couverinfo.Lon=null

  }
  logout(){
    this.navCtrl.setRoot(this.login)
    this.navCtrl.popToRoot()
  }
  gotomap(){
    
    this.navCtrl.push(this.map)
  }
}
