import { Inject, ModuleWithProviders, NgModule } from '@angular/core';
import { MathjaxDirective } from './mathjax.directive';
import {
  MathjaxDefaultConfig,
  mathjax_url,
  RootMathjaxConfig,
} from './models';
import { DOCUMENT } from '@angular/common';

/**
 * @author Sajiv Kumar Velayudhan
 * not my code, but I made a little change to run with Angular SSR
 */
@NgModule({
  declarations: [MathjaxDirective],
  exports: [MathjaxDirective],
})
export class MathjaxModule {
  constructor() {}

  public static forRoot(
    config?: RootMathjaxConfig
  ): ModuleWithProviders<MathjaxModule> {
    return {
      ngModule: MathjaxModule,
      providers: [{ provide: RootMathjaxConfig, useValue: config ?? {} }],
    };
  }
  public static forChild(): ModuleWithProviders<MathjaxModule> {
    return {
      ngModule: MathjaxModule,
    };
  }
}
