HTMLWidgets.widget({
  name: 'recogito',
  type: 'output',
  factory: function(el, width, height) {
    var formatter = function(annotation) {
      return "tag-".concat(annotation.body[0].value)
    }
    return {
      renderValue: function(x) {
        el.innerText = x.text;
        var r = Recogito.init({
          content: el.parentNode.id,
          mode: x.mode,
          formatter: formatter,
          widgets: [
            'COMMENT',
            { widget: 'TAG'}
          ],
          readOnly: false
        });
        r.on('updateAnnotation', function(a) {
          Shiny.setInputValue(x.inputId, JSON.stringify(r.getAnnotations()));
        });
        r.on('createAnnotation', function(a) {
          Shiny.setInputValue(x.inputId, JSON.stringify(r.getAnnotations()));
        });
        Shiny.addCustomMessageHandler(type = 'send-clear', function(message) {
          Shiny.setInputValue(x.inputId, JSON.stringify(r.clearAnnotations()));
        });
      },
      resize: function(width, height) {
      }
    };
  }
});
