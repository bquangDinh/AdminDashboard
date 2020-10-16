"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var NeumorphismSelect = function NeumorphismSelect(_properties) {
  var defaultProperties = {
    selectContainer: '.select-field',
    selectItems: '.select-items',
    selectSelected: '.select-selected'
  };
  var properties = Object.assign(defaultProperties, _properties);
  return {
    initialize: function initialize() {
      var preloaded = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      var that = this;
      $(properties.selectContainer).each(function (index) {
        var parent = this;
        var selectElement = $(this).find('select').first();
        var selectItems = $(this).find(properties.selectItems).first();
        $(selectItems).addClass('hide'); //get options count of the select

        var options = $(selectElement).find('option'); //if select has no options, then hide the select-items div

        if (options.length === 0) {
          $(selectItems).addClass('hide');
        } else {
          //put all options to select-items div
          var _iteratorNormalCompletion = true;
          var _didIteratorError = false;
          var _iteratorError = undefined;

          try {
            var _loop = function _loop() {
              var _step$value = _slicedToArray(_step.value, 2),
                  index = _step$value[0],
                  option = _step$value[1];

              var item = $("<div data-value=".concat($(option).val(), ">").concat($(option).text(), "</div>")); //set default to the first option

              if (index === 0 && preloaded == false) {
                $(option).prop('selected', true);
                $(item).addClass('same-as-selected');
                $(parent).find(properties.selectSelected + ' > p').first().text($(option).text());
              } //add click event for item


              $(item).on('click', function (e) {
                if ($(this).hasClass('same-as-selected')) {
                  return;
                }

                $(option).prop('selected', true); //remove others which have same-as-selected class

                $(selectItems).find('div.same-as-selected').first().removeClass('same-as-selected');
                $(this).addClass('same-as-selected');
                $(parent).find('.select-selected > p').first().text($(this).text());
              }); //append to selectItems

              selectItems.append(item);
            };

            for (var _iterator = options.toArray().entries()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
              _loop();
            }
          } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion && _iterator["return"] != null) {
                _iterator["return"]();
              }
            } finally {
              if (_didIteratorError) {
                throw _iteratorError;
              }
            }
          }

          $(parent).find(properties.selectSelected).first().on('click', function (e) {
            e.stopPropagation();
            that.closeAllSelects(this);
            $(selectItems).toggleClass('hide');
          });
        }
      });
    },
    closeAllSelects: function closeAllSelects(exceptElement) {
      $(properties.selectContainer).each(function (index) {
        if (!$(this).is(exceptElement)) {
          $(this).find(properties.selectItems).first().addClass('hide');
          $(this).find(properties.selectSelected).first().removeClass('select-arrow-active');
        }
      });
    }
  };
};

var DropZone = function DropZone(_properties) {
  var defaultProperties = {
    dropZoneContainer: null,
    fileInput: null,
    highlightDropzoneCallback: null,
    unhighlightDropzoneCallback: null,
    handleDropCallback: null,
    handleClickCallback: null,
    handleFileCallback: null,
    handleFileChangeCallback: null
  };
  var properties = Object.assign(defaultProperties, _properties);

  var DropzoneFuntionalities = function DropzoneFuntionalities() {
    var preventDefault = function preventDefault(e) {
      e.preventDefault();
      e.stopPropagation();
    };

    var highlightDropzone = function highlightDropzone(e) {
      $(properties.dropZoneContainer).addClass('highlighted');

      if (properties.highlightDropzoneCallback !== null && typeof properties.highlightDropzoneCallback === 'function') {
        properties.highlightDropzoneCallback();
      }
    };

    var unhighlightDropzone = function unhighlightDropzone(e) {
      $(properties.dropZoneContainer).removeClass('highlighted');

      if (properties.unhighlightDropzoneCallback !== null && typeof properties.unhighlightDropzoneCallback === 'function') {
        properties.unhighlightDropzoneCallback();
      }
    };

    var handleFile = function handleFile(files) {
      $(properties.fileInput)[0].files = files; //show file info in callback

      if (properties.handleFileCallback !== null && typeof properties.handleFileCallback === 'function') {
        properties.handleFileCallback(files);
      }
    };

    var handleDrop = function handleDrop(e) {
      if (e.originalEvent.dataTransfer && e.originalEvent.dataTransfer.files.length) {
        handleFile(e.originalEvent.dataTransfer.files); //update button status here

        if (properties.handleDropCallback !== null && typeof properties.handleDropCallback === 'function') {
          properties.handleDropCallback();
        }
      }
    };

    var handleFileChange = function handleFileChange(files) {
      if (properties.handleFileChangeCallback !== null && typeof properties.handleFileChangeCallback === 'function') {
        properties.handleFileChangeCallback($(properties.fileInput)[0].files);
      }
    };

    var handleClick = function handleClick(e) {
      $(properties.fileInput).trigger('click');
    };

    return {
      preventDefault: preventDefault,
      highlightDropzone: highlightDropzone,
      unhighlightDropzone: unhighlightDropzone,
      handleDrop: handleDrop,
      handleFile: handleFile,
      handleFileChange: handleFileChange,
      handleClick: handleClick
    };
  };

  var dropzoneFuntionalities = DropzoneFuntionalities();
  return {
    initialize: function initialize() {
      ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(function (eventName) {
        $(properties.dropZoneContainer).on(eventName, dropzoneFuntionalities.preventDefault);
      });
      ['dragenter', 'dragover'].forEach(function (eventName) {
        $(properties.dropZoneContainer).on(eventName, dropzoneFuntionalities.highlightDropzone);
      });
      $(properties.dropZoneContainer).on('dragleave', dropzoneFuntionalities.unhighlightDropzone);
      $(properties.dropZoneContainer).on('drop', dropzoneFuntionalities.handleDrop);
      $(properties.dropZoneContainer).on('click', dropzoneFuntionalities.handleClick);
      $(properties.fileInput).on('change', dropzoneFuntionalities.handleFileChange);
    }
  };
};