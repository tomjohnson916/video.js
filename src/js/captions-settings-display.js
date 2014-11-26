/**
 * Display options for customizing captions visualizations
 * @param {vjs.Player|Object} player
 * @param {Object=} options
 * @constructor
 */
vjs.CaptionsSettingsDisplay = vjs.Component.extend({
  init: function(player, options){
    vjs.Component.call(this, player, options);

    var captionOptions = this.captionOptions = {
      'font-family': 'Arial',
      'font-size': '11px',
      'color': '#FFFFFF',
      'text-opacity': 1,
      'background-color': '#000000',
      'background-opacity': 0.5,
      'edge-style': 'none',
      'window-color': '#000000',
      'window-opacity': 0
    };

    this.hide();

    // testing
    this.show();
  }
});

vjs.CaptionsSettingsDisplay.prototype.createEl = function(){
  // Display Elements / Containers / Etc.
  var el, headerEl, leftCategoryEl, middleCategoryEl, rightCategoryEl,

  // Input Elements
    captionSizeEl, captionSizeOutputEl, captionFontFamilyEl, captionEdgeStyleEl,
    captionTextOpacityEl, captionTextOpacityOutputEl, captionBackgroundOpacityEl,
    captionBackgroundOpacityOutputEl, captionWindowOpacityEl, textColorEl,
    captionWindowOpacityOutputEl, backgroundColorEl, windowColorEl,

  // Event Handlers
    addEvent, onCaptionSizeChange, onCaptionFontFamilyChange, onCaptionEdgeStyleChange,
    onCaptionBackgroundOpacityChange, onCaptionTextOpacityChange, onCaptionWindowOpacityChange;

  // Create Elements
  el = vjs.Component.prototype.createEl.call(this, 'div', {
    className: 'vjs-captions-overlay'
  });

  this.contentEl_ = vjs.Component.prototype.createEl('div', {
    className: 'vjs-captions-container'
  });

  headerEl = vjs.Component.prototype.createEl.call(this, 'div', {
    className: 'vjs-captions-header',
    innerHTML: '<label>' + this.localize('Captions Settings') + '</label>' +
    '<a class="vjs-captions-close-btn" href="#">' + this.localize('close') + '</a>'
  });

  leftCategoryEl = vjs.Component.prototype.createEl.call(this, 'div', {
    className: 'vjs-captions-category',
    innerHTML: '<div>' +
    '<label>' + this.localize('Caption Sizes') + '</label>' +
    '<input class="vjs-caption-font-size" type="range" min="10" max="20"/>' +
    '<label class="vjs-caption-font-size-output">15</label>' +
    '</div>' +
    '<div>' +
    '<label>' + this.localize('Captions Font Family') + '</label>' +
    '<select class="vjs-caption-font-family">' +
    '<option value="Arial" selected>Arial</option>' +
    '<option value="serif">serif</option>' +
    '<option value="sans-serif">sans-serif</option>' +
    '</select>' +
    '</div>' +
    '<div>' +
    '<label>' + this.localize('Edge Style') + '</label>' +
    '<select class="vjs-caption-edge-style">' +
    '<option selected value="none">' + this.localize('None') + '</option>' +
    '</select>' +
    '</div>'
  });

  middleCategoryEl = vjs.Component.prototype.createEl.call(this, 'div', {
    className: 'vjs-captions-category',
    innerHTML: '<div>' +
    '<label>' + this.localize('Text Color') + '</label>' +
    '<select class="vjs-caption-font-color">' +
    '<option value="#000000">Black</option>' +
    '<option value="#FFFFFF" selected>White</option>' +
    '<option value="#0000FF">Blue</option>' +
    '<option value="#FF0000">Red</option>' +
    '<option value="#00FF00">Green</option>' +
    '</select>' +
    '</div>' +
    '<div>' +
    '<label>' + this.localize('Background Color') + '</label>' +
    '<select class="vjs-caption-background-color">' +
    '<option value="#000000" selected>Black</option>' +
    '<option value="#FFFFFF">White</option>' +
    '<option value="#0000FF">Blue</option>' +
    '<option value="#FF0000">Red</option>' +
    '<option value="#00FF00">Green</option>' +
    '</select>' +
    '</div>' +
    '<div>' +
    '<label>' + this.localize('Window Color') + '</label>' +
    '<select class="vjs-caption-window-color">' +
    '<option value="#000000" selected>Black</option>' +
    '<option value="#FFFFFF">White</option>' +
    '<option value="#0000FF">Blue</option>' +
    '<option value="#FF0000">Red</option>' +
    '<option value="#00FF00">Green</option>' +
    '</select>' +
    '</div>'
  });

  rightCategoryEl = vjs.Component.prototype.createEl.call(this, 'div', {
    className: 'vjs-captions-category',
    innerHTML: '<div>' +
    '<label for="vjs-caption-text-opacity">' + this.localize('Text Opacity') + '</label>' +
    '<input class="vjs-caption-text-opacity" type="range" min="0" max="100"/>' +
    '<label class="vjs-caption-text-opacity-output">50%</label>' +
    '</div>' +
    '<div>' +
    '<label>' + this.localize('Background Opacity') + '</label>' +
    '<input class="vjs-caption-background-opacity" type="range" min="0" max="100"/>' +
    '<label class="vjs-caption-background-opacity-output">50%</label>' +
    '</div>' +
    '<div>' +
    '<label>' + this.localize('Window Opacity') + '</label>' +
    '<input class="vjs-caption-window-opacity" type="range" min="0" max="100"/>' +
    '<label class="vjs-caption-window-opacity-output">50%</label>' +
    '</div>'
  });

  // Setup Display List
  this.contentEl_.appendChild(headerEl);
  this.contentEl_.appendChild(leftCategoryEl);
  this.contentEl_.appendChild(middleCategoryEl);
  this.contentEl_.appendChild(rightCategoryEl);

  el.appendChild(this.contentEl_);

  // Define Elements
  this.captionSizeEl = captionSizeEl = this.contentEl_.querySelector('.vjs-caption-font-size');
  this.captionSizeOutputEl = captionSizeOutputEl = this.contentEl_.querySelector('.vjs-caption-font-size-output');
  this.captionFontFamilyEl = captionFontFamilyEl = this.contentEl_.querySelector('.vjs-caption-font-family');
  this.captionEdgeStyleEl = captionEdgeStyleEl = this.contentEl_.querySelector('.vjs-caption-edge-style');
  this.captionTextOpacityEl = captionTextOpacityEl = this.contentEl_.querySelector('.vjs-caption-text-opacity');
  this.captionTextOpacityOutputEl = captionTextOpacityOutputEl = this.contentEl_.querySelector('.vjs-caption-text-opacity-output');
  this.captionBackgroundOpacityEl = captionBackgroundOpacityEl = this.contentEl_.querySelector('.vjs-caption-background-opacity');
  this.captionBackgroundOpacityOutputEl = captionBackgroundOpacityOutputEl = this.contentEl_.querySelector('.vjs-caption-background-opacity-output');
  this.captionWindowOpacityEl = captionWindowOpacityEl = this.contentEl_.querySelector('.vjs-caption-window-opacity');
  this.captionWindowOpacityOutputEl = captionWindowOpacityOutputEl = this.contentEl_.querySelector('.vjs-caption-window-opacity-output');

  this.textColorEl = textColorEl = this.contentEl_.querySelector('.vjs-caption-edge-style');
  this.backgroundColorEl = backgroundColorEl = this.contentEl_.querySelector('.vjs-caption-edge-style');
  this.windowColorEl = windowColorEl = this.contentEl_.querySelector('.vjs-caption-edge-style');

  // Add Event Handlers
  addEvent = function(el, type, callback) {
    if (el.addEventListener) {
      return el.addEventListener(type, callback, false);
    }
    return el.attachEvent(type, callback);
  };
  // Change Handlers for Input Elements
  onCaptionSizeChange = function(event) {
    this.setCaptionSize(event.target.value);
  };
  onCaptionFontFamilyChange = function(event) {
    this.setCaptionFontFamily(event.target.value);
  };
  onCaptionEdgeStyleChange = function(event) {
    this.setEdgeStyle(event.target.value);
  };
  onCaptionBackgroundOpacityChange = function(event) {
    this.setBackgroundOpacity(event.target.value/100);
  };
  onCaptionTextOpacityChange = function(event) {
    this.setTextOpacity(event.target.value/100);
  };
  onCaptionWindowOpacityChange = function(event) {
    this.setWindowOpacity(event.target.value/100);
  };
  onCaptionFontColorChange = function(event) {
    this.setEdgeStyle(event.target.value);
  };
  onCaptionBackgroundColorChange = function(event) {
    this.setEdgeStyle(event.target.value);
  };
  onCaptionWindowColorChange = function(event) {
    this.setEdgeStyle(event.target.value);
  };

  // Bind Handlers
  addEvent(headerEl.querySelector('.vjs-captions-close-btn'), 'click', vjs.bind(this,function(){this.hide()}));
  addEvent(captionSizeEl, 'change', vjs.bind(this, onCaptionSizeChange));
  addEvent(captionFontFamilyEl, 'change', vjs.bind(this,onCaptionFontFamilyChange));
  addEvent(captionEdgeStyleEl, 'change', vjs.bind(this,onCaptionEdgeStyleChange));
  addEvent(captionBackgroundOpacityEl, 'change', vjs.bind(this,onCaptionBackgroundOpacityChange));
  addEvent(captionTextOpacityEl, 'change', vjs.bind(this,onCaptionTextOpacityChange));
  addEvent(captionWindowOpacityEl, 'change', vjs.bind(this,onCaptionWindowOpacityChange));

  return el;
};

