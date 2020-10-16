
/*For the demo, you can remove it*/
//import { NeumorphismSelect } from 'form.js';

const neumorphismSelectDemo = NeumorphismSelect({
    selectContainer: '#yourSelect'
})
neumorphismSelectDemo.initialize();

$(document).on('click',function(e){
    neumorphismSelectDemo.closeAllSelects();
});

var MAX_FILE_SIZE = 5; // 5 MB

function showFileInfo(files){
    $("#file-name").text(files[0].name);
    $("#file-extension").text(files[0].type);
    let fileSize = (files[0].size / 1000000);
    $("#file-size").text(fileSize.toFixed(2) + " MB");
    if(fileSize > MAX_FILE_SIZE){
        $("#file-size").addClass("text-danger");
    }else{
        $("#file-size").removeClass("text-danger");
    }
}

const testDropzone = DropZone({
    dropZoneContainer: '#yourDropzone',
    fileInput: '#test-file',
    handleFileCallback: function(files){
        showFileInfo(files);
    },
    handleFileChangeCallback: function(files){
        showFileInfo(files);
    },
    highlightDropzoneCallback: null,
    unhighlightDropzoneCallback: null,
    handleDropCallback: null,
    handleClickCallback: null,
});

testDropzone.initialize();
/*--------------------------*/


/*Don't remove this*/
$(function(){
    //run animate by adding animate.css class
    function animateCSSJquery(element, animationName, callback, properties = null){
        if(properties){
            if(properties.duration){
                $(element).css('--animate-duration', properties.duration);
            }
            
            if(properties.delay){
                $(element).css('--animate-delay', properties.delay);
            }
    
            if(properties.isInfinite){
                $(element).addClass('animate__infinite');
            }
    
            if(properties.repeat){
                $(element).css('--animate-repeat', properties.repeat);
            }
        }

        $(element).addClass('animate__animated ' + animationName);

        function handleAnimationEnd(){
          $(element).removeClass('animate__animated');
          $(element).removeClass(animationName);
          $(element).off('animationend');

          if(typeof callback === 'function') callback();
        }
      
        $(element).on('animationend',handleAnimationEnd);
    }

    //current panel is being used
    //make sure you change this line to a target default panel ID
    var currentPanelID = '#dashboard-panel';

    $('.sidebar-btn').on('click', function(e){
        var self = this;

        let targetPanelID = $(this).data('panel-id');
        
        //assign this panel to current panale ID
        currentPanelID = targetPanelID;

        $('.panel').each(function(index){
            if($(this).is($(targetPanelID))){
                $(this).fadeIn('slow');
            }else{
                $(this).hide();
            }
        });

        $('.sidebar-btn').each(function(index){
            if($(this).is($(self)) && !$(this).hasClass('active')){
                $(this).addClass('active');
                $(this).parent().addClass('active');
            }

            if(!$(this).is($(self))){
                $(this).removeClass('active');
                $(this).parent().removeClass('active');
            }
        });
    });

    $('#collapse-menu-btn').on('click', function(e){
        let openMenubarButton = $('#open-menubar-btn');
        let menubar = $('#adb-menubar');
        let animationProperties = {
            duration: '2s'
        }

        //fade the current panel to prevent overflow
        $(currentPanelID).fadeOut('fast', function(){
            //animation end
            $(this).hide();
            $(this).find('.menubar-animated-item').removeClass('show');
        });

        //shrink left container
        //0 will not work, has to be 0.0001
        $('.left-container').css('flex', '0.0001');

        //hide menubar
        animateCSSJquery(
            $(menubar), 
            'animate__slideOutLeft',
            function(){
            //animation end
            $(menubar).hide();

            //show open menubar button on sidebar
            $(openMenubarButton).show();
            animateCSSJquery($(openMenubarButton), 'animate__jackInTheBox');
        }, null);
    });

    $('#open-menubar-btn').on('click', function(e){
        var self = this;
        let menubar = $('#adb-menubar');

        //hide open menubar button
        animateCSSJquery($(this), 'animate__fadeOutRight', function(){
            //animation end
            $(self).hide();
        });

        //grow left container
        $('.left-container').css('flex', '1');

        //show menubar
        $(menubar).show();
        animateCSSJquery($(menubar), 'animate__slideInLeft', function(){
            //animation end
            $(currentPanelID).show();
            $(currentPanelID).find('.menubar-animated-item').addClass('show');
        });
    });

    $('#close-right-container-btn').on('click', function(e){
        //hide the right container
        $('#adb-right-container').css('flex','0.0001');

        let rightPanel = $('#adb-right-container').find('.right-panel').first();

        animateCSSJquery($(rightPanel), "animate__slideOutRight",function(){
            $(rightPanel).addClass("deactive");   
            $('.rightpanel-animated-item').removeClass('show');  
        });

        $('#adb-right-container').find('.right-panel__inner').first().fadeOut('fast', function(){
            $(this).hide();
        });

        //show the mini one
        $('#right-mini-panel').removeClass('deactive');

        animateCSSJquery($('#right-mini-panel'), 'animate__slideInRight', null, null);    
    });

    $('#open-right-panel').on('click', function(e){
        $('#adb-right-container').css('flex', '1');

        let rightPanel = $('#adb-right-container').find('.right-panel').first();

        $(rightPanel).removeClass("deactive");

        animateCSSJquery($(rightPanel), "animate__slideInRight", function(){
            $('#adb-right-container').find('.right-panel__inner').first().show();
            $(".rightpanel-animated-item").addClass('show');
        });
    
        animateCSSJquery($("#right-mini-panel"), "animate__slideOutRight", function(){
            $('#right-mini-panel').addClass('deactive');
        }, null);
    });
});