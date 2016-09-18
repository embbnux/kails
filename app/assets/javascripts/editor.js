import SimpleMDE from 'simplemde';

require('simplemde/dist/simplemde.min.css');

new SimpleMDE({
  element: document.getElementById('article-editor'),
  spellChecker: false,
  autoDownloadFontAwesome: false,
  autofocus: true,
  indentWithTabs: false
});
