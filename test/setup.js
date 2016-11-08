"use strict";
require("babel-core/register");
require('core-js/shim');
//disable
var jsdom = require('jsdom');
var document = jsdom.jsdom('<!doctype html><html><body></body></html>');
var window = document.defaultView;

global.document = document;
global.document.cookie = "";
global.window = window;

propagateToGlobal(window);

function propagateToGlobal (window) {
    for(let key in window) {
        if(!window.hasOwnProperty(key)) {
            continue;
        }

        if(key in global) {
            continue;
        }
        global[key] = window[key];
    }
}
