import { Component, OnInit } from '@angular/core';
import { NewsParseAPIService } from '../services/newsparseapi.service';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-cate-news',
  templateUrl: './cate-news.component.html',
  styleUrls: ['./cate-news.component.scss']
})
export class CateNewsComponent implements OnInit {

  constructor(private service:NewsParseAPIService, private activeRouter:ActivatedRoute, private router:Router) { }

  url: any;
  currNews:any = []; //Mảng chứa tin từ api
  cateName:string = "";
  status = "loading";

  ngOnInit(): void {

    this.url = this.activeRouter.snapshot.paramMap.get('url'); //lấy mục hiện tại

    this.service.getNewsFeed(this.url).subscribe((result)=>{
      this.currNews = this.service.snippetContent(result).items; //Tỉa content + gán mảng
      this.cateName = this.service.getFeedTitle(result); //lấy tên mục để hiển thị
      this.status = result.status;
      sessionStorage.removeItem('details'); //xoá bài viết đang xem khi về mục
    })
  }

  viewDetails(article: any){ //Xem chi tiết bài
    this.service.setCurrArticle(article); //gán bài lên session
    this.router.navigate(['/details']); //chuyển trang details
  }
}
