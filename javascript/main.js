/*
Copyright (c) 2016, David De Anda.  All rights reserved.
Copyrights licensed under MIT License
*/

(function()
{
  function onReadyStateChange()
  {
    if ( document.readyState === "complete" ) {
      start();
    }
  }

  if (document.addEventListener)
  {
    document.addEventListener("DOMContentLoaded", start, false)
    window.addEventListener("load", start, false)
  }
  else
  {
    document.attachEvent("onreadystatechange", onReadyStateChange)
    window.attachEvent("onload", start)
  }
})();

var webgl = null

function start()
{
  if(webgl instanceof WebGLView) return

  webgl = new WebGLView("view")
  
  webgl.setBackgroundColor(new Color(0.1, 0.8, 1.0, 1))
}
