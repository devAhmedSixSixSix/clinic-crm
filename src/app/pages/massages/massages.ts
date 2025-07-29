import { Component } from '@angular/core';
import { MassageSideMenu } from "../../components/massage-side-menu/massage-side-menu";
import { MassageChat } from "../../components/massage-chat/massage-chat";

@Component({
  selector: 'app-massages',
  imports: [MassageSideMenu, MassageChat],
  templateUrl: './massages.html',
  styleUrl: './massages.css'
})
export class Massages {

}
