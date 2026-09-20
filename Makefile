CC = clang
WASM_CFLAGS = -O2 -I. -D_WASI_EMULATED_SIGNAL -fno-stack-protector
WASI_SYSROOT ?=
WASM_LDFLAGS = -Wl,--no-entry,--export-all,--export=malloc,--export=free,--allow-undefined \
               -Wl,--stack-first,-z,stack-size=1048576 \
               -lsetjmp

LIBTEA = /c/Users/Valentin/Documents/Teascript/teascript/src/libtea-wasm.a

all: demo.wasm

demo.wasm.o: demo.c
	$(CC) --target=wasm32-wasip1 --sysroot=$(WASI_SYSROOT) $(WASM_CFLAGS) -c $< -o $@

demo.wasm: demo.wasm.o
	$(CC) --target=wasm32-wasip1 --sysroot=$(WASI_SYSROOT) $(WASM_CFLAGS) $(WASM_LDFLAGS) \
		-Wl,--whole-archive $(LIBTEA) -Wl,--no-whole-archive $< -o $@

.PHONY: all clean

clean:
	$(RM) demo.o demo.wasm
