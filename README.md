# [revengerwizard.github.io/wasm-tea/](https://revengerwizard.github.io/wasm-tea/)

## Teascript WASM

A Teascript interpreter compiled to WASM, running in the browser.

A few notes:
- `clang` and `wasi-sdk` is required to compile the code
- Must compile [Teascript](https://github.com/RevengerWizard/teascript) to target WASM + WASI
- Since browsers do not implement the WASI interface, all its API functions need to be implemented in Javascript code
- Some libc functions may be incomplete or not functioning, for example clocks. These can be overridden in Javascript