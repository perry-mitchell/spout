<p align="center">
  <img width="140" height="140" src="https://github.com/perry-mitchell/spout/raw/master/spout.gif">
</p>

# Spout
> Data transfer across every medium

## About
Spout is a data transfer framework designed at making sending data between applications, machines and protocols easy. Spout is a JavaScript/NodeJS framework which is split into libraries targeting each platform. This is the core library that houses the fundamentals.

## Installation
Run the following to install Spout:

```shell
npm install spout --save
```

## Usage
The most basic component is `pipe` - Pipes are functions that accept data and move it onwards to a _target_. Targets can be other pipes, components or simple functions. Data is transferred throughout Spout within arrays.

```javascript
const { pipe } = require("spout");

const p = pipe(console.log);
p([1, 2, 3]);
p([4, 5]);
// Asynchronously logged: [1, 2, 3, 4, 5]
```

Pipes can be connected to other pipes and components. One such component is `transform`, which is essentially a pipe with a constructor more suited for providing a **transform function**. Each _point_ of data is passed through the transformer.

```javascript
const { pipe, transform } = require("spout");

const t = transform(x => x * 2, console.log);
t([1, 2]);
// Asynchronously logged: [2, 4]

const p = pipe(t);
p(8); // You can pass a single data point (non-array) as well
// Asynchronously logged: [16]
```
