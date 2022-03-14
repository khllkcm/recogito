HTMLWidgets.widget({
  name: 'recogitotagsonly',
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
            recogito.FlagWidget,
            'TAG'
          ],
          readOnly: false
        });
        r.on('updateAnnotation', function(a) {
          Shiny.setInputValue(x.inputId, JSON.stringify(r.getAnnotations()));
        });
        r.on('createAnnotation', function(a) {
          Shiny.setInputValue(x.inputId, JSON.stringify(r.getAnnotations()));
        });
        
        document.getElementById('hiddenSelectedWord').addEventListener('change', 
          e => Shiny.setInputValue("selectedWord",e.target.value, {priority: "event"})
        );
        
        r.setMode('ANNOTATION')
      },
      resize: function(width, height) {
      }
    };
  }
});
