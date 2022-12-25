import '../../scss/main.scss';

let testMarkdown = `
# My Wonderful h1

## Some h2!

### 1999FU Tax Form!

#### Something® Yay!

##### You & Me

This *is a* [paragraph](https://google.com) with **some inline** elements.
`;

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
              let initial = DOMPurify.sanitize(input.value, { USE_PROFILES: { html: true } });

              initialRender = true;
              out.innerHTML = parseMarkdown(initial, { auto_ids: true });
            }

            input.addEventListener('keyup', () => {
              let clean = DOMPurify.sanitize(input.value, { USE_PROFILES: { html: true } });
              
              out.innerHTML = parseMarkdown(clean, { auto_ids: true });
            });

            input.focus();
          });
        })
    })
});
