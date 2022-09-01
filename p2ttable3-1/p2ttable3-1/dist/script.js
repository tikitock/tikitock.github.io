// const vContainer = document.getElementById("visual-real__container");
// const vCursor = document.getElementById("visual-real__cursor");
// const vClipper = document.getElementById("visual-real__v-visual");

// function move(e) {
// 	var rect = vContainer.getBoundingClientRect();
// 	position = ((e.pageX - rect.left) / vContainer.offsetWidth)*100;
// 	if (position <= 100) {
// 	vClipper.style.width = position+"%";
// 	vCursor.style.left = position + "%";
// 	}
// }

// vContainer.addEventListener("mousemove", move);
// vContainer.addEventListener("touchmove",(e) => move(e.targetTouches[0]));

function Video() {
  this.init = function () {
    video.vContainer = document.getElementById("visual-real__container");
    video.vCursor = document.getElementById("visual-real__cursor");
    video.vClipper = document.getElementById("visual-real__v-visual");
    video.vContainer.addEventListener("mousemove", this.move);
    video.vContainer.addEventListener("touchmove", (e) =>
      this.move(e.targetTouches[0])
    );
  };

  this.move = function (e) {
    const rect = video.vContainer.getBoundingClientRect();
    const position =
      ((e.pageX - rect.left) / video.vContainer.offsetWidth) * 100;
    if (position <= 100) {
      video.vClipper.style.width = position + "%";
      video.vCursor.style.left = position + "%";
    }
  };
}

const video = new Video();
video.init();

var videos = {
    a: Popcorn("#a"),
    b: Popcorn("#b")
  },
  scrub = $("#scrub"),
  loadCount = 0,
  events = "play pause timeupdate seeking".split(/\s+/g);

// iterate both media sources
Popcorn.forEach(videos, function (media, type) {
  // when each is ready...
  media
    .on("canplayall", function () {
      // trigger a custom "sync" event
      this.emit("sync");

      // set the max value of the "scrubber"
      scrub.attr("max", this.duration());

      // Listen for the custom sync event...
    })
    .on("sync", function () {
      // Once both items are loaded, sync events
      if (++loadCount == 2) {
        // Iterate all events and trigger them on the video B
        // whenever they occur on the video A
        events.forEach(function (event) {
          videos.a.on(event, function () {
            // Avoid overkill events, trigger timeupdate manually
            if (event === "timeupdate") {
              if (!this.media.paused) {
                return;
              }
              videos.b.emit("timeupdate");

              // update scrubber
              scrub.val(this.currentTime());

              return;
            }

            if (event === "seeking") {
              videos.b.currentTime(this.currentTime());
            }

            if (event === "play" || event === "pause") {
              videos.b[event]();
            }
          });
        });
      }
    });
});

scrub.bind("change", function () {
  var val = this.value;
  videos.a.currentTime(val);
  videos.b.currentTime(val);
});

// With requestAnimationFrame, we can ensure that as
// frequently as the browser would allow,
// the video is resync'ed.
function sync() {
  if (videos.b.media.readyState === 2) {
    videos.b.currentTime(videos.a.currentTime());
  }
  requestAnimationFrame(sync);
}

sync();