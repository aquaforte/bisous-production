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
      scrollingSpeed:  1800,
      easing: 'easeInOutCubic',
      autoScrolling: true,
      loopHorizontal: false,
      resize: true
    });

   
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
   //     $mtycv.show();
        
        vcid = $(parentul).find(".workblock").index($(this));
        vcwidth = 5000;
        var vcbposx = (($(parentsection).width()-vcwidth)/2)+($('.workblock').width()*(vcid-1));
        var cvbposy = isup ? " -90px" : " -61px";

        $mtycv.css('background-position', vcbposx+'px'+cvbposy);
        
        $('.backgroundcache').fadeIn(1000);
        
        
        
        // calcul de la hauteur du contenu
        var vh = $(window).innerHeight()-($('header').height() + $('header').offset().top )-$('footer').height()+10;
        
        
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
            top: ($('header').height()+$('header').offset().top)-10
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