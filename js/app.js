
$(document).ready(function() {
  $('#fullpage').fullpage({
    menu: '#mainnav',
    anchors: ['loading', 'home', 'work', 'studio', 'contact'],
    scrollingSpeed:  1000,
    easing: 'easeInOutCubic',
    autoScrolling: true,
    loopHorizontal: false
  });
});