import { Component,ViewChild,ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Platform } from 'ionic-angular';
import {ServiceProvider} from '../../providers/service/service'
import {CouvertInfoModel} from '../../models/models'
import { Geolocation } from '@ionic-native/geolocation';
import { LoadingController } from 'ionic-angular';
import { DeviceOrientation, DeviceOrientationCompassHeading } from '@ionic-native/device-orientation';

import {
  LocationService,
  GoogleMap,
  GoogleMapOptions,
  MyLocation,
  MyLocationOptions
} from '@ionic-native/google-maps';

/**
 * Generated class for the MapPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
declare var google: any;
@IonicPage()
@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage {
  @ViewChild('map') mapRef: ElementRef;
  map: any;
  public couvertinfoList: CouvertInfoModel[];
  public couverinfo: CouvertInfoModel
  private loader:any
  public MyLocationMap:any
  private subscription:any
  public CurrentDirection:any
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private platform: Platform,
    private service: ServiceProvider,
    private geolocation:Geolocation,
    private loading:LoadingController,
    private deviceOrientation: DeviceOrientation) {
    this.couvertinfoList=[];  
    this.couverinfo=new CouvertInfoModel
    this.MyLocationMap=new Map();
    /*this.MyLocationMarker=new google.maps.Marker*/
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MapPage');
    console.log(this.mapRef)
    this.showMap()
    /*this.subscription = this.deviceOrientation.watchHeading().subscribe(
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
        this.CurrentDirection=Direction;
      }
    );*/
 
  
  }
  getLocation(couverinfo){
    let loading = this.loading.create({
      content: 'Getting your location,Please wait...'
    });
  
    loading.present();
    this.geolocation.getCurrentPosition().then((resp) => {
      couverinfo.Lat=resp.coords.latitude// resp.coords.latitude
      couverinfo.Lon=resp.coords.longitude// resp.coords.longitude
      loading.dismiss();
     }).catch((error) => {
       console.log('Failed getting your location', error);
       loading.dismiss();
       alert("Failed to get your location")
     });
  }

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  showMap(){
    var location = new google.maps.LatLng(52.132854,-106.631401);
    var lat;
    var lon;
    const options={
      center: location,
      zoom:15
    }
    this.map= new google.maps.Map(this.mapRef.nativeElement,options)
    /*this.gotoMyPosition();*/
    this.gotoMYpostionWeb();
    this.loadCouverts();
  }
  reload(){
    this.navCtrl.push(MapPage)
  }
  gotoMYpostionWeb(){
    console.log("hello")
    this.loader = this.loading.create({
      duration:5000,
      content: 'Getting your location, it may take a minute. Please wait...',
      dismissOnPageChange:true
    });
    this.loader.onDidDismiss(()=>{
      alert("Cannot get your location")
    })
    var lat,lon;
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(function(position) {
        var pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          heading: position.coords.accuracy
        };
       lat=pos.lat.toFixed(6);
       console.log(lat)
       localStorage.setItem('Lat',lat)
       lon=pos.lng.toFixed(6);
       localStorage.setItem('Lon',lon)
      }, function() {
        alert("Service failed")
      });

    }else{
      alert("Your broswer do not support geolocation.")
    }
    var myLat=localStorage.getItem('Lat');
      var myLon=localStorage.getItem('Lon');
    if(myLat&&myLon){
      
      this.loader.onDidDismiss(()=>{
        console.log("Into your location")
      })
      this.loader.dismiss();
      console.log("setting")
      var pos=new google.maps.LatLng(myLat,myLon);
      this.map.setCenter(pos)
      if(this.MyLocationMap.get('currentPosMarker')){
        this.MyLocationMap.get('currentPosMarker').setMap(null);
      }
      var MyPos = "assets/icon/bluecircle.png";
  
      var marker= new google.maps.Marker({
        position: pos,
        map: this.map,
        icon: MyPos
      });
      
      this.MyLocationMap.set('currentPosMarker',marker)
      var infowindow = new google.maps.InfoWindow
      marker.addListener('click', function() {
      
        infowindow.setContent('Your server location.');

        infowindow.open(this.map, marker);
      });
    }

  }
  gotoMyPosition(){
    this.loader = this.loading.create({
      duration:5000,
      content: 'Getting your location, it may take a minute. Please wait...',
      dismissOnPageChange:true
    });
    this.loader.onDidDismiss(()=>{
      alert("Cannot get your location")
    })
    this.loader.present();
    var lat,lon;
    let options: MyLocationOptions = {
      enableHighAccuracy: true
    };
    LocationService.getMyLocation(options).then((myLocation: MyLocation)=>{
     lat=myLocation.latLng.lat;
     lon=myLocation.latLng.lng;

      this.loader.onDidDismiss(()=>{
        console.log("Into your location")
      })
      this.loader.dismiss();
       var location=new google.maps.LatLng(lat,lon);
      this.map.setCenter(location);

      /*var infowindow = new google.maps.InfoWindow
      infowindow.setPosition(location);
      infowindow.setContent('You are here');
      infowindow.open(this.map);*/

      if(this.MyLocationMap.get('currentPosMarker')){
        this.MyLocationMap.get('currentPosMarker').setMap(null);
      }
      var MyPos = "assets/icon/bluecircle.png";
  
      var marker= new google.maps.Marker({
        position: location,
        map: this.map,
        icon: MyPos
      });
      
      this.MyLocationMap.set('currentPosMarker',marker)
      var infowindow = new google.maps.InfoWindow
      marker.addListener('click', function() {
      
        infowindow.setContent('Your are here');

        infowindow.open(this.map, marker);
      });
      /*this.MyLocationMarker= new google.maps.Marker({
        position: location,
        map: this.map,
      });
      var infowindow = new google.maps.InfoWindow
      this.MyLocationMarker.addListener('click', function() {
        infowindow.setContent('Your Location');
        infowindow.open(this.map,this.MyLocationMarker)
      });*/
     }).catch(err=>{
       alert(err);
       this.loader.dismiss();
     })
    

  }

  addMarker(position,map,pic,Uploader,Latitude,Longitude,Phototime,Description,Orientation){
    var marker= new google.maps.Marker({
      position: position,
      map: map,
    });
    /*var infowindow = new google.maps.InfoWindow({
      content: content
    });*/
    var infowindow = new google.maps.InfoWindow({ maxWidth: 300 })
    this.resizePic(pic,res=>{
      var content='<IMG SRC=' +res + '><br><br>Latitude:&nbsp;&nbsp;&nbsp;'+Latitude
      +'<br><br>Longitude:&nbsp;&nbsp;&nbsp;'+Longitude
      +'<br><br>Uploaded&nbsp;Time:&nbsp;&nbsp;&nbsp;'+Phototime
      +'<br><br>Uploaded&nbsp;By:&nbsp;&nbsp;&nbsp;'+Uploader
     if(Description){
       content=content+'<br><br>Description:&nbsp;&nbsp;&nbsp;'+Description
     }
     if(Orientation){
       content=content+'<br><br>Direction:&nbsp;&nbsp;&nbsp;'+Orientation
     }
      marker.addListener('click', function() {
        infowindow.setContent(content);      
        console.log(pic)
        infowindow.open(map, marker);
      });
    })
   
  }
  resizePic(base64,callback){
    var maxWidth = 200;
    var maxHeight = 200;
    var reslut
    // Create and initialize two canvas
    var canvas = document.createElement("canvas");
    var ctx = canvas.getContext("2d");
    var canvasCopy = document.createElement("canvas");
    var copyContext = canvasCopy.getContext("2d");

    // Create original image
    var img = new Image();
    img.src = base64;
    var result 
    var resizeimg=img.onload = function(){

        // Determine new ratio based on max size
        var ratio = 1;
        if(img.width > maxWidth) {
            ratio = maxWidth / img.width;
        }
        else if(img.height > maxHeight) {
            ratio = maxHeight / img.height;
        }


    // Draw original image in second canvas
    canvasCopy.width = img.width;
    canvasCopy.height = img.height;
    copyContext.drawImage(img, 0, 0);

    // Copy and resize second canvas to first canvas
    canvas.width = img.width * ratio;
    canvas.height = img.height * ratio;
    ctx.drawImage(canvasCopy, 0, 0, canvasCopy.width, canvasCopy.height, 0, 0, canvas.width, canvas.height);


         console.log(canvas.toDataURL());
         base64=canvas.toDataURL()
        callback(canvas.toDataURL());
    };
   
}
  loadCouverts(){
    let loading = this.loading.create({
      dismissOnPageChange: true,
      content: 'Loading couverts, it may takes a minute.&nbsp;  Please wait...'
    });

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
          this.couverinfo.Picture=element.Picture
          this.couverinfo.Orientation=element.Orientation
          this.couvertinfoList.push(this.couverinfo)
          let position= new google.maps.LatLng(this.couverinfo.Lat,this.couverinfo.Lon);
          this.addMarker(position,this.map,
            this.couverinfo.Picture,
            this.couverinfo.Uploader,
            this.couverinfo.Lat,
            this.couverinfo.Lon,
            this.couverinfo.Phototime,
            this.couverinfo.Description,
            this.couverinfo.Orientation
          )
        });
        /*console.log(resp)
        console.log(this.couvertinfoList) */
       loading.dismiss()
        
     }else{

       console.log("no result")
     }
    },err=>{
      alert("Connot connect to couverts server")
      console.log("Cannot connect to couverts server")
    })
    return this.couvertinfoList
  }
  ionViewWillLeave() {
    console.log("Looks like I'm about to leave :(");
  }
}