// Public API
// Extend component.show with update so that values seen are most current
// on refresh
vjs.CaptionsSettingsDisplay.prototype.show = function(){
  this.update();
  vjs.Component.prototype.show.call(this);
};
// Update the values of the display components
vjs.CaptionsSettingsDisplay.prototype.update = function(){
  this.captionSizeEl.value = this.captionOptions['font-size'].replace('px','');
  this.captionSizeOutputEl.innerHTML = this.captionOptions['font-size'];
  this.captionTextOpacityEl.value = this.captionOptions['text-opacity']*100;
  this.captionTextOpacityOutputEl.innerHTML = (this.captionOptions['text-opacity']*100) + '%';
  this.captionBackgroundOpacityEl.value = this.captionOptions['background-opacity']*100;
  this.captionBackgroundOpacityOutputEl.innerHTML = (this.captionOptions['background-opacity']*100) + '%';
  this.captionWindowOpacityEl.value = this.captionOptions['window-opacity']*100;
  this.captionWindowOpacityOutputEl.innerHTML = (this.captionOptions['window-opacity']*100) + '%';
};
// Set the Caption Size
vjs.CaptionsSettingsDisplay.prototype.setCaptionSize = function(fontSize) {
  this.captionOptions['font-size'] = fontSize + 'px';
  this.update();
};
// Set the Caption FontFamily
vjs.CaptionsSettingsDisplay.prototype.setCaptionFontFamily = function(fontFamily) {
  this.captionOptions['font-family'] = fontFamily;
  this.update();
};
// Set the Edge Style
vjs.CaptionsSettingsDisplay.prototype.setEdgeStyle = function(edgeStyle) {
  this.captionOptions['edge-style'] = edgeStyle;
  this.update();
};
// Set the Background Opacity 0-1
vjs.CaptionsSettingsDisplay.prototype.setBackgroundOpacity = function(opacity) {
  this.captionOptions['background-opacity'] = opacity;
  this.update();
};
// Set the Text Opacity 0-1
vjs.CaptionsSettingsDisplay.prototype.setTextOpacity = function(opacity) {
  this.captionOptions['text-opacity'] = opacity;
  this.update();
};
// Set the Window Opacity 0-1
vjs.CaptionsSettingsDisplay.prototype.setWindowOpacity = function(opacity) {
  this.captionOptions['window-opacity'] = opacity;
  this.update();
};
