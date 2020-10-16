const NeumorphismSelect = function(_properties){
    var defaultProperties = {
        selectContainer: '.select-field',
        selectItems: '.select-items',
        selectSelected: '.select-selected'
    }

    var properties = Object.assign(defaultProperties, _properties);

    return {
        initialize: function(preloaded = false){
            var that = this;
            $(properties.selectContainer).each(function(index){
                let parent = this;
                let selectElement = $(this).find('select').first();
                let selectItems = $(this).find(properties.selectItems).first();

                $(selectItems).addClass('hide');

                //get options count of the select
                let options = $(selectElement).find('option');

                //if select has no options, then hide the select-items div
                if(options.length === 0){
                    $(selectItems).addClass('hide');
                }else{
                    //put all options to select-items div
                    for(let [index,option] of options.toArray().entries()){
                        let item = $(`<div data-value=${$(option).val()}>${$(option).text()}</div>`);
                        
                        //set default to the first option
                        if(index === 0 && preloaded == false){
                            $(option).prop('selected',true);
                            $(item).addClass('same-as-selected');
                            $(parent).find(properties.selectSelected + ' > p').first().text($(option).text());
                        }

                        //add click event for item
                        $(item).on('click', function(e){
                            if($(this).hasClass('same-as-selected')){
                                return;
                            }

                            $(option).prop('selected',true);

                            //remove others which have same-as-selected class
                            $(selectItems).find('div.same-as-selected').first().removeClass('same-as-selected');
                            
                            $(this).addClass('same-as-selected');

                            $(parent).find('.select-selected > p').first().text($(this).text())
                        });

                        //append to selectItems
                        selectItems.append(item);
                    }

                    $(parent).find(properties.selectSelected).first().on('click',function(e){
                        e.stopPropagation();
                        that.closeAllSelects(this);
                        $(selectItems).toggleClass('hide');
                    });
                }
            });
        },
        closeAllSelects: function(exceptElement){
            $(properties.selectContainer).each(function(index){
                if(!$(this).is(exceptElement)){
                    $(this).find(properties.selectItems).first().addClass('hide');
                    $(this).find(properties.selectSelected).first().removeClass('select-arrow-active');
                }
            });
        }
    }
}

const DropZone = function(_properties){
    var defaultProperties = {
        dropZoneContainer: null,
        fileInput: null,
        highlightDropzoneCallback: null,
        unhighlightDropzoneCallback: null,
        handleDropCallback: null,
        handleClickCallback: null,
        handleFileCallback: null,
        handleFileChangeCallback: null
    }

    var properties = Object.assign(defaultProperties, _properties);

    var DropzoneFuntionalities = function(){
        var preventDefault = function(e){
            e.preventDefault();
            e.stopPropagation();
        }

        var highlightDropzone = function(e){
            $(properties.dropZoneContainer).addClass('highlighted');

            if( properties.highlightDropzoneCallback !== null &&
                typeof properties.highlightDropzoneCallback === 'function'){
                    properties.highlightDropzoneCallback();
                }
        }

        var unhighlightDropzone = function(e){
            $(properties.dropZoneContainer).removeClass('highlighted');

            if( properties.unhighlightDropzoneCallback !== null &&
                typeof properties.unhighlightDropzoneCallback === 'function'){
                    properties.unhighlightDropzoneCallback();
                }
        }

        var handleFile = function(files){
            $(properties.fileInput)[0].files = files;

            //show file info in callback
            if(properties.handleFileCallback !== null &&
                typeof properties.handleFileCallback === 'function'){
                    properties.handleFileCallback(files);
                }
        }

        var handleDrop = function(e){
            if(e.originalEvent.dataTransfer && e.originalEvent.dataTransfer.files.length){
                handleFile(e.originalEvent.dataTransfer.files);

                //update button status here
                if(properties.handleDropCallback !== null &&
                    typeof properties.handleDropCallback === 'function'){
                        properties.handleDropCallback();
                    }
            }
        }

        var handleFileChange = function(files){
            if(properties.handleFileChangeCallback !== null &&
                typeof properties.handleFileChangeCallback === 'function'){
                    properties.handleFileChangeCallback($(properties.fileInput)[0].files);
                }
        }

        var handleClick = function(e){
            $(properties.fileInput).trigger('click');
        }

        return {
            preventDefault: preventDefault,
            highlightDropzone: highlightDropzone,
            unhighlightDropzone: unhighlightDropzone,
            handleDrop: handleDrop,
            handleFile: handleFile,
            handleFileChange: handleFileChange,
            handleClick: handleClick
        }
    }

    const dropzoneFuntionalities = DropzoneFuntionalities();

    return {
        initialize: function(){
            ['dragenter','dragover','dragleave','drop'].forEach(eventName => {
                $(properties.dropZoneContainer).on(eventName,dropzoneFuntionalities.preventDefault);
            });

            ['dragenter','dragover'].forEach(eventName => {
                $(properties.dropZoneContainer).on(eventName, dropzoneFuntionalities.highlightDropzone);
            });

            $(properties.dropZoneContainer).on('dragleave', dropzoneFuntionalities.unhighlightDropzone);

            $(properties.dropZoneContainer).on('drop', dropzoneFuntionalities.handleDrop);

            $(properties.dropZoneContainer).on('click', dropzoneFuntionalities.handleClick);

            $(properties.fileInput).on('change', dropzoneFuntionalities.handleFileChange);       
        }
    }
};