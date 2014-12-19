// affichage des messages dans la console
function _console(msg) {
    if ((typeof console) != "undefined" && debug==true) console.log(msg); 
}

var debug = true;


var openwork = false,
  parentslide,
  parentsection,
  parentul,
  isup,
  $mtycv,
  vcid,
  vcwidth = 5000;

var homeItv = null,
    homeSlideId = 1,
    homevid = null;
    

(function(){
  
  // détection du mobile
  var ua = navigator.userAgent,
    isMobileWebkit = /WebKit/.test(ua) && /Mobile/.test(ua);

  if (isMobileWebkit) {
    $('html').addClass('mobile');
  }
  
  

  

  $(document).ready(function() {
    
    _console('______Bisous-production INIT________');
    
    // initialisation de la navigation au scroll
    $('#fullpage').fullpage({
      menu: '#mainnav',
      anchors: ['loading', 'home', 'work', 'studio', 'contact'],
      css3: true,
      scrollingSpeed:  1800,
      horizontalScrollingSpeed: 1200,
      easing: 'easeInOutCubic',
      autoScrolling: true,
      loopHorizontal: false,
      
      afterLoad: function(anchorLink, index) {
          
        _console("afterLoad: "+anchorLink);
        
        // actions à l'arrivée de la rubrique "Home"
        if (anchorLink=="home") {
  
          launchHomeDiapo(index);
          
        }
        
        // actions à l'arrivée de la rubrique "Contact"
        if (anchorLink=="contact") {
            
          $('.'+anchorLink).find('.row').addClass('active');
        }

      },
      
      onLeave: function(index, newIndex, direction) {
          
        _console("onLeave: "+index+"->"+newIndex);
        
        // actions au départ de la rubrique "Home"
        if (index==2) {
          
          // on detruit l'intervalle de diaporama
          clearHomeDiapo();
          
          // si une video de home est en lecture, on l'arrête
          if (homevid!=null) {
            $f(homevid).api('pause');
            homevid = null;
          }
          
        }
        
        // actions au départ de la rubrique "Work"
        if (index==3) {
        
          $('#section'+(index-1)).find('.slide').each(function(i) {
            
            if ($(this).find('.row').hasClass('active')) $(this).find('.row').removeClass('active');
            
          });
        }
        
        // actions au départ de la rubrique "Studio"
        if (index==4) {
        
          $('#section'+(index-1)).find('.slide').each(function(i) {
            
            if ($(this).find('.row').hasClass('active')) $(this).find('.row').removeClass('active');
            
          });
        }
        
        // actions au départ de la rubrique "Contact"
        if (index==5) {
          if ($('#section'+(index-1)).find('.row').hasClass('active')) $('#section'+(index-1)).find('.row').removeClass('active');
        }
          

      },
      
      afterSlideLoad: function(anchorLink, index, slideAnchor, slideIndex) {
          
        _console("afterSlideLoad: "+slideAnchor+"("+slideIndex+")");
        
        // actions dans les slides de la rubrique "Home"
        if (anchorLink=="home") {
          
          
          // si le slide contient une video
          if ($('#'+slideAnchor).find('.video').length>0) {
  
          
            // initialisation du contrôle de la video
            var vidId = $('#'+slideAnchor).find('.vimeo').attr('id');
            var iframe = $('#'+vidId)[0];
            var player = $f(iframe);
        
        
            // Call the API when a button is pressed
            $('.chev.play').click(function() {
                player.api('play');
                $('#'+slideAnchor).find('.overvideo').hide();
                homevid = iframe;
                
                clearHomeDiapo();
                
            });
        
            function onPause(id) {
                _console('video paused');
               $('#'+slideAnchor).find('.overvideo').show();
                homevid = null;
            }
        
            function onFinish(id) {
                _console('video finished');
               $('#'+slideAnchor).find('.overvideo').show();
                homevid = null;
            }
        /*
            function onPlayProgress(data, id) {
               // _console('video '+data.seconds + 's played'); 
            }
        */   
            
            // When the player is ready, add listeners for pause, finish, and playProgress
            player.addEvent('ready', function() {
                _console('video ready');
                
                player.addEvent('pause', onPause);
                player.addEvent('finish', onFinish);
            //  player.addEvent('playProgress', onPlayProgress);
            });
        
            
          } else {
            // si le slide ne contient pas de video
            // on lance le diaporama si ce n'est pas déjà fait
            if (homeItv==null) launchHomeDiapo(index);  
            
          }
          
        }
        
        
        // actions dans les slides de la rubrique "Work"
        if (anchorLink=="work") {
            
          $('#'+slideAnchor).find('.row').addClass('active');
          $('.'+anchorLink).find('.slide').each(function(i) {
            if (i!=slideIndex) {
              if ($(this).find('.row').hasClass('active')) $(this).find('.row').removeClass('active');
            }
          });
            
        }
        
        // actions dans les slides de la rubrique "Studio"
        if (anchorLink=="studio") {
            
          $('#'+slideAnchor).find('.row').addClass('active');
          $('.'+anchorLink).find('.slide').each(function(i) {
            if (i!=slideIndex) {
              if ($(this).find('.row').hasClass('active')) $(this).find('.row').removeClass('active');
            }
          });
            
        }
          
      },
      
      onSlideLeave: function(anchorLink, index, slideIndex, direction) {
          
        _console("onSlideLeave: "+anchorLink+" ("+slideIndex+")"+(direction=="right"?" ->":" <-"));
        
        // actions dans les slides de la rubrique "Home"
        if (anchorLink=="home") {
           
          // si une video de home est en lecture, on l'arrête
          if (homevid!=null) {
            $f(homevid).api('pause');
            homevid = null;
          }
          
        }
        
        // actions dans les slides de la rubrique "Studio"
        if (anchorLink=="studio") {
                        
        }
          
      },
      
      onLeftClick: function(anchorLink, index, slideIndex) {
        
        if (anchorLink=="home") {
          clearHomeDiapo();
        }
        
      },
      
      onRightClick: function(anchorLink, index, slideIndex) {
        
        if (anchorLink=="home") {
          clearHomeDiapo();
        }
      }
    });


    // création de l'intervalle du diaporama de la homepage
    function launchHomeDiapo(index) {
      
      _console("set homeitv");
      if (homeItv==null) {
        
        homeSlideId = $('.home').find('.fp-slide').index('.fp-slide.active');
        
        homeItv = setInterval(function(){
              
              _console("home next slide ("+homeSlideId+"/"+$('.home').find(".slide").length+")");
              
              $.fn.fullpage.moveTo(index, homeSlideId++);
              if (homeSlideId==$('.home').find(".slide").length) homeSlideId = 0;
              
            },5000);
      }
    }
    
    // destruction de l'intervalle du diaporama de la homepage
    function clearHomeDiapo() {
      
      _console("clear homeitv");
      if (homeItv) clearInterval(homeItv);
      homeItv = null;
    }

   
    // déclaration d'un écouteur de redimensionnement de la fenêtre
    $(window).on("resize",_resizeHandler);
    
    
    // actions sur les vignettes de projet
    $('.workblock').click(function(){
      
      // si aucun projet n'est ouvert
      if (openwork==false) {
        
        openwork = true;
        
        _console('projet id: '+$(this).data('projet'));
        
        // chargement du contenu correspondant dans le volet.
        
        // une fois le contenu chargé, on ouvre le volet.
        
        parentslide = $(this).parents(".slide");
        parentsection = $(this).parents(".section");
        parentul = $(this).parents("ul");
        isup = $(this).parents(".row").hasClass('row-up');
        
        $('.volet').addClass(isup?'volet-up':'volet-down');
        
        
        // determination et calage de l'indicateur
        $mtycv = isup ? $('.cvtop') : $('.cvbtm');
        
        vcid = $(parentul).find(".workblock").index($(this));
        vcwidth = 5000;
        var vcbposx = (($(parentsection).width()-vcwidth)/2)+($('.workblock').width()*(vcid-1));
        var cvbposy = isup ? " -90px" : " -61px";

        $mtycv.css('background-position', vcbposx+'px'+cvbposy);
        
        $('.backgroundcache').fadeIn(1000);
        
        
        
        // calcul de la hauteur du contenu
        var vh = $(window).innerHeight()-($('header').height() + $('header').offset().top )-$('footer').height();
        
        
        // décalage des vignettes (vers le haut et vers le bas)
        $(parentslide).find('.row-up').transition({
            top: 100+$('footer').height()-vh/2,
            opacity: 0
          },
          1000,
          'easeOutCubic');
          
        $(parentslide).find('.row-down').transition({
            top: (vh/2)+$('footer').height()-100,
            opacity: 0
          },
          1000,
          'easeOutCubic');
        
        // positionnement et dimensionnement du volet avant ouverture
        $(parentslide).find('.volet').css({
            width: $(parentsection).width(),
            top: $(window).height()/2
        });
        
        $('.volet').show(0);
        
        // ouverture du volet
        $(parentslide).find('.volet').transition({
            opacity: 1,
            height: vh,
            top: ($('header').height()+$('header').offset().top)-5
          },
          1000,
          'easeOutCubic');
        
        // et on initialise le code du volet.
        
      
      }
    });
    
    
    /**
        écouteur de redimensionnement de la fenêtre
    */
    function _resizeHandler() {
        
        
      // si le volet est ouvert, on procède au redimensionnement des différents éléments
      if (openwork) {
    
        
        var vcbposx = (($(parentsection).width()-vcwidth)/2)+($('.workblock').width()*(vcid-1));
        var cvbposy = isup ? " -90px" : " -61px";

        $mtycv.css('background-position', vcbposx+'px'+cvbposy);
      
      
        // calcul de la hauteur du contenu
        var vh = $(window).innerHeight()-($('header').height() + $('header').offset().top )-$('footer').height()+20;
        
        // recalage des vignettes
        $(parentslide).find('.row-up').css({top: 100+$('footer').height()-vh/2});          
        $(parentslide).find('.row-down').css({top: (vh/2)+$('footer').height()-100});
              
        // redimensionnement du volet
        $(parentslide).find('.volet').css({
          width: $(parentsection).width(),
          height: vh
        });
      }
    } 
    
    
    // action sur le bouton de fermeture du volet
    $('.voletclose').click(function(){
      
      if (openwork) {        
        
        // fermeture du volet
        $(parentslide).find('.volet').transition({
            opacity: 0,
            height: 0,
            top: $(window).height()/2
          },
          1000,
          'easeOutCubic');
          
          
        // décalage des vignettes (vers le centre)
        $(parentslide).find('.row-up').transition({
            top: 0,
            opacity: 1
          },
          1000,
          'easeOutCubic');
          
        $(parentslide).find('.row-down').transition({
            top: 0,
            opacity: 1
          },
          1000,
          'easeOutCubic', function(){
                
                // ràz des variables
                parentslide = null;
                parentsection = null;
                parentul = null;
                isup = null;        
                $mtycv = null;
                vcid = null;
            
            
                if ($('.volet').hasClass('volet-up')) $('.volet').removeClass('volet-up');
                if ($('.volet').hasClass('volet-down')) $('.volet').removeClass('volet-down');
            
                $('.volet').hide(0);
            
                openwork = false;
            
          });
          
          
        $('.backgroundcache').fadeOut(1000);
        
        
      }
      
    });
    
    
  });

})();