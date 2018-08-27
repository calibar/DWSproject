webpackJsonp([2],{

/***/ 106:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MapPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_service_service__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__models_models__ = __webpack_require__(81);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_geolocation__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_device_orientation__ = __webpack_require__(84);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_google_maps__ = __webpack_require__(165);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var MapPage = /** @class */ (function () {
    function MapPage(navCtrl, navParams, platform, service, geolocation, loading, deviceOrientation) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.platform = platform;
        this.service = service;
        this.geolocation = geolocation;
        this.loading = loading;
        this.deviceOrientation = deviceOrientation;
        this.couvertinfoList = [];
        this.couverinfo = new __WEBPACK_IMPORTED_MODULE_3__models_models__["a" /* CouvertInfoModel */];
        this.MyLocationMap = new Map();
        /*this.MyLocationMarker=new google.maps.Marker*/
    }
    MapPage_1 = MapPage;
    MapPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad MapPage');
        console.log(this.mapRef);
        this.showMap();
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
    };
    MapPage.prototype.getLocation = function (couverinfo) {
        var loading = this.loading.create({
            content: 'Getting your location,Please wait...'
        });
        loading.present();
        this.geolocation.getCurrentPosition().then(function (resp) {
            couverinfo.Lat = resp.coords.latitude; // resp.coords.latitude
            couverinfo.Lon = resp.coords.longitude; // resp.coords.longitude
            loading.dismiss();
        }).catch(function (error) {
            console.log('Failed getting your location', error);
            loading.dismiss();
            alert("Failed to get your location");
        });
    };
    MapPage.prototype.sleep = function (ms) {
        return new Promise(function (resolve) { return setTimeout(resolve, ms); });
    };
    MapPage.prototype.showMap = function () {
        var location = new google.maps.LatLng(52.132854, -106.631401);
        var lat;
        var lon;
        var options = {
            center: location,
            zoom: 15
        };
        this.map = new google.maps.Map(this.mapRef.nativeElement, options);
        /*this.gotoMyPosition();*/
        this.gotoMYpostionWeb();
        this.loadCouverts();
    };
    MapPage.prototype.reload = function () {
        this.navCtrl.push(MapPage_1);
    };
    MapPage.prototype.gotoMYpostionWeb = function () {
        console.log("hello");
        this.loader = this.loading.create({
            duration: 5000,
            content: 'Getting your location, it may take a minute. Please wait...',
            dismissOnPageChange: true
        });
        this.loader.onDidDismiss(function () {
            alert("Cannot get your location");
        });
        var lat, lon;
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                var pos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                    heading: position.coords.accuracy
                };
                lat = pos.lat.toFixed(6);
                console.log(lat);
                localStorage.setItem('Lat', lat);
                lon = pos.lng.toFixed(6);
                localStorage.setItem('Lon', lon);
            }, function () {
                alert("Service failed");
            });
        }
        else {
            alert("Your broswer do not support geolocation.");
        }
        var myLat = localStorage.getItem('Lat');
        var myLon = localStorage.getItem('Lon');
        if (myLat && myLon) {
            this.loader.onDidDismiss(function () {
                console.log("Into your location");
            });
            this.loader.dismiss();
            console.log("setting");
            var pos = new google.maps.LatLng(myLat, myLon);
            this.map.setCenter(pos);
            if (this.MyLocationMap.get('currentPosMarker')) {
                this.MyLocationMap.get('currentPosMarker').setMap(null);
            }
            var MyPos = "assets/icon/bluecircle.png";
            var marker = new google.maps.Marker({
                position: pos,
                map: this.map,
                icon: MyPos
            });
            this.MyLocationMap.set('currentPosMarker', marker);
            var infowindow = new google.maps.InfoWindow;
            marker.addListener('click', function () {
                infowindow.setContent('Your server location.');
                infowindow.open(this.map, marker);
            });
        }
    };
    MapPage.prototype.gotoMyPosition = function () {
        var _this = this;
        this.loader = this.loading.create({
            duration: 5000,
            content: 'Getting your location, it may take a minute. Please wait...',
            dismissOnPageChange: true
        });
        this.loader.onDidDismiss(function () {
            alert("Cannot get your location");
        });
        this.loader.present();
        var lat, lon;
        var options = {
            enableHighAccuracy: true
        };
        __WEBPACK_IMPORTED_MODULE_6__ionic_native_google_maps__["a" /* LocationService */].getMyLocation(options).then(function (myLocation) {
            lat = myLocation.latLng.lat;
            lon = myLocation.latLng.lng;
            _this.loader.onDidDismiss(function () {
                console.log("Into your location");
            });
            _this.loader.dismiss();
            var location = new google.maps.LatLng(lat, lon);
            _this.map.setCenter(location);
            /*var infowindow = new google.maps.InfoWindow
            infowindow.setPosition(location);
            infowindow.setContent('You are here');
            infowindow.open(this.map);*/
            if (_this.MyLocationMap.get('currentPosMarker')) {
                _this.MyLocationMap.get('currentPosMarker').setMap(null);
            }
            var MyPos = "assets/icon/bluecircle.png";
            var marker = new google.maps.Marker({
                position: location,
                map: _this.map,
                icon: MyPos
            });
            _this.MyLocationMap.set('currentPosMarker', marker);
            var infowindow = new google.maps.InfoWindow;
            marker.addListener('click', function () {
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
        }).catch(function (err) {
            alert(err);
            _this.loader.dismiss();
        });
    };
    MapPage.prototype.addMarker = function (position, map, pic, Uploader, Latitude, Longitude, Phototime, Description, Orientation) {
        var marker = new google.maps.Marker({
            position: position,
            map: map,
        });
        /*var infowindow = new google.maps.InfoWindow({
          content: content
        });*/
        var infowindow = new google.maps.InfoWindow({ maxWidth: 300 });
        this.resizePic(pic, function (res) {
            var content = '<IMG SRC=' + res + '><br><br>Latitude:&nbsp;&nbsp;&nbsp;' + Latitude
                + '<br><br>Longitude:&nbsp;&nbsp;&nbsp;' + Longitude
                + '<br><br>Uploaded&nbsp;Time:&nbsp;&nbsp;&nbsp;' + Phototime
                + '<br><br>Uploaded&nbsp;By:&nbsp;&nbsp;&nbsp;' + Uploader;
            if (Description) {
                content = content + '<br><br>Description:&nbsp;&nbsp;&nbsp;' + Description;
            }
            if (Orientation) {
                content = content + '<br><br>Direction:&nbsp;&nbsp;&nbsp;' + Orientation;
            }
            marker.addListener('click', function () {
                infowindow.setContent(content);
                console.log(pic);
                infowindow.open(map, marker);
            });
        });
    };
    MapPage.prototype.resizePic = function (base64, callback) {
        var maxWidth = 200;
        var maxHeight = 200;
        var reslut;
        // Create and initialize two canvas
        var canvas = document.createElement("canvas");
        var ctx = canvas.getContext("2d");
        var canvasCopy = document.createElement("canvas");
        var copyContext = canvasCopy.getContext("2d");
        // Create original image
        var img = new Image();
        img.src = base64;
        var result;
        var resizeimg = img.onload = function () {
            // Determine new ratio based on max size
            var ratio = 1;
            if (img.width > maxWidth) {
                ratio = maxWidth / img.width;
            }
            else if (img.height > maxHeight) {
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
            base64 = canvas.toDataURL();
            callback(canvas.toDataURL());
        };
    };
    MapPage.prototype.loadCouverts = function () {
        var _this = this;
        var loading = this.loading.create({
            dismissOnPageChange: true,
            content: 'Loading couverts, it may takes a minute.&nbsp;  Please wait...'
        });
        this.service.getAllCouvert()
            .subscribe(function (resp) {
            if (resp) {
                resp.forEach(function (element) {
                    _this.couverinfo = new __WEBPACK_IMPORTED_MODULE_3__models_models__["a" /* CouvertInfoModel */];
                    _this.couverinfo.Description = element.Description;
                    _this.couverinfo.Uploader = element.Uploader;
                    _this.couverinfo.Phototime = element.Phototime;
                    _this.couverinfo.Lat = element.Lat;
                    _this.couverinfo.Lon = element.Lon;
                    _this.couverinfo.Picture = element.Picture;
                    _this.couverinfo.Orientation = element.Orientation;
                    _this.couvertinfoList.push(_this.couverinfo);
                    var position = new google.maps.LatLng(_this.couverinfo.Lat, _this.couverinfo.Lon);
                    _this.addMarker(position, _this.map, _this.couverinfo.Picture, _this.couverinfo.Uploader, _this.couverinfo.Lat, _this.couverinfo.Lon, _this.couverinfo.Phototime, _this.couverinfo.Description, _this.couverinfo.Orientation);
                });
                /*console.log(resp)
                console.log(this.couvertinfoList) */
                loading.dismiss();
            }
            else {
                console.log("no result");
            }
        }, function (err) {
            alert("Connot connect to couverts server");
            console.log("Cannot connect to couverts server");
        });
        return this.couvertinfoList;
    };
    MapPage.prototype.ionViewWillLeave = function () {
        console.log("Looks like I'm about to leave :(");
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])('map'),
        __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* ElementRef */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* ElementRef */]) === "function" && _a || Object)
    ], MapPage.prototype, "mapRef", void 0);
    MapPage = MapPage_1 = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-map',template:/*ion-inline-start:"E:\IonicPro\couvertAndroid\src\pages\map\map.html"*/'<!--\n  Generated template for the MapPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar color="primary">\n    <ion-title>DWS MAP <ion-icon name="ios-pin-outline" (click)="gotoMYpostionWeb()" style="float: right;"></ion-icon></ion-title>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content>\n  <div #map id="map"></div>\n</ion-content>\n'/*ion-inline-end:"E:\IonicPro\couvertAndroid\src\pages\map\map.html"*/,
        }),
        __metadata("design:paramtypes", [typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavParams */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavParams */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* Platform */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* Platform */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_2__providers_service_service__["a" /* ServiceProvider */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__providers_service_service__["a" /* ServiceProvider */]) === "function" && _e || Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_4__ionic_native_geolocation__["a" /* Geolocation */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__ionic_native_geolocation__["a" /* Geolocation */]) === "function" && _f || Object, typeof (_g = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* LoadingController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* LoadingController */]) === "function" && _g || Object, typeof (_h = typeof __WEBPACK_IMPORTED_MODULE_5__ionic_native_device_orientation__["a" /* DeviceOrientation */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__ionic_native_device_orientation__["a" /* DeviceOrientation */]) === "function" && _h || Object])
    ], MapPage);
    return MapPage;
    var MapPage_1, _a, _b, _c, _d, _e, _f, _g, _h;
}());

