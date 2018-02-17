var separator = document.querySelector('.slider__toggle');
var originalPhoto = document.querySelector('.example__item--before');
var filteredPhoto = document.querySelector('.example__item--after');
var photoContainer = document.querySelector('.example__wrapper');

var flag = false;

separator.addEventListener('mousedown', function(event) {
  event.preventDefault();
  flag = true;
}, false);

document.addEventListener('mouseup', function(event) {
  flag = false;
}, false);

photoContainer.addEventListener('mousemove', function(event) {
  var res = event.pageX;

  console.log(res);

  if (flag && (res > (document.body.clientWidth - 428) / 2) && (res < (document.body.clientWidth / 2 + 214))) {
    separator.style.left = res - (document.body.clientWidth - 538) / 2 + 'px';
    originalPhoto.style.width = res + 'px';
  }

}, false);
