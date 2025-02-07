// home.page.ts
import { BasePage } from "./basePage";
import { HomeModalServicioEntregaPage } from "./homeModalServicioEntregaPage";
export class HomePage extends BasePage {  
  private homePageModalServicioEntrega=new HomeModalServicioEntregaPage(this.page);

  async otros() {
  }
}