//# sourceMappingURL=map.js.map

/***/ }),

/***/ 118:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 118;

/***/ }),

/***/ 160:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/login/login.module": [
		288,
		1
	],
	"../pages/map/map.module": [
		289,
		0
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids)
		return Promise.reject(new Error("Cannot find module '" + req + "'."));
	return __webpack_require__.e(ids[1]).then(function() {
		return __webpack_require__(ids[0]);
	});
};
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = 160;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 161:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ApiProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common_http__ = __webpack_require__(82);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


/*
  Generated class for the ApiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var ApiProvider = /** @class */ (function () {
    function ApiProvider(http) {
        this.http = http;
        this.url = 'http://localhost:9000';
        this.url2 = 'http://10.0.2.2:9000';
        console.log('Hello ApiProvider Provider');
    }
    ApiProvider.prototype.get = function (endpoint, params, reqOpts) {
        if (!reqOpts) {
            reqOpts = {
                params: new __WEBPACK_IMPORTED_MODULE_0__angular_common_http__["c" /* HttpParams */]()
            };
        }
        // Support easy query params for GET requests
        if (params) {
            reqOpts.params = new __WEBPACK_IMPORTED_MODULE_0__angular_common_http__["c" /* HttpParams */]();
            for (var k in params) {
                reqOpts.params = reqOpts.params.set(k, params[k]);
            }
        }
        return this.http.get(this.url + '/' + endpoint, reqOpts);
    };
    ApiProvider.prototype.getAndroid = function (endpoint, params, reqOpts) {
        if (!reqOpts) {
            reqOpts = {
                params: new __WEBPACK_IMPORTED_MODULE_0__angular_common_http__["c" /* HttpParams */]()
            };
        }
        // Support easy query params for GET requests
        if (params) {
            reqOpts.params = new __WEBPACK_IMPORTED_MODULE_0__angular_common_http__["c" /* HttpParams */]();
            for (var k in params) {
                reqOpts.params = reqOpts.params.set(k, params[k]);
            }
        }
        return this.http.get(this.url2 + '/' + endpoint, reqOpts);
    };
    ApiProvider.prototype.post = function (endpoint, body, reqOpts) {
        return this.http.post(this.url + '/' + endpoint, body, reqOpts);
    };
    ApiProvider.prototype.postAndroid = function (endpoint, body, reqOpts) {
        return this.http.post(this.url2 + '/' + endpoint, body, reqOpts);
    };
    ApiProvider.prototype.put = function (endpoint, body, reqOpts) {
        return this.http.put(this.url + '/' + endpoint, body, reqOpts);
    };
    ApiProvider.prototype.delete = function (endpoint, reqOpts) {
        return this.http.delete(this.url + '/' + endpoint, reqOpts);
    };
    ApiProvider.prototype.patch = function (endpoint, body, reqOpts) {
        return this.http.patch(this.url + '/' + endpoint, body, reqOpts);
    };
    ApiProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_common_http__["a" /* HttpClient */]])
    ], ApiProvider);
    return ApiProvider;
}());

