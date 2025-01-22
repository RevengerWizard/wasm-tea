# A simple Makefile to quickly compile Teascript src/ into libtea.a
# Definitely going to change in the future

emscripten:
	$(MAKE) "CC=emcc" "TARGET_AR=emar rcu" "TARGET_STRIP=:" \
	"XCFLAGS=-DTEA_OS=TEA_OS_OTHER -DTEA_TARGET=1" \
	"CCOPT=-Os" "LDFLAGS=-Os" \
	"BUILDMODE=static" \
	"TEA_T=tea.js" all
