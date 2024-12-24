import { Component, OnInit } from '@angular/core';
import { PubService } from 'src/Services/pub.service';

@Component({
  selector: 'app-publications',
  templateUrl: './publications.component.html',
})
export class PublicationsComponent implements OnInit {
  cards = [
    {
      auteur:"houssem Dammak",
      title: 'Project 1',
      description: 'Description for Project 1',
      imgUrl:
        'assets/img/team-1-800x800.jpg',
      bgColor: 'bg-red-600',
    },
    {
      title: 'Project 1',
      description: 'Description for Project 1',
      imgUrl:
        'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=80',
      bgColor: 'bg-red-600',
    },
    {
      title: 'Project 1',
      description: 'Description for Project 1',
      imgUrl:
        'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=80',
      bgColor: 'bg-red-600',
    },
    {
      title: 'Project 1',
      description: 'Description for Project 1',
      imgUrl:
        'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=80',
      bgColor: 'bg-red-600',
    },
    {
      title: 'Project 1',
      description: 'Description for Project 1',
      imgUrl:
        'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=80',
      bgColor: 'bg-red-600',
    },{
      title: 'Project 1',
      description: 'Description for Project 1',
      imgUrl:
        'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=80',
      bgColor: 'bg-red-600',
    },{
      title: 'Project 1',
      description: 'Description for Project 1',
      imgUrl:
        'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=80',
      bgColor: 'bg-red-600',
    },{
      title: 'Project 1',
      description: 'Description for Project 1',
      imgUrl:
        'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=80',
      bgColor: 'bg-red-600',
    },{
      title: 'Project 1',
      description: 'Description for Project 1',
      imgUrl:
        'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=80',
      bgColor: 'bg-red-600',
    },{
      title: 'Project 1',
      description: 'Description for Project 1',
      imgUrl:
        'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=80',
      bgColor: 'bg-red-600',
    },
  ];
  pubs:any=[]
    constructor(private pubService:PubService) {}
  ngOnInit(): void {
    this.pubService.getAllPubs().subscribe((data)=>{
      this.pubs=data
      console.log(this.pubs)
    })
  }
  
}