//# sourceMappingURL=api.js.map

/***/ }),

/***/ 162:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__login_login__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_service_service__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__models_models__ = __webpack_require__(81);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__map_map__ = __webpack_require__(106);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_camera__ = __webpack_require__(166);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_geolocation__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_native_device_orientation__ = __webpack_require__(84);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ionic_native_google_maps__ = __webpack_require__(165);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_exif_js__ = __webpack_require__(268);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_exif_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10_exif_js__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};











var HomePage = /** @class */ (function () {
    function HomePage(navCtrl, service, loading, camera, geolocation, deviceOrientation, alertCtrl) {
        this.navCtrl = navCtrl;
        this.service = service;
        this.loading = loading;
        this.camera = camera;
        this.geolocation = geolocation;
        this.deviceOrientation = deviceOrientation;
        this.alertCtrl = alertCtrl;
        this.login = __WEBPACK_IMPORTED_MODULE_2__login_login__["a" /* LoginPage */];
        this.couvertinfoList = [];
        this.map = __WEBPACK_IMPORTED_MODULE_5__map_map__["a" /* MapPage */];
        this.couverinfo = new __WEBPACK_IMPORTED_MODULE_4__models_models__["a" /* CouvertInfoModel */];
    }
    HomePage.prototype.ionViewDidLoad = function () {
        this.currentUser = localStorage.getItem('CurrentUser');
        this.couverinfo.Uploader = this.currentUser;
        var test;
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
    };
    HomePage.prototype.presentAlert = function (title, content) {
        var alert = this.alertCtrl.create({
            title: title,
            subTitle: content,
            buttons: ['OK']
        });
        alert.present();
    };
    HomePage.prototype.GetDirection = function (Ovalue, Direction) {
        if (Ovalue == 0 || Ovalue == 360) {
            Direction = "North  " + String(Ovalue) + "°";
        }
        else if (0 < Ovalue && Ovalue < 90) {
            Direction = "NorthEast  " + String(Ovalue) + "°";
        }
        else if (Ovalue == 90) {
            Direction = "East  " + String(Ovalue) + "°";
        }
        else if (Ovalue > 90 && Ovalue < 180) {
            Direction = "SouthEast  " + String(Ovalue) + "°";
        }
        else if (Ovalue == 180) {
            Direction = "South  " + String(Ovalue) + "°";
        }
        else if (Ovalue > 180 && Ovalue < 270) {
            Direction = "SouthWest  " + String(Ovalue) + "°";
        }
        else if (Ovalue == 270) {
            Direction = "West  " + String(Ovalue) + "°";
        }
        else if (Ovalue > 270 && Ovalue < 360) {
            Direction = "NorthWest  " + String(Ovalue) + "°";
        }
        else {
            Direction = "out of range";
        }
    };
    HomePage.prototype.takePicture = function () {
        var _this = this;
        var options = {
            quality: 100,
            destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE,
            targetWidth: 200
        };
        this.camera.getPicture(options).then(function (imageData) {
            // imageData is either a base64 encoded string or a file URI
            // If it's base64:
            _this.couverinfo.Uploader = localStorage.getItem('CurrentUser');
            _this.couverinfo.Phototime = _this.getCurrentTime();
            _this.couverinfo.Picture = imageData;
            _this.base64Image = 'data:image/jpeg;base64,' + imageData;
        }, function (err) {
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
        var loading = this.loading.create({
            showBackdrop: true,
            enableBackdropDismiss: true,
            content: 'Getting location, it may take a minute. Please wait...'
        });
        loading.present();
        __WEBPACK_IMPORTED_MODULE_9__ionic_native_google_maps__["a" /* LocationService */].getMyLocation().then(function (myLocation) {
            _this.couverinfo.Lat = myLocation.latLng.lat;
            _this.couverinfo.Lon = myLocation.latLng.lng;
            _this.deviceOrientation.getCurrentHeading().then(function (data) {
                var Ovalue = data.trueHeading;
                var Direction;
                if ((Ovalue > 337.5 && Ovalue < 360) || (Ovalue >= 0 && Ovalue < 22.5)) {
                    Direction = "North  " + Ovalue.toFixed(2) + "°";
                }
                else if (22.5 <= Ovalue && Ovalue <= 67.5) {
                    Direction = "NorthEast  " + Ovalue.toFixed(2) + "°";
                }
                else if (Ovalue > 67.5 && Ovalue < 112.5) {
                    Direction = "East  " + Ovalue.toFixed(2) + "°";
                }
                else if (Ovalue >= 112.5 && Ovalue <= 157.5) {
                    Direction = "SouthEast  " + Ovalue.toFixed(2) + "°";
                }
                else if (Ovalue > 157.5 && Ovalue < 202.5) {
                    Direction = "South  " + Ovalue.toFixed(2) + "°";
                }
                else if (Ovalue >= 202.5 && Ovalue <= 247.5) {
                    Direction = "SouthWest  " + Ovalue.toFixed(2) + "°";
                }
                else if (Ovalue > 247.5 && Ovalue < 292.5) {
                    Direction = "West  " + Ovalue.toFixed(2) + "°";
                }
                else if (Ovalue >= 292.5 && Ovalue <= 337.5) {
                    Direction = "NorthWest  " + Ovalue.toFixed(2) + "°";
                }
                else {
                    Direction = "out of range";
                }
                _this.couverinfo.Orientation = Direction;
                loading.dismiss();
            }, function (err) {
                loading.dismiss();
                /*alert("Orientation failed","Cannot ")*/
                _this.presentAlert("Orientation failed", "Cannot detect your device current direction.");
            });
            loading.dismiss();
        }).catch(function (err) {
            _this.presentAlert("Location failed", "Cannot get your device current location.");
            loading.dismiss();
        });
    };
    HomePage.prototype.changeListener = function ($event) {
        this.readThis($event.target);
    };
    HomePage.prototype.readThis = function (inputValue) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var file, result, myReader;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        file = inputValue.files[0];
                        return [4 /*yield*/, this.getExifData(file, this.couverinfo)
                            /* this.couverinfo.Lat=result[0];
                             this.couverinfo.Lon=result[1];
                             this.couverinfo.Phototime=result[2];*/
                            /* this.couverinfo.Lat=Number(localStorage.getItem('exifLat'));
                             this.couverinfo.Lon=Number(localStorage.getItem('exifLon'));
                             this.couverinfo.Phototime=localStorage.getItem('PhotoedTime')*/
                        ];
                    case 1:
                        result = _a.sent();
                        myReader = new FileReader();
                        myReader.onloadend = function (e) {
                            _this.base64Image = myReader.result;
                            var str = _this.base64Image.split('base64,');
                            _this.couverinfo.Picture = str[1];
                        };
                        myReader.readAsDataURL(file);
                        return [2 /*return*/];
                }
            });
        });
    };
    HomePage.prototype.getExifData = function (file, couverinfo) {
        return new Promise(function (resolve) {
            var latitude, longitude, photoedTime;
            __WEBPACK_IMPORTED_MODULE_10_exif_js__["getData"](file, function () {
                var Lat = __WEBPACK_IMPORTED_MODULE_10_exif_js__["getTag"](this, "GPSLatitude");
                var LatRef = __WEBPACK_IMPORTED_MODULE_10_exif_js__["getTag"](this, 'GPSLatitudeRef');
                var Lon = __WEBPACK_IMPORTED_MODULE_10_exif_js__["getTag"](this, 'GPSLongitude');
                var LonRef = __WEBPACK_IMPORTED_MODULE_10_exif_js__["getTag"](this, 'GPSLongitudeRef');
                photoedTime = __WEBPACK_IMPORTED_MODULE_10_exif_js__["getTag"](this, 'DateTimeOriginal');
                if (Lat && Lon) {
                    if (typeof (Lat[0].numerator) != "undefined") {
                        console.log(Lat[0].numerator);
                        var lat = Lat[0].numerator / Lat[0].denominator
                            + Lat[1].numerator / (60 * Lat[1].denominator)
                            + Lat[2].numerator / (3600 * Lat[2].denominator);
                        var lon = Lon[0].numerator / Lon[0].denominator
                            + Lon[1].numerator / (60 * Lon[1].denominator)
                            + Lon[2].numerator / (3600 * Lon[2].denominator);
                    }
                    else {
                        var lat = Lat[0] + Lat[1] / 60 + Lat[2] / 3600;
                        var lon = Lon[0] + Lon[1] / 60 + Lon[2] / 3600;
                    }
                    console.log(LonRef);
                    if (LatRef == "S") {
                        lat = -lat;
                    }
                    if (LonRef == "W") {
                        lon = -lon;
                    }
                    latitude = lat.toFixed(6);
                    longitude = lon.toFixed(6);
                    couverinfo.Lat = latitude;
                    couverinfo.Lon = longitude;
                    photoedTime = photoedTime.replace(':', '-');
                    couverinfo.Phototime = photoedTime.replace(':', '-');
                }
                else {
                    alert("Your picture do not have location information, Please describe photoed location and time in the Description section.");
                    couverinfo.Photoedtime = "2018-01-01 00:00:00";
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
            resolve([latitude, longitude, photoedTime]);
        });
    };
    HomePage.prototype.getOrientation = function () {
        this.deviceOrientation.getCurrentHeading().then(function (data) { console.log(data); }, function (error) { return console.log(error); });
    };
    HomePage.prototype.getCurrentTime = function () {
        var date = new Date();
        var seperator1 = "-";
        "";
        var seperator2 = ":";
        var month = date.getMonth() + 1;
        var Smonth, SstrDate;
        var strDate = date.getDate();
        if (month >= 1 && month <= 9) {
            Smonth = "0" + month;
        }
        else {
            Smonth = month;
        }
        if (strDate >= 0 && strDate <= 9) {
            SstrDate = "0" + strDate;
        }
        else {
            SstrDate = strDate;
        }
        var currentdate = date.getFullYear() + seperator1 + Smonth + seperator1 + SstrDate
            + " " + date.getHours() + seperator2 + date.getMinutes()
            + seperator2 + date.getSeconds();
        console.log(currentdate);
        return currentdate;
    };
    HomePage.prototype.getLocation = function (couverinfo) {
        this.geolocation.getCurrentPosition().then(function (resp) {
            couverinfo.Lat = resp.coords.latitude; // resp.coords.latitude
            couverinfo.Lon = resp.coords.longitude; // resp.coords.longitude
        }).catch(function (error) {
            console.log('Error getting location', error);
        });
    };
    HomePage.prototype.uploadCouvert = function () {
        var _this = this;
        if (this.couverinfo.Lat && this.couverinfo.Lon) {
            this.loader = this.loading.create({
                duration: 5000,
                content: 'Uploading Couvert infomation. Please wait...'
            });
            this.loader.onDidDismiss(function () {
                _this.presentAlert("Time out", "Time out. No connection to server.");
            });
            this.loader.present();
            this.service.uploadCouvert(this.couverinfo)
                .subscribe(function (resp) {
                _this.loader.onDidDismiss(function () {
                    console.log("Connection success");
                });
                _this.loader.dismiss();
                if (resp == "200") {
                    _this.presentAlert("Operation success", "Thank you for your contribution!");
                    _this.base64Image = "";
                }
                else {
                    alert("Bad Request");
                    _this.base64Image = "";
                }
            }, function (err) {
                _this.loader.dismiss();
                console.log(err);
                _this.base64Image = "";
            });
            this.base64Image = "";
            this.initCouverinfo();
        }
        else {
            if (this.couverinfo.Phototime && this.couverinfo.Description) {
                this.doUpload();
                this.initCouverinfo();
            }
            else {
                this.presentAlert("Notificaton", "You must select a photoed time and add description for the data without location and time information.");
            }
        }
    };
    HomePage.prototype.doUpload = function () {
        var _this = this;
        this.loader = this.loading.create({
            duration: 5000,
            content: 'Uploading Couvert infomation. Please wait...'
        });
        this.loader.onDidDismiss(function () {
            _this.presentAlert("Time out", "Time out. No connection to server.");
        });
        this.loader.present();
        this.service.uploadCouvert(this.couverinfo)
            .subscribe(function (resp) {
            _this.loader.onDidDismiss(function () {
                console.log("Connection success");
            });
            _this.loader.dismiss();
            if (resp == "200") {
                _this.presentAlert("Thank you", "Thank you, but data without location information cannot be shown on the map.");
                _this.base64Image = "";
            }
            else {
                alert("Bad Request");
                _this.base64Image = "";
            }
        }, function (err) {
            _this.loader.dismiss();
            console.log(err);
            _this.base64Image = "";
        });
        this.initCouverinfo();
    };
    HomePage.prototype.cancelUpload = function () {
        this.base64Image = "";
        this.initCouverinfo();
    };
    HomePage.prototype.initCouverinfo = function () {
        this.couverinfo.Picture = "";
        this.couverinfo.Phototime = "";
        this.couverinfo.Orientation = "";
        this.couverinfo.Description = "";
        this.couverinfo.Lat = null;
        this.couverinfo.Lon = null;
    };
    HomePage.prototype.logout = function () {
        this.navCtrl.setRoot(this.login);
        this.navCtrl.popToRoot();
    };
    HomePage.prototype.gotomap = function () {
        this.navCtrl.push(this.map);
    };
    HomePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-home',template:/*ion-inline-start:"E:\IonicPro\couvertAndroid\src\pages\home\home.html"*/'<ion-header>\n  <ion-navbar color="primary">\n    <ion-title >\n      Welcome   {{currentUser}} \n      <button ion-button clear small (click)="logout()" style="float: right;" color="light">logout</button>\n     \n    </ion-title>\n    \n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n   \n      <div *ngIf="!base64Image">\n        <button id="map" ion-button (click)="gotomap()" round clear><ion-icon name="map"  large>\n        </ion-icon>&nbsp;  Map</button><br><br>\n       <!-- <button id="picbutton" ion-button round (click)="takePicture()" clear><ion-icon name="camera"  large>\n        </ion-icon>&nbsp; Upload by camera</button><br><br>-->\n        <div id="upload_button">     \n          <label>\n            <ion-label id="fileChoose" color="primary">\n              <input class="ionic-item" type="file" accept="image/*" (change)="changeListener($event)">\n             <ion-icon name="albums"></ion-icon>\n              <span class="btn btn-primary">&nbsp;UPLOAD FROM STORAGE</span>\n            </ion-label>\n          </label>\n        </div>\n      </div>\n      \n  <div *ngIf="base64Image">\n    <div>\n      <br><img class="image-client" [src]="base64Image" *ngIf="base64Image" />\n    </div>\n    <ion-list>\n        <ion-card >\n            <ion-item>\n                <ion-label> &nbsp; Uploader : {{couverinfo.Uploader}}</ion-label>\n              </ion-item>\n          </ion-card>\n        <ion-card *ngIf="couverinfo.Lat">\n              <ion-item>\n                  <ion-label> &nbsp; Latitude: {{couverinfo.Lat}}</ion-label>\n                </ion-item>\n            </ion-card>\n          <ion-card *ngIf="couverinfo.Lon">\n              <ion-item>\n                    <ion-label> &nbsp; longitude: {{couverinfo.Lon}}</ion-label>\n                  </ion-item>\n              </ion-card>\n              <ion-card *ngIf="couverinfo.Orientation">\n                <ion-item>\n                      <ion-label> &nbsp; Direction: {{couverinfo.Orientation}}</ion-label>\n                    </ion-item>\n                </ion-card>\n              <ion-card *ngIf="couverinfo.Phototime">\n                  <ion-item>\n                      <ion-label> &nbsp; Photoed Time : {{couverinfo.Phototime}}</ion-label>\n                    </ion-item>\n                </ion-card>\n               \n          <ion-card>\n              <ion-item>    \n                  <ion-input type="text" [(ngModel)]="couverinfo.Description" placeholder="Add description..." clearOnEdit></ion-input>\n                </ion-item>\n            </ion-card>\n            <ion-item *ngIf="!couverinfo.Phototime">\n              <ion-label floating> &nbsp; Click here to select photoed Time</ion-label>\n              <ion-datetime displayFormat="YYYY-MM-DD HH:mm:ss" [(ngModel)]="couverinfo.Phototime"></ion-datetime>\n            </ion-item>\n      </ion-list>\n      \n      <button ion-button (click)="uploadCouvert()" clear>Upload Couvert Information</button>\n      <button ion-button (click)="cancelUpload()" clear>Cancel</button>\n</div>\n\n</ion-content>\n'/*ion-inline-end:"E:\IonicPro\couvertAndroid\src\pages\home\home.html"*/
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3__providers_service_service__["a" /* ServiceProvider */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__providers_service_service__["a" /* ServiceProvider */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* LoadingController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* LoadingController */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_6__ionic_native_camera__["a" /* Camera */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_6__ionic_native_camera__["a" /* Camera */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_7__ionic_native_geolocation__["a" /* Geolocation */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_7__ionic_native_geolocation__["a" /* Geolocation */]) === "function" && _e || Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_8__ionic_native_device_orientation__["a" /* DeviceOrientation */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_8__ionic_native_device_orientation__["a" /* DeviceOrientation */]) === "function" && _f || Object, typeof (_g = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */]) === "function" && _g || Object])
    ], HomePage);
    return HomePage;
    var _a, _b, _c, _d, _e, _f, _g;
}());

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 208:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(209);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(229);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 229:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(206);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__ = __webpack_require__(207);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_device_orientation__ = __webpack_require__(84);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__app_component__ = __webpack_require__(286);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_home_home__ = __webpack_require__(162);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_login_login__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_map_map__ = __webpack_require__(106);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__angular_http__ = __webpack_require__(287);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__angular_common_http__ = __webpack_require__(82);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__providers_api_api__ = __webpack_require__(161);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__providers_service_service__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__ionic_native_camera__ = __webpack_require__(166);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__ionic_native_geolocation__ = __webpack_require__(48);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
















