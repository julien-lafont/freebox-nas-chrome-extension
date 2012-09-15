var app = {};

$(function() {

  "use strict";

  // Fetch settings
  var settings = new Store("settings", {
    "host": "http://mafreebox.freebox.fr",
    "password": null
  });

  var $nas = $("#nas-switch");

  // Check if password is configured
  if (settings.getEncrypt("password") === null) {
    alert("Please configure your freebox password in the option tab first");
    return;
  }

  // Init freebox transmission helper
  var fb = new app.FB(settings.get("host"), settings.getEncrypt("password"));
  

  // Connect and check initial state
  fb.connect(function() {
    fb.isNasActivated(function(isActivated) {
      $nas.addClass(isActivated ? "on" : "off").show();
    }); 
  });

  // Activate switch on NAS
  $nas.on('click', function() {
    fb.toggleNas($nas.hasClass('off'), function() { 
      $nas.toggleClass('off').toggleClass('on');
    });
  });

});