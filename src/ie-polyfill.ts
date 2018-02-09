//------------------------------------------------------------------------------------
// IE9, IE10 & IE11 POLYFILLS
//------------------------------------------------------------------------------------

/** IE9, IE10 and IE11 requires all of the following polyfills. **/
/*
import 'core-js/es6/symbol';
import 'core-js/es6/object';
import 'core-js/es6/function';
import 'core-js/es6/parse-int';
import 'core-js/es6/parse-float';
import 'core-js/es6/number';
import 'core-js/es6/math';
import 'core-js/es6/string';
import 'core-js/es6/date';
import 'core-js/es6/array';
import 'core-js/es6/regexp';
import 'core-js/es6/map';
import 'core-js/es6/set';
import 'core-js/es6/weak-map';
*/

/** Alternatively */

/** IE9, IE10 and IE11 requires polyfills included in shim */
import 'core-js/shim';

/** IE10 and IE11 requires the following for NgClass support on SVG elements */
import 'classlist.js';  // Run `npm install --save classlist.js`.

/**
 * IE9 causes a full reload instead of ajax requests to avoid compatability issues
 */
if (!window.history.pushState) {
  window.history.pushState = window.history.replaceState = (state: any, title: string, url: string) => {
    if (url !== window.location.pathname) {
      window.location.pathname = url;
    }
  };
}
