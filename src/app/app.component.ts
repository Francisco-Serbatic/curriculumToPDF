import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'curriculumToPDF';

  constructor(private translate: TranslateService) {
    this.translate.addLangs(["es", "en"]);
    const lang = this.translate.getBrowserLang();
    if (lang !== "es" && lang !== "en") {
      this.translate.setDefaultLang("en");
    } else {
      this.translate.use(lang);
    }
  }
}
