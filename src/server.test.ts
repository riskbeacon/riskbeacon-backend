import test from "node:test";
test("backend baseline",()=>{ if (!process.env.NODE_ENV) process.env.NODE_ENV="test"; });
