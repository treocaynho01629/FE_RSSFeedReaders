import { Component, OnInit } from '@angular/core';
import {NewsParseAPIService} from "../services/newsparseapi.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-left',
  templateUrl: './left.component.html',
  styleUrls: ['./left.component.scss']
})
export class LeftComponent implements OnInit {

  constructor(private service:NewsParseAPIService, private router:Router) { }

  //Mảng chứa bài viết
  ranNews:any = [];
  videos:any = [];
  images:any = [];
  infoNews:any = [];

  ngOnInit(): void {

    this.service.getNewsFeed("thoi-su.rss", 5).subscribe((result)=>{
      this.ranNews = this.service.snippetContent(result).items;
    })

    this.service.getNewsFeed("video.rss").subscribe((result)=>{
      this.videos = this.service.snippetContent(result).items;
    })

    this.service.getNewsFeed("anh.rss").subscribe((result)=>{
      this.images = this.service.snippetContent(result).items;
    })

    this.service.getNewsFeed("infographics.rss").subscribe((result)=>{
      this.infoNews = this.service.snippetContent(result).items;
    })
  }

  viewDetails(article: any){
    this.service.setCurrArticle(article);

    this.router.routeReuseStrategy.shouldReuseRoute = () => false; //reload router
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate( ['/details'])
  }
}
