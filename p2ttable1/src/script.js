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
