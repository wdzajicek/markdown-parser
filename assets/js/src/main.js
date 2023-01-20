import '../../scss/main.scss';

const simpleLinkify = str => str.replace(
  /<(https?:\/\/[^>]+)>/g,
  `[$1]($1)`
);

window.addEventListener('load', () => {
  import('bootstrap/js/src/dropdown')
    .then(({ default: Dropdown }) => Dropdown)
    .then(Dropdown => {
      import('bootstrap/js/src/collapse')
        .then(({ default: Collapse }) => Collapse)
    }).then(() => {
      import('./footerDate')
        .then(({ default: footerDate }) => footerDate());

      import('./parseMarkdown')
        .then(({ default: parseMarkdown }) => parseMarkdown)
        .then(parseMarkdown => {
          import('dompurify').then(({ default: DOMPurify }) => {
            const input = document.getElementById('input');
            const out = document.getElementById('output');
            let initialRender = false;

            if (!initialRender) {
              let initial = DOMPurify.sanitize(
                simpleLinkify(input.value),
                { USE_PROFILES: { html: true } }
              );

              initialRender = true;
              out.innerHTML = parseMarkdown(initial, { auto_ids: true });
            }
            

            input.addEventListener('keyup', () => {
              let clean = DOMPurify.sanitize(
                simpleLinkify(input.value),
                { USE_PROFILES: { html: true } }
              );
              
              out.innerHTML = parseMarkdown(clean, { auto_ids: true });
            });
          });
        })
      if (document.getElementById('lineCount')) {
        import('./textareaLineCount')
          .then(({ default: textareaLineCount }) => textareaLineCount());
      }
    })
});
