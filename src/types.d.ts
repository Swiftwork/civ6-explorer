// This file contains all ambient imports needed to compile the modules/ source code

/// <reference path="../node_modules/zone.js/dist/zone.js.d.ts" />
/// <reference path="../node_modules/@types/node/index.d.ts" />
/// <reference path="../node_modules/@types/xml2js/index.d.ts" />

declare namespace Html2Canvas {
  interface Html2CanvasOptions {
    /** Canvas background color, if none is specified in DOM. Set undefined for transparent */
    backgroundColor?: string,
  }
}

interface Navigator {
  userLanguage?: string,
  oscpu?: string,
}

interface Screen {
  orientation?: {
    angle: number,
  }
}