var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_6__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_7__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_8__pages_login_login__["a" /* LoginPage */],
                __WEBPACK_IMPORTED_MODULE_9__pages_map_map__["a" /* MapPage */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_11__angular_common_http__["b" /* HttpClientModule */],
                __WEBPACK_IMPORTED_MODULE_10__angular_http__["a" /* HttpModule */],
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["d" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_6__app_component__["a" /* MyApp */], {}, {
                    links: [
                        { loadChildren: '../pages/login/login.module#LoginPageModule', name: 'LoginPage', segment: 'login', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/map/map.module#MapPageModule', name: 'MapPage', segment: 'map', priority: 'low', defaultHistory: [] }
                    ]
                })
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_6__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_7__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_8__pages_login_login__["a" /* LoginPage */],
                __WEBPACK_IMPORTED_MODULE_9__pages_map_map__["a" /* MapPage */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */],
                { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["u" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* IonicErrorHandler */] },
                __WEBPACK_IMPORTED_MODULE_12__providers_api_api__["a" /* ApiProvider */],
                __WEBPACK_IMPORTED_MODULE_13__providers_service_service__["a" /* ServiceProvider */],
                __WEBPACK_IMPORTED_MODULE_11__angular_common_http__["b" /* HttpClientModule */],
                __WEBPACK_IMPORTED_MODULE_11__angular_common_http__["a" /* HttpClient */],
                __WEBPACK_IMPORTED_MODULE_14__ionic_native_camera__["a" /* Camera */],
                __WEBPACK_IMPORTED_MODULE_5__ionic_native_device_orientation__["a" /* DeviceOrientation */],
                __WEBPACK_IMPORTED_MODULE_15__ionic_native_geolocation__["a" /* Geolocation */]
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 254:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CouvertInfoModel; });
var CouvertInfoModel = /** @class */ (function () {
    function CouvertInfoModel() {
        this.Uploader = "";
        this.Lon = null;
        this.Lat = null;
        this.Phototime = "";
        this.Picture = "";
        this.Description = "";
        this.Orientation = "";
    }
    return CouvertInfoModel;
}());

