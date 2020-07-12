import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-servers',
  templateUrl: './servers.component.html',
  styleUrls: ['./servers.component.css']
})
export class ServersComponent implements OnInit {
  serverName: string = "MyServer";
  status: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  toggleServer() {
    this.status = !this.status;
  }

}
