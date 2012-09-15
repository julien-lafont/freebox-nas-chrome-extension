(function() {

  "use strict";

  app.FB = function() {
   
    function FB(host, pwd) {
      this.host = host;
      this.pwd = pwd;

      $.ajaxSetup({
        headers: { "X-Requested-With":"XMLHttpRequest" },
        type: "post", 
      });
    }

    // Send connect request to freebox remote server
    FB.prototype.connect = function(success) {
      $.ajax({
        url: this.host + "/login.php",
        data: {
          login: "freebox",
          passwd: this.pwd
        },
        success: function(that) {
          return function(data) {
            if (data.result !== undefined && data.result === true) {
              that.connected = true;
              success();
            }
          };
        }(this)
      });
    }

    // Send generic request through Freebox HTTP API
    FB.prototype.sendRequest = function(module, params, success) {
      if (!this.connected) return;

      $.ajax({
        url: this.host + "/" + module + ".cgi", 
        data: params, 
        success: function(d) { 
          success(d);
        }, 
      });

    }

    // Call the callback with the NAS activation status
    FB.prototype.isNasActivated = function(callback) {
      this.sendRequest("download", { method: "download.config_get" }, function(d) {
        callback(d.result.max_up > 10);
      }); 
    }

    // Activate/Desactivate the nas and call the callback if request is valid
    FB.prototype.toggleNas = function(switchToOn, callback) {
      this.sendRequest("download", 
        $.extend(
          { method: 'download.config_set' },
          switchToOn ? { max_up: 10000, max_dl: 10000 } : { max_up: 0, max_dl: 0 }
        ), 
        callback
      );
    }

    return FB;

  }()

})();