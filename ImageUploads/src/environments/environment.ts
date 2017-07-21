// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebaseConfig: {
    apiKey: "AIzaSyDw2Thi3g9hohYRHBvImV-43C4wLj6PZsE",
    authDomain: "tandoni-image-uploads.firebaseapp.com",
    databaseURL: "https://tandoni-image-uploads.firebaseio.com",
    projectId: "tandoni-image-uploads",
    storageBucket: "tandoni-image-uploads.appspot.com",
    messagingSenderId: "1078780352577"
  },
};
