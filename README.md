# Don't Waste Your Ducking Time

[![Builds](https://img.shields.io/circleci/project/github/tophat/dont-waste-your-ducking-time/master.svg)](https://circleci.com/gh/tophat/dont-waste-your-ducking-time)
[![Dependabot Status](https://api.dependabot.com/badges/status?host=github&repo=tophat/dont-waste-your-ducking-time)](https://dependabot.com)
[![Slack workspace](https://slackinvite.dev.tophat.com/badge.svg)](https://opensource.tophat.com/slack)

## Overview

WIP. This repo is an opinionated guide on how to test your redux "ducks".

More to come in this section.

## Motivation

First of all, what is a duck? It's a combination of related action creators, a
reducer, and selectors. Action creators create actions that when dispatched,
cause state changes in the reducer, which ultimately are manifested in
different values returned by the selectors.

You can read more about ducks in the
[ducks-modular-redux](https://github.com/erikras/ducks-modular-redux) project.

How do we test our ducks? The redux documentation gives
[examples](https://redux.js.org/recipes/writing-tests#action-creators) of how
to write unit tests for action creators, reducers, and selectors, i.e. how to
test them each in isolation. So why don't we start there? That's what the
[testing pyramid](https://martinfowler.com/articles/practical-test-pyramid.html)
suggests, after all:

![testing pyramid](https://martinfowler.com/articles/practical-test-pyramid/testPyramid.png)

There are some examples of these kind of tests in this project, in the [duck
test file](./src/duck.test.js).

Let's step back for a moment and recall the purpose of tests:

- Tests give us confidence that our code is working as intended
- Tests give us confidence that our code is working as intended AFTER WE DO REFACTORING

So good tests:

- Break when the code doesn't work anymore
- Don't break when the code is still working
- Test code as it actually is used in production

So what happens to our isolated action creator, reducer, and selector tests when we do the following:
- Refactor our state shape
- Accidentally introduce a bug

Lots of bad things happen:
- The reducer tests fail upon refactoring, even though our code is still working, because they test implementation details. We have to mock the state.
- The selector tests disconcertingly DON'T fail when we introduce a bug in the state, because we're mocking the state. We don't have confidence that the entire action -> reducer -> selector contract is fulfilled.
- Not all of the tests pass EVEN WHEN THE CODE IS ACTUALLY WORKING

How do we fix these problems?

WRITE TESTS THAT TEST THE WHOLE DUCK! You can see examples of such tests in the [duck test file](./src/duck.test.js). Notice how these tests are:
- Resilient to state refactoring
- Test the REAL state shape using a REAL store, just like what happens in production
- Still fast
- Give confidence that all of our action -> reducer -> selector contracts are fulfilled, because it actually tests the contract.

Think of a duck as having a public API: action creators and selectors are how
you interact with the duck. They represent a "public interface" to the duck. If
you only write tests using action creators and selectors, your tests are
resilient to change as long as you maintain the same interface for your action
creators and selectors.

You're not going to have an action if it doesn't trigger a state change, or at
least have the potential to trigger some state change. You're not going to have
a selector unless it gives you part of the state that gets changed by the
dispatch of some action. So when it comes to ducks, don't think of ISOLATED
unit tests, think of the combined action/reducer/selector tests. The UNIT you
want to be testing is the "three-part unit" of action creator, reducer, and
selector. They are not distinct entities, they only have meaning when
considered in relation to each other.

## Installation

Set up:

```
yarn install
yarn start
```

Run tests:

```
yarn test
```
