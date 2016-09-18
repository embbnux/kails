import MarkdownIt from 'markdown-it';
import Xss from 'xss';

const md = new MarkdownIt({
  breaks: false,
  linkify: true,
  typographer:  true
});

const xss = new Xss.FilterXSS({
  onIgnoreTagAttr: function(tag, name, value, _isWhiteAttr) {
    if (tag === 'pre' && name === 'class') {
      return name + '="' + Xss.escapeAttrValue(value) + '"';
    }
  }
});

exports.markdown = function(text) {
  return '<div class="markdown-text">' + xss.process(md.render(text || '')) + '</div>';
};
