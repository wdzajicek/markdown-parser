# Project Boilerplate

**GitHub Pages:** <https://wdzajicek.github.io/project-boilerplate/>

This a starting point for creating new GitHub projects.

## Prerequisites

- `ruby-2.6.3` (for Jekyll v4)
- [Node Version Manager (NVM)](https://github.com/nvm-sh/nvm)
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

```bash
git clone git@github.com:wdzajicek/javascript.git
cd javascript
npm i && bundle i
```

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

A production GitHub pages build is created using the `gh-pages` npm script.

After a successful build is run it gets copied into the `docs/` directory using the `copy-gh` npm script.
