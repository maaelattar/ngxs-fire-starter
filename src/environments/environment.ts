import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';

import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';

// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyAeVYP_JDd-RmPd8RfzZEgUL79zJBXax30',
    authDomain: 'firestarter-c2db4.firebaseapp.com',
    databaseURL: 'https://firestarter-c2db4.firebaseio.com',
    projectId: 'firestarter-c2db4',
    storageBucket: 'firestarter-c2db4.appspot.com',
    messagingSenderId: '1034517300623',
    appId: '1:1034517300623:web:41e1d63e36de641761f7fa',
    measurementId: 'G-DR5YKVKN8Q'
  },
  plugins: [NgxsLoggerPluginModule.forRoot(),
  NgxsReduxDevtoolsPluginModule.forRoot()]
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
