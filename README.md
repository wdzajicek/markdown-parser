# Markdown Parser

**Live demo (GitHub pages):** <https://wdzajicek.github.io/markdown-parser/>

-----

## Overview

An online markdown-to-HTML parser.
Parses and renders markdown as HTML in a lightweight Bootstrap 5 website.

I'm creating this project because I wanted a lightweight JS markdown parser that supports custom classes, id's, and HTML attributes. Projects like [`marked`](https://github.com/markedjs/marked) are nice, however, it seems to have a lot of extra features and options that I don't want and no custom id's or classes (that I could find):

Example of markdown with custom id's classes and attributes:
```markdown
# Heading
{: #heading-id .class1 }

![image alt text](./path/to/image.png){: height="90" width="160" .class2.class3 }

[My link](https://google.com){: #link-id .class3 }
```

## Prerequisites

- `ruby-2.7.3` (for Jekyll v4)
- [Node Version Manager (NVM)](https://github.com/nvm-sh/nvm):
  - Install Node.js using nvm: `nvm install v18.12.1` (check `.nvmrc` file to verify current version.)
  - `bash` function to look for `.nvmrc` files:
    ```
    ## Use a local .nvmrc file if present
    enter_directory() {
      if [[ $PWD == $PREV_PWD ]]; then
        return
      fi

      PREV_PWD=$PWD
      [[ -f ".nvmrc" ]] && nvm use
    }

    export PROMPT_COMMAND=enter_directory
    ```
- OR, install the Nodejs version specified in `.nvmrc` file

## Installation

Clone the repo and install the NPM & Gem dependencies:

```bash
git clone git@github.com:wdzajicek/markdown-parser.git
cd markdown-parser
npm i && bundle i
```

Dependencies include Jekyll (and its deps) plus (see `package.json` for full list):
- `DOMPurify` - Sanitize input
- `webpack`, `babel`, and `corejs`
- **Bootstrap 5** & `popperjs`
- `autoprefixer`
- `sass`
- `npm-run-all`

## Development Build

```bash
npm run development
```

A dev build creates a development webpack bundle (for easier debugging) and injects the compiled SASS into `<style>` elements in the document's `<head>` for quicker reloading.

A development build runs `jekyll` and `webpack` in parallel. A local server is created for previewing the build in your browser on `localhost:3000`. Project files are watched for changes and the commands need to be stopped with <kbd>control</kbd> + <kbd>C</kbd>.

## Production Build

```bash
npm run production
```

A production build creates a minified production bundle and stylesheet.

Like the dev build, it also creates a server for previewing at `localhost:3000`. It watches for changes to project file so you should stop the running commands using <kbd>control</kbd> + <kbd>C</kbd>.

## GitHub Pages

```bash
npm run gh-pages
npm run copy-gh
```

View the live markdown-parser on GitHub pages: <https://wdzajicek.github.io/markdown-parser/>

A production GitHub pages build is created using the `gh-pages` npm script.

After a successful build is run it gets copied into the `docs/` directory using the `copy-gh` npm script.