//# sourceMappingURL=couvertInfo.js.map

/***/ }),

/***/ 255:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserInfoModel; });
var UserInfoModel = /** @class */ (function () {
    function UserInfoModel() {
        this.username = "";
        this.pwd = "";
    }
    return UserInfoModel;
}());

//# sourceMappingURL=userInfo.js.map

/***/ }),

/***/ 286:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(207);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(206);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_login_login__ = __webpack_require__(53);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var MyApp = /** @class */ (function () {
    function MyApp(platform, statusBar, splashScreen) {
        this.rootPage = __WEBPACK_IMPORTED_MODULE_4__pages_login_login__["a" /* LoginPage */];
        platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.styleDefault();
            splashScreen.hide();
        });
    }
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"E:\IonicPro\couvertAndroid\src\app\app.html"*/'<ion-nav [root]="rootPage"></ion-nav>\n'/*ion-inline-end:"E:\IonicPro\couvertAndroid\src\app\app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 47:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ServiceProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common_http__ = __webpack_require__(82);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__api_api__ = __webpack_require__(161);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



/*
  Generated class for the ServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var ServiceProvider = /** @class */ (function () {
    function ServiceProvider(http, api) {
        this.http = http;
        this.api = api;
        this.url = "http://localhost:9000/";
        /*urlAndroid="http://10.0.2.2:9000/"*/
        this.urlAndroid = "http://localhost:9000/";
        console.log('Hello ServiceProvider Provider');
    }
    ServiceProvider.prototype.signup = function (username, pwd) {
        var params = new __WEBPACK_IMPORTED_MODULE_0__angular_common_http__["c" /* HttpParams */]()
            .append("username", username)
            .append("pwd", pwd);
        console.log(params.toString());
        var seq = this.http.post(this.urlAndroid + 'login', params, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } });
        return seq;
    };
    ServiceProvider.prototype.login = function (username, pwd) {
        var params = new __WEBPACK_IMPORTED_MODULE_0__angular_common_http__["c" /* HttpParams */]()
            .append("username", username)
            .append("pwd", pwd);
        var seq = this.http.get(this.urlAndroid + 'login', { responseType: 'json', params: params });
        return seq;
    };
    ServiceProvider.prototype.signupAndroid = function (username, pwd) {
        var params = new __WEBPACK_IMPORTED_MODULE_0__angular_common_http__["c" /* HttpParams */]()
            .append("username", username)
            .append("pwd", pwd);
        console.log(params.toString());
        var seq = this.http.post(this.urlAndroid + 'login', params, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } });
        return seq;
    };
    ServiceProvider.prototype.loginAndroid = function (username, pwd) {
        var params = new __WEBPACK_IMPORTED_MODULE_0__angular_common_http__["c" /* HttpParams */]()
            .append("username", username)
            .append("pwd", pwd);
        var seq = this.http.get(this.urlAndroid + 'login', { responseType: 'json', params: params });
        return seq;
    };
    ServiceProvider.prototype.getAllCouvert = function () {
        var seq = this.http.get(this.urlAndroid + 'couvert', { responseType: 'json' });
        return seq;
    };
    ServiceProvider.prototype.uploadCouvert = function (couvert) {
        var params = new __WEBPACK_IMPORTED_MODULE_0__angular_common_http__["c" /* HttpParams */]()
            .append("uploader", couvert.Uploader)
            .append("lat", couvert.Lat)
            .append("lon", couvert.Lon)
            .append("picture", couvert.Picture)
            .append("phototime", couvert.Phototime)
            .append("description", couvert.Description)
            .append("orientation", couvert.Orientation);
        console.log(params.toString());
        var seq = this.http.post(this.urlAndroid + 'couvert', params, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } });
        return seq;
    };
    ServiceProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_common_http__["a" /* HttpClient */], __WEBPACK_IMPORTED_MODULE_2__api_api__["a" /* ApiProvider */]])
    ], ServiceProvider);
    return ServiceProvider;
}());

