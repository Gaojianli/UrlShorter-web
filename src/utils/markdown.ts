import MarkdownIt from 'markdown-it';

const md = new MarkdownIt({
  linkify: true,
});

const defaultRender =
  md.renderer.rules.link_open ||
  function (tokens, idx, options, _env, self) {
    return self.renderToken(tokens, idx, options);
  };

md.renderer.rules.link_open = function (tokens, idx, options, env, self) {
  tokens[idx]!.attrSet('target', '_blank');
  return defaultRender(tokens, idx, options, env, self);
};

export default md;
