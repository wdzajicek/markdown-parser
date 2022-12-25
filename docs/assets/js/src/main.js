import '../../scss/main.scss';

window.addEventListener('load', () => {
  import('bootstrap/js/src/dropdown')
    .then(({ default: Dropdown }) => Dropdown)
    .then(Dropdown => {
      import('bootstrap/js/src/collapse')
        .then(({ default: Collapse }) => Collapse)
    }).then(() => {
      import('./footerDate')
        .then(({ default: footerDate }) => footerDate());
    })
});
