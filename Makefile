all: main.o

main.o: main.c libtea.bc
	emcc -I. main.c libtea.bc -O2 --closure=1 -o index.js -s WASM=1 -s ALLOW_MEMORY_GROWTH=1 -s RESERVED_FUNCTION_POINTERS=1 -s EXPORTED_FUNCTIONS="['_new_state','_free_state','_run_tea']" -s EXPORTED_RUNTIME_METHODS="['ccall','cwrap']"

.PHONY: all