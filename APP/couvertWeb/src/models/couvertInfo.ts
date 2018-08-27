export class CouvertInfoModel {
    public Uploader:string;
    public Lon:number;
    public Lat:number;
    public Picture: string;
    public Phototime: string;
    public Description: string;
    public Orientation: string;
	constructor(){
        this.Uploader="";
        this.Lon=null;
        this.Lat=null;
        this.Phototime="";
        this.Picture="";
        this.Description="";
        this.Orientation="";
    }
}
