module.exports = {
  extends: 'stylelint-config-standard',
  rules: {
    'block-no-empty': true,
    'color-hex-case': 'lower',
    'color-hex-length': null,
    'color-no-invalid-hex': true,
    'length-zero-no-unit': true,
    'root-no-standard-properties': true,
    'comment-empty-line-before': ['always', {
      'except': ['first-nested'],
      'ignore': ['stylelint-commands', 'between-comments'],
    }],
    'declaration-colon-space-after': 'always',
    'max-empty-lines': 2,
    'rule-nested-empty-line-before': ['always', {
      'except': ['first-nested'],
      'ignore': ['after-comment'],
    }],
    'unit-whitelist': ['em', 'rem', '%', 's', 'ms', 'px', 'deg', 'vw', 'vh', 'dpi', 'dppx'],
    'selector-combinator-space-after': null,
    'selector-pseudo-element-colon-notation': null,
    'selector-list-comma-newline-after': null
  }
};
