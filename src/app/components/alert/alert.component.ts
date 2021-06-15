import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Subscription } from 'rxjs';

import { Alert, AlertType } from './alert.model';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit, OnDestroy {
  @Input() id = 'default-alert';
  @Input() fade = true;

  alerts: Alert[] = [];
  alertSubscription: Subscription;
  routeSubscription: Subscription;

  constructor(private router: Router, private alertService: AlertService) { }

  ngOnInit() {
    // Subscribe to new alert notifications.
    this.alertSubscription = this.alertService.onAlert(this.id)
      .subscribe(alert => {
        // Clear alerts when an empty alert is received.
        if (!alert.message) {
          // Filter out alerts without 'keepAfterRouteChange' flag.
          this.alerts = this.alerts.filter(x => x.keepAfterRouteChange);

          // Remove 'keepAfterRouteChange' flag on the rest.
          this.alerts.forEach(x => delete x.keepAfterRouteChange);
          return;
        }

        // Add alert to array.
        this.alerts.push(alert);

        // Auto close alert if required.
        if (alert.autoClose) {
          setTimeout(() => this.removeAlert(alert), 3000);
        }
      });

    // Clear alerts on location change.
    this.routeSubscription = this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.alertService.clear(this.id);
      }
    });
  }

  ngOnDestroy() {
    // Unsubscribe to avoid memory leaks.
    this.alertSubscription.unsubscribe();
    this.routeSubscription.unsubscribe();
  }

  removeAlert(alert: Alert) {
    // Check if already removed to prevent error on auto close.
    if (!this.alerts.includes(alert)) return;

    if (this.fade) {
      // Fade out alert.
      this.alerts.find(x => x === alert).fade = true;

      // Remove alert after faded out.
      setTimeout(() => {
        this.alerts = this.alerts.filter(x => x !== alert);
      }, 250);
    } else {
      // Remove alert.
      this.alerts = this.alerts.filter(x => x !== alert);
    }
  }

  cssClass(alert: Alert) {
    if (!alert) return;

    const classes = ['alert', 'alert-dismissable'];

    const alertTypeClass = {
      [AlertType.Primary]: 'alert alert-primary',
      [AlertType.Secondary]: 'alert alert-secondary',
      [AlertType.Success]: 'alert alert-success',
      [AlertType.Error]: 'alert alert-danger',
      [AlertType.Info]: 'alert alert-info',
      [AlertType.Warning]: 'alert alert-warning',
      [AlertType.Light]: 'alert alert-light',
      [AlertType.Dark]: 'alert alert-dark',
    }

    classes.push(alertTypeClass[alert.type]);

    if (alert.fade) {
      classes.push('fade');
    }

    return classes.join(' ');
  }
}
