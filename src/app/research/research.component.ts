import { Component, OnInit, Output, EventEmitter } from '@angular/core';


//imported compenent via npm for design
import { faSearch } from '@fortawesome/free-solid-svg-icons';


//model
import { Artwork } from '../_model/artwork.model';


//services
import { ProductionService } from '../_service/production.service';
import { PeopleService } from '../_service/people.service';
import { User } from '../_model/user.model';



@Component({
  selector: 'app-research',
  templateUrl: './research.component.html',
  styleUrls: ['./research.component.css']
})
export class ResearchComponent implements OnInit {
  //icones
  faSearch= faSearch

  //data storage variables
  artworksList : any;
  filmList : any= [];
  installList:any=[];
  perfList:any=[];
  formerTitle: string ;
  artwork : Artwork ;
  selected : string;
  picture: string ;
  artistList : User

//TEST
count : number= 0;

  @Output() messageEvent = new EventEmitter<string>()

  constructor(
    private production : ProductionService,
    private people: PeopleService
    ) { }

  ngOnInit(): void {}

  catchMediaInfo(){
    //get the artworkList with what have been typed
    (this.production.getArtworkInfos(this.selected)).subscribe((response) =>{
        this.artworksList = response["objects"];

      //reset
      this.filmList=[];
      this.installList=[];
      this.installList=[];
      //sort artwork by type
      for(var artwork of this.artworksList){

        if(artwork.type =="film"){
          this.filmList.push(artwork);

        }else if(artwork.type =="installation"){
          this.installList.push(artwork);

        }else if(artwork.type =="performance"){
          this.perfList.push(artwork);

        }else {
          console.log(artwork.type)
        }
     }
    });

    // //get artist list
    // (this.people.getUserBySearch(this.selected)).subscribe((response) => {
    //   this.artistList= response;
    //   console.log(this.artistList);

    // })
   }

   //to keep the file name and format
   catchPictureFormat(string : string){
     return string.split('\/\/\/\/\/').pop().split('/').pop();
   }



}
