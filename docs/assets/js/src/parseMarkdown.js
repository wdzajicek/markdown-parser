const complexLink = /\[(?<txt>[^\]]+)\]\((?<href>[^\)]+)\)\{:\s?(?<classes>(?:\.(?:[^\.\s\}]+))+)?(?<attrs>(?:\s\w+="[^"]+")+)?\s?\}/g;
const complexImg = /!\[(?<alt>[^\]]+)\]\((?<src>[^\)]+)\)\{:\s?(?<classes>(?:\.(?:[^\.\s\}]+))+)?\s?(?<attrs>(?:\s[\w-]+="[^"]+")+)?\s?\}/g;
const DEFAULT_CONFIG = {
  auto_ids: true
};

const pipe = (x0, ...fns) => fns.reduce(
  (x, f) => f(x),
  x0
);

const createId = str => {
  return (str
    .toLowerCase()
    .split(' ')
    .map((word, i) => {
      // Strip numbers from start of first word
      if (i === 0) word = word.replace(/^\d+/, '');
      if (word === '&') word = 'and';

      return word.replace(/[^\w\d_-]/g, '');
    })
    .join('-'))
}

const headings = str => str.replace(
  /^(#{1,6})\s(.+)$/gm,
  (m, l, txt) => {
    const auto_ids = headings.auto_ids;
    const level = l.length;
    const id = auto_ids ? ` id="${createId(txt)}"` : '' ;

    return `<h${level}${id}>${txt}</h${level}>`;
  }
);

const embolden = str => str.replace(
  /[*_]{2}([^*_]+)[*_]{2}/g,
  `<strong>$1</strong>`
);

const emphasize = str => str.replace(
  /_([^_\n]+)_|\*([^\*\n]+)\*/gm,
  `<em>$1$2</em>`
);

const linkReplacer = (match, p1, p2) => p2.search(/^https?:\/\//) !== -1 ?
  `<a href="${p2}" target="_blank" rel="noopener noreferrer">${p1}</a>` :
  `<a href="${p2}">${p1}</a>`;

const linkify = (str) => str.replace(
  /\[([^\]]+)\]\(([^\)]+)\)/g,
  linkReplacer
);

const imageify = str => str.replace(
  /!\[([^\]]+)\]\(([^\)]+)\)/g,
  `<img class="img-fluid" src="$2" alt="$1">`
);

const complexImageify = str => str.replace(
  complexImg,
  (...args) => {
    const { alt, src, classes, attrs } = args[args.length - 1];
    const classAttr = classes === undefined ? '' : `class="${classes.replace(/(^\.|\.)/g, ' ').trimStart()}"`;

    return `<img alt="${alt}" ${classAttr}${attrs === undefined ? '' : attrs} src="${src}">`;
  }
);

const complexLinkify = str => str.replace(
  complexLink,
  (...args) => {
    const { txt, href, classes, attrs } = args[args.length - 1];
    const classAttr = classes === undefined ? '' : `class="${classes}"`;
    const targetAttrs = href.search(/^https?:\/\//g) !== -1 ? '' : 'target="_blank" rel="noopener noreferrer"';

    return `<a ${classAttr}${attrs === undefined ? '' : attrs}${targetAttrs} href="${href}">${txt}</a>`;
  }
);

const listUnordered = str => str.replace(
  /^-\s(.+)$/gm,
  `<li>$1</li>`
)

const wrapUnordered = str => str.replace(
  /(<li>.+<\/li>\n)+/g,
  `<ul>$&</ul>`
)

// const listOrdered = str => str.replace(
//   /^\d\.\s(.+)$/gm,
//   `<li>$1</li>`
// )

// const wrapOrdered = str => str.replace(
//   /(?<!<ul>)(<li>.+<\/li>\n)+(?!<\/ul>)/g,
//   `<ol>$&</ol>`
// )

const paragraphize = str => str.replace(
  /^[^\n<\{].+$/gm,
  (match) => `<p>${match}</p>`
);

const rule = str => str.replace(
  /^-{3,5}$/gm,
  '<hr>'
);

function parseMarkdown(string, settings) {
  const config = settings || DEFAULT_CONFIG;

  headings.auto_ids = config.auto_ids;
  
  const html = pipe(string,
    complexImageify,
    complexLinkify,
    imageify,
    linkify,
    embolden,
    emphasize,
    headings,
    listUnordered,
    wrapUnordered,
    // listOrdered,
    // wrapOrdered,
    rule,
    paragraphize
  );

  return html;
}


export default parseMarkdown;
