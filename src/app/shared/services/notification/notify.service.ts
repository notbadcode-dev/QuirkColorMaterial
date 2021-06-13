import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { MessageType } from 'src/app/shared/enum/enum.global';

@Injectable({
  providedIn: 'root'
})
export class NotifyService {

  constructor(private toastr: ToastrService) { }

  success(message: string, title: string = 'Succesfully'): void {
    this.toastr.success(message, title, { toastClass: 'ngx-toastr notify-success' });
  }

  error(message: string, title: string = 'Error'): void {
    this.toastr.error(message, title, { toastClass: 'ngx-toastr notify-error', disableTimeOut: true });
  }

  warning(message: string, title: string = 'Warning'): void {
    this.toastr.warning(message, title, { toastClass: 'ngx-toastr notify-warning' });
  }

  info(message: string, title: string = 'Info'): void {
    this.toastr.info(message, title, { toastClass: 'ngx-toastr notify-info' });
  }

  message(response: any): void {
    if (response.hasOwnProperty('messages')) {
      if (response.messages.hasOwnProperty('message')) {
        for (const messageContent of response.messages) {
          const message: string = messageContent.message;
          const messageType: MessageType = messageContent.messageType;

          this.toastr.findDuplicate

          switch (messageType) {
            case MessageType.info:
                this.info(message);
                break;
            case MessageType.success:
                this.success(message);
                break;
            case MessageType.warning:
                this.warning(message);
                break;
            case MessageType.error:
                this.error(message);
                break;
            default:
                break;
          }
        }
      }
    } else {
      this.error('Ups! Algo no ha ido bien..');
    }
  } 

  removeAll(): void {
    this.toastr.clear()
  }
}
