# @forvue/vue-directives
Vue directives

[![Build Status](https://img.shields.io/circleci/project/liliuzhu/vue-directives/master.svg?style=flat-square)](https://circleci.com/gh/liliuzhu/vue-directives)
[![CircleCI](https://circleci.com/gh/liliuzhu/vue-directives.svg?style=svg)](https://circleci.com/gh/liliuzhu/vue-directives)
[![npm version](https://img.shields.io/npm/v/@forvue/vue-directives.svg?style=flat-square)](https://www.npmjs.com/package/@forvue/vue-directives)
[![npm downloads](https://img.shields.io/npm/dt/@forvue/vue-directives.svg?style=flat-square)](https://www.npmjs.com/package/@forvue/vue-directives)
[![npm downloads](https://img.shields.io/npm/dm/@forvue/vue-directives.svg?style=flat-square)](https://www.npmjs.com/package/@forvue/vue-directives)
[![npm license](https://img.shields.io/npm/l/@forvue/vue-directives.svg?style=flat-square)](https://www.npmjs.com/package/@forvue/vue-directives)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)

Vue module for directives in your applications. Some of goals of this project worth noting include:

* Be lightweight, powerful and easy to use
* Supports Multi-parameter
* Supports Vue 2.0



# Table of Contents

* [___Requirements___](#requirements)
* [___Installation___](#installation)
* [___Usage___](#usage)
  * [___DirectivesOptions___](#DirectivesOptions)
* [___Authors && Contributors___](#authors-&&-Contributors)
* [___License___](#license)


# Requirements

- [Vue.js](https://github.com/vuejs/vue) `2.x`


# Installation

## npm

```bash

$ npm i @forvue/vue-directives -S

```
## yarn

```bash

$ yuarn add @forvue/vue-directives

```

## CDN

CDN: [https://unpkg.com/@forvue/vue-directives@0.0.2/dist/vue-directives.min.js](https://unpkg.com/@forvue/vue-directives@0.0.2/dist/vue-directives.min.js)

# Usage
### Global Registration
main.js:

```javascript
import Vue from 'vue'
import App from './App.vue'
import VueDirectives from '@forvue/vue-directives'

Vue.use(VueDirectives)

new Vue({
  el: 'body',
  components: {
    App
  }
})
```
### Local Registration
XXX.vue

```html
<template>
  <div class="hello">
    <input type="text" v-integer v-model="integer">
  </div>
</template>
<script >
  import {integer} from '@forvue/vue-directives'
  export default {
    data() {
      return {
         integer: '1'
      }
    },
    directives: {
      integer
    }
  }
</script>
```
### CDN Registration
template:
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <script src="https://unpkg.com/vue@2.6.10/dist/vue.min.js"></script>
    <script src="https://unpkg.com/@forvue/vue-directives@0.0.2/dist/vue-directives.min.js"></script>
    <title>VueDirectives</title>
</head>
<body>
<div id="app">
    <input v-model="number" v-integer type="text">
</div>
<script>
    window.onload=function(){
        Vue.use(VueDirectives)
        let vm=new Vue({
            el:'#app',
            data:{
                number: 2
            }
        })
    }
    // or CDN Registration
    window.onload=function(){
            let vm=new Vue({
                el:'#app',
                data:{
                    number: 2
                },
                directives: {
                    integer: VueDirectives.integer
                }
            })
        }
</script>
</body>
</html>

```

## DirectivesOptions
### v-integer.reqired.cover="{}"
|key|description|default|options|mode|
|:---|---|---|---|---|
| `reqired`|`Not empty`|`false`|`Boolean`|`modifiers&value`|
| `cover`|`Overflow Coverage`|`false`|`Boolean`|`modifiers&value`|
| `reqireValue`|`Overflow empty`|`0`|`Number`|`value`|
| `max`|`input Maximum value`|`Infinity`|`Number`|`value`|
| `min`|`input minimum value`|`-Infinity`|`Number`|`value`|
| `maxFigures`|`max length`|`Infinity`|`Number`|`value`|
| `coverEvents`|`can Overflow events`|`['blur']`|`Array`|`value`|
| `warningEvents`|`warning events`|`['blur']`|`Array`|`value`|
| `tipFun`|`warning callback`|`null`|`Function`|`value`|



# Authors && Contributors

- [liliuzhu](https://github.com/liliuzhu)

# License

[The MIT License](http://opensource.org/licenses/MIT)
