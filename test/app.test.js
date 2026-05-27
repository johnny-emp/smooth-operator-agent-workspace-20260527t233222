import assert from "node:assert/strict";
import test from "node:test";
import { initialState, reduceCounter, viewModel } from "../src/app.js";

test("counter increment increases by one", () => {
  assert.equal(reduceCounter(0, "increment"), 1);
});

test("counter decrement decreases by one", () => {
  assert.equal(reduceCounter(0, "decrement"), -1);
});

test("view model exposes the launch badge and activity", () => {
  const model = viewModel(initialState);
  assert.equal(model.launchBadge, "Launch ready");
  assert.deepEqual(model.activity, ["Issue accepted", "Agent branch created", "Pull request waits for review"]);
});
