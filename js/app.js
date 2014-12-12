
$(document).ready(function() {
  
  // initialisation de la navigation au scroll
  $('#fullpage').fullpage({
    menu: '#mainnav',
    anchors: ['loading', 'home', 'work', 'studio', 'contact'],
    scrollingSpeed:  1000,
    easing: 'easeInOutCubic',
    autoScrolling: true,
    loopHorizontal: false
  });
  
  
  
  
});