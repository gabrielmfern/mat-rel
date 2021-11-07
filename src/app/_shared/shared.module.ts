import { NgModule } from '@angular/core';

import { LoaderModule } from './components/loader/loader.module';
import { CrudsServiceModule } from './services/cruds/cruds-services.module';

@NgModule({
  exports: [LoaderModule, CrudsServiceModule]
})
export class SharedModule {}
