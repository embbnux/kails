import EasyMDE from 'easymde';

require('easymde/dist/easymde.min.css');

new EasyMDE({
  element: document.getElementById('article-editor'),
  spellChecker: false,
  autoDownloadFontAwesome: false,
  autofocus: true,
  indentWithTabs: false
});
