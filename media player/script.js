let player = document.getElementById("player"),
    playPause = document.getElementById("play-pause"),
    muteUnmute = document.getElementById("mute-unmute")

playPause.addEventListener("click", function() {
  if (player.paused) {
    player.play() 
  } else {
    player.pause()
  }
})

muteUnmute.addEventListener("click", function() {
  if (player.muted) {
    player.muted = false
  } else {
    player.muted = true
  }
})

player.ontimeupdate = function() {
  if (player.duration > 59) {
    document.getElementById("remaining-time").innerHTML = parseInt(player.currentTime - player.duration) + "/" + parseInt(player.duration)
  } else {
    document.getElementById("remaining-time").innerHTML = parseInt(player.currentTime - player.duration) + "/" + parseInt(player.duration)
  }
}