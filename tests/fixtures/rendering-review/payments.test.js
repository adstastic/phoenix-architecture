import assert from "node:assert/strict";
import { capture } from "./payments.js";

const charges = [];
assert.equal(capture("same", charges).key, "same");
assert.equal(capture("same", charges).key, "same");
console.log("pass");
