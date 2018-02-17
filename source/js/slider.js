var separator = document.querySelector('.slider__toggle');
var originalPhoto = document.querySelector('.example__item--after');
var filteredPhoto = document.querySelector('.example__item--before');
var photoContainer = document.querySelector('.example__list');
var flag = false;

separator.addEventListener('mousedown', function(event) {
  event.preventDefault();
  flag = true;
}, false);

document.addEventListener('mouseup', function(event) {
  flag = false;
}, false);

photoContainer.addEventListener('mousemove', function(event) {
  var res = event.pageX - this.offsetLeft;

  if (flag && (res > 0) && (res < filteredPhoto.offsetWidth)) {
    separator.style.left = res + 'px';
    originalPhoto.style.width = res + 'px';
  }

}, false);
