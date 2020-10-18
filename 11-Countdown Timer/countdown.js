$(document).ready(function() {

  let sessionL = 25;
  let breakL = 5;
  let timeLeft = sessionL * 60 * 1000; // in miliseconds!
  let breakLeft = breakL * 60 * 1000;
  let running = false;
  let go; // global variable for set & clear Interval
  let remain = 0;
    
  $("#session-length").text(sessionL);
  $("#break-length").text(breakL);
  display(timeLeft);
    
  $("#session-decrement").click(function() {
    if(sessionL > 1) {
      sessionL--;
      $("#session-length").text(sessionL);
        timeLeft = sessionL * 60 * 1000;
      if(running == false && remain == 0) {
        display(timeLeft);
      }
    }
  });
  $("#session-increment").click(function() {
    if(sessionL < 60) {
      sessionL++;
      $("#session-length").text(sessionL);
        timeLeft = sessionL * 60 * 1000;
      if(running == false && remain == 0) {
        display(timeLeft);
      }
    }
  });
    
  $("#break-decrement").click(function() {
    if(breakL > 1){
      breakL--;
      $("#break-length").text(breakL);
      breakLeft = breakL * 60 * 1000;
    }
  });
  $("#break-increment").click(function() {
    if(breakL < 60){
      breakL++;
      $("#break-length").text(breakL);
      breakLeft = breakL * 60 * 1000;
    }
  });
    
  $("#reset").click(function() {
    running = false;
    clearInterval(go);
    $("#beep")[0].pause();
    $("#beep")[0].currentTime = 0;
    remain = 0;
    sessionL = 25;
    $("#session-length").text(sessionL);
    $("#timer-label").text("Session");
    timeLeft = sessionL * 60 * 1000;
    display(timeLeft);
    breakL = 5;
    $("#break-length").text(breakL);
    breakLeft = breakL * 60 * 1000;
  });
     
  $("#start_stop").click(function() {
     if(running == true) {
      running = false;
      clearInterval(go);
    } else {
      if(remain > 0) {
        timer(remain)
      } else {
      timer(timeLeft);
      }
    }
  });
    
  function timer(ms) {
      running = true;
      clearInterval(go);
      display(ms);
      go = setInterval(function() {
        ms -= 1000;
        remain = ms;
        display(ms);
        if(ms < 0) {
          $("#beep")[0].play();
          display(0);
          clearInterval(go);
          running = false;
          if($("#timer-label").text() == "Session"){
            $("#timer-label").text("Break");
            timer(breakLeft);
          } else {
            $("#timer-label").text("Session");
            timer(timeLeft);
          }
        }
      }, 1000);
  }
    
  function display(t) {
    let inSeconds = t / 1000;
    let minutes = ("0" + Math.floor(inSeconds / 60)).slice(-2);
    let seconds = ("0" + (inSeconds % 60)).slice(-2);
    $("#time-left").text(minutes + ":" + seconds);
  }
    
});