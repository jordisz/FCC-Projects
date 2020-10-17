$(document).ready(function() {

    let sessionL = 25;
    let breakL = 5;
    let timeLeft = sessionL * 60 * 1000;
    let running = false;
    let go; // (global variable for set & clear Interval)
      
    $("#session-length").text(sessionL);
    $("#break-length").text(breakL);
    display(timeLeft);
      
    $("#session-decrement").click(function() {
      if(sessionL > 1) {
        sessionL--;
        $("#session-length").text(sessionL);
        if(running == false) {
          timeLeft = sessionL * 60 * 1000;
          display(timeLeft);
        }
      }
    });
    $("#session-increment").click(function() {
      if(sessionL < 60) {
        sessionL++;
        $("#session-length").text(sessionL);
        if(running == false) {
          timeLeft = sessionL * 60 * 1000;
          display(timeLeft);
        }
      }
    });
      
    $("#break-decrement").click(function() {
      if(breakL > 1){
        breakL--;
        $("#break-length").text(breakL);
      }
    });
    $("#break-increment").click(function() {
      if(breakL < 60){
        breakL++;
        $("#break-length").text(breakL);
      }
    });
      
    $("#reset").click(function() {
      running = false;
      clearInterval(go);
      sessionL = 25;
      $("#session-length").text(sessionL);
      timeLeft = sessionL * 60 * 1000;
      display(timeLeft);
      breakL = 5;
      $("#break-length").text(breakL);
      
    });
      
    $("#start_stop").click(function() {
      if(running == true) {
        running = false;
        clearInterval(go);
      } else {
        running = true;
        clearInterval(go);
        go = setInterval(function() {
          timeLeft -= 1000;
          display(timeLeft);
          if(timeLeft <= 0) {
            clearInterval(go);
          }
        }, 1000);
      }
    })
      
    function display(t) {
      let inSeconds = t / 1000;
      let minutes = ("0" + Math.floor(inSeconds / 60)).slice(-2);
      let seconds = ("0" + (inSeconds % 60)).slice(-2);
      $("#time-left").text(minutes + ":" + seconds);
    }
      
    });