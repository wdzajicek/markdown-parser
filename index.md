---
layout: default
title: Home
baseurl: ''
---

<div class="d-flex flex-column justify-content-center" style="min-height: calc(100vh - 350px)">
<div class="row">
  <div class="col-12 mb-3">
    <h2 class="display-5">Markdown</h2>
    <div class="textarea__wrapper d-flex">
      <div id="lineCount" class="textarea__linecount">
      </div>
      <textarea
     autofocus
     class="textarea typography--mono"
     id="input"
     placeholder="Write valid markdown here"
     spellcheck="false"
     style="min-height: 40vh;">
# Markdown is Fun!

-----

![WZ](./assets/img/icon_512.png){: .img-fluid.float-end width="256" height="256" }

## It's a ___magical___
### syntax
#### that's
##### easy to read
###### and write

- list item
- list item
- list item
- list item

We _gots_ **paragraphs** and a simple link: <https://www.google.com>
</textarea>
    </div>
  </div>
  <div class="col-12">
  <h2 class="display-5">HTML</h2>
    <div id="output" class="border--thin"></div>
  </div>
</div>
  
</div>