//# sourceMappingURL=service.js.map

/***/ }),

/***/ 53:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__models_models__ = __webpack_require__(81);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_service_service__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__home_home__ = __webpack_require__(162);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_geolocation__ = __webpack_require__(48);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var LoginPage = /** @class */ (function () {
    function LoginPage(navCtrl, navParams, service, geolocation) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.service = service;
        this.geolocation = geolocation;
        this.User = new __WEBPACK_IMPORTED_MODULE_2__models_models__["b" /* UserInfoModel */];
        this.home = __WEBPACK_IMPORTED_MODULE_4__home_home__["a" /* HomePage */];
    }
    LoginPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad LoginPage');
    };
    LoginPage.prototype.signup = function () {
        var _this = this;
        if (this.User.username != "" && this.User.pwd != "") {
            this.service.signup(this.User.username, this.User.pwd)
                .subscribe(function (data) {
                console.log(data);
                if (data == "200") {
                    localStorage.setItem('CurrentUser', _this.User.username);
                    _this.navCtrl.setRoot(_this.home);
                    _this.navCtrl.popToRoot;
                }
                else if (data == "400") {
                    alert("username has already existed");
                }
            }, function (err) {
                console.log(err.error);
            });
            /* .subscribe((resp) => {
    
                console.log("hello");
                alert(resp)
                //this.img.ID=uuid;
               
                
              }, (err) => {
                
                console.log(err);
              });*/
        }
    };
    LoginPage.prototype.getLocation = function () {
        var _this = this;
        this.geolocation.getCurrentPosition().then(function (resp) {
            _this.lat = resp.coords.latitude; // resp.coords.latitude
            _this.lon = resp.coords.longitude; // resp.coords.longitude
        }).catch(function (error) {
            console.log('Error getting location', error);
        });
    };
    LoginPage.prototype.login = function () {
        var _this = this;
        console.log("click");
        if (this.User.username != "" && this.User.pwd != "") {
            this.service.login(this.User.username, this.User.pwd)
                .subscribe(function (data) {
                console.log(data);
                if (data == "200") {
                    localStorage.setItem('CurrentUser', _this.User.username);
                    _this.getLocation();
                    _this.navCtrl.setRoot(_this.home);
                    _this.navCtrl.popToRoot;
                }
                else if (data == "400") {
                    alert("Password not matched");
                }
                else if (data == "300") {
                    alert("no such a user");
                }
            }, function (err) {
                console.log(err.error);
            });
        }
    };
    LoginPage.prototype.test = function () {
        this.getLocation();
        this.navCtrl.setRoot(this.home);
        this.navCtrl.popToRoot;
    };
    LoginPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-login',template:/*ion-inline-start:"E:\IonicPro\couvertAndroid\src\pages\login\login.html"*/'<!--\n  Generated template for the LoginPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar color="primary">\n    <ion-title>Login</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n  <ion-list>\n\n    <ion-item>\n      <ion-label stacked>Username</ion-label>\n      <ion-input type="text" [(ngModel)]="User.username"></ion-input>\n    </ion-item>\n  \n    <ion-item>\n      <ion-label stacked>Password</ion-label>\n      <ion-input type="password" [(ngModel)]="User.pwd"></ion-input>\n    </ion-item>\n  \n  </ion-list>\n  <button ion-button outline (click)="login()" >Login</button>\n  <button ion-button outline (click)="signup()">sign up</button>\n  <!--<button ion-button outline (click)="test()">test</button>-->\n  <img src="assets/imgs/Image-1.jpg">\n</ion-content>\n'/*ion-inline-end:"E:\IonicPro\couvertAndroid\src\pages\login\login.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_3__providers_service_service__["a" /* ServiceProvider */],
            __WEBPACK_IMPORTED_MODULE_5__ionic_native_geolocation__["a" /* Geolocation */]])
    ], LoginPage);
    return LoginPage;
}());

//# sourceMappingURL=login.js.map

/***/ }),

/***/ 81:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__couvertInfo__ = __webpack_require__(254);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__userInfo__ = __webpack_require__(255);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__couvertInfo__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_1__userInfo__["a"]; });



//# sourceMappingURL=models.js.map

/***/ })

},[208]);
//# sourceMappingURL=main.js.map