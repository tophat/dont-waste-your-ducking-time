# Don't Waste Your Ducking Time

[![Builds](https://img.shields.io/circleci/project/github/tophat/dont-waste-your-ducking-time/master.svg)](https://circleci.com/gh/tophat/dont-waste-your-ducking-time)
[![codecov](https://codecov.io/gh/tophat/dont-waste-your-ducking-time/branch/master/graph/badge.svg)](https://codecov.io/gh/tophat/dont-waste-your-ducking-time)
[![Dependabot Status](https://api.dependabot.com/badges/status?host=github&repo=tophat/dont-waste-your-ducking-time)](https://dependabot.com)
[![Slack workspace](https://slackinvite.dev.tophat.com/badge.svg)](https://opensource.tophat.com/slack)
[![All Contributors](https://img.shields.io/badge/all_contributors-2-orange.svg?style=flat-square)](#contributors-)

## Overview 📃

This repo is a simple example project demonstrating how to test the different
components of a Redux application.

The general idea: **Don't write individual unit tests for your action creators,
reducers, and selectors; instead, write tests that test the whole "duck"**.

This strategy comes from [this Redux issue
thread](https://github.com/reduxjs/redux/issues/1171) in which
[@bvaughn](https://github.com/bvaughn) describes a way of testing Redux
applications in order to get "the most bang for your buck" (dare I say "bang
for your duck"?).

See the [motivation section](#motivation-) for more details on this testing strategy.

## Examples 🐓

Examples of **bad** duck tests are found [here](./src/bad.test.js).

Examples of **good** duck tests are found [here](./src/good.test.js).

Examples of **good** duck tests **involving sagas** are found
[here](./src/good.saga.test.js).

## Motivation 💪

First of all, what is a duck? It's a combination of related action creators, a
reducer, and selectors. (It can also include other Redux-related paraphernalia,
such as sagas.) Action creators create actions that when dispatched, cause
state changes in the reducer, which ultimately are manifested in different
values returned by the selectors.

You can read more about ducks in the
[ducks-modular-redux](https://github.com/erikras/ducks-modular-redux) project.

How do we test our ducks? The redux documentation gives
[examples](https://redux.js.org/recipes/writing-tests#action-creators) of how
to write unit tests for action creators, reducers, and selectors, i.e. how to
test them each in isolation. So why don't we start by writing unit tests?
That's what the [testing
pyramid](https://martinfowler.com/articles/practical-test-pyramid.html)
suggests, after all:

<p align="center">
  <img src="https://martinfowler.com/articles/practical-test-pyramid/testPyramid.png" alt="testing pyramid">
</p>

There are some examples of these kind of unit tests in this project, in [one of
the duck test files](./src/bad.test.js).

Let's step back for a moment and recall the purpose of tests:

- Tests give us confidence that our code is working as intended
- Tests give us confidence that our code is working as intended _after we do refactoring_

So good tests have the following properties:

- They fail when the code doesn't work anymore
- They don't fail when the code is still working
- They test code as it actually is used in production

With that in mind, consider what happens to our isolated action creator tests,
reducer test, and selector tests when we do the following:

- Refactor our state shape
- Accidentally introduce a bug

It turns out lots of bad things happen:

- The reducer tests fail upon refactoring, even though our code is still working, because they test implementation details. We have to mock the state.
- The selector tests disconcertingly DON'T fail when we introduce a bug in the state, because we're mocking the state. We don't have confidence that the entire action -> reducer -> selector contract is fulfilled.
- Not all of the tests pass _even when the code is actually working_.

How do we fix these problems?

_Write tests that test the whole duck!_ You can see examples of such tests in
[another duck test file](./src/good.test.js). Notice how these tests are:

- Resilient to state refactoring
- Test the _real_ state shape using a _real_ store, just like what happens in production
- Still fast
- Give confidence that all of our action -> reducer -> selector contracts are fulfilled, because it actually tests the contract

Think of a duck as having a public API: action creators and selectors are how
you interact with the duck. They represent a "public interface" to the duck. If
you only write tests using action creators and selectors, your tests are
resilient to change as long as you maintain the same interface for your action
creators and selectors.

You're not going to have an action if it doesn't trigger a state change, or at
least have the potential to trigger some state change. You're not going to have
a selector unless it gives you part of the state that gets changed by the
dispatch of some action. So when it comes to ducks, don't think of _isolated_
unit tests, think of the combined action/reducer/selector tests. The _unit_ you
want to be testing is the "three-part unit" of action creator, reducer, and
selector. They are not distinct entities, they only have meaning when
considered in relation to each other.

## Installation 🔨

Set up:

```
yarn install
yarn start
```

Run tests:

```
yarn test
```

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="http://msrose.github.io"><img src="https://avatars3.githubusercontent.com/u/3495264?v=4" width="100px;" alt=""/><br /><sub><b>Michael Rose</b></sub></a><br /><a href="https://github.com/tophat/dont-waste-your-ducking-time/commits?author=msrose" title="Code">💻</a> <a href="https://github.com/tophat/dont-waste-your-ducking-time/commits?author=msrose" title="Tests">⚠️</a> <a href="https://github.com/tophat/dont-waste-your-ducking-time/commits?author=msrose" title="Documentation">📖</a> <a href="#infra-msrose" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a></td>
    <td align="center"><a href="http://christianbattista.com"><img src="https://avatars0.githubusercontent.com/u/241211?v=4" width="100px;" alt=""/><br /><sub><b>Christian Battista</b></sub></a><br /><a href="https://github.com/tophat/dont-waste-your-ducking-time/commits?author=cbattista" title="Documentation">📖</a></td>
  </tr>
</table>

<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
