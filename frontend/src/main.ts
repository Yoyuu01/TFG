import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter, withPreloading, PreloadAllModules } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http';
import { addIcons } from 'ionicons';
import { airplaneOutline, logOutOutline, shieldCheckmarkOutline, walletOutline } from 'ionicons/icons';
import { starOutline, star } from 'ionicons/icons';

addIcons({
  'star-outline': starOutline,
  'star': star,
  'airplane-outline': airplaneOutline,
  'wallet-outline': walletOutline,
  'log-out-outline': logOutOutline,
  'shield-checkmark-outline': shieldCheckmarkOutline,
});

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    provideRouter(routes, withPreloading(PreloadAllModules)),
    provideHttpClient()
  ],
});
