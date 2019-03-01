import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormDebugComponent } from './form-debug/form-debug.component';
import { CampoControlErroComponent } from './campo-control-erro/campo-control-erro.component';
import { AlertModalComponent } from './alert-modal/alert-modal.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    FormDebugComponent,
    CampoControlErroComponent,
    AlertModalComponent
  ],
  exports: [
    FormDebugComponent,
    CampoControlErroComponent,
    AlertModalComponent
  ],
  providers: [  ],
  entryComponents: [AlertModalComponent]
})
export class SharedModule { }
