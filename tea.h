/*
** tea.h
** Teascript C API
*/

#ifndef _TEA_H
#define _TEA_H

#include <stdarg.h>
#include <stddef.h>
#include <stdbool.h>

#include "teaconf.h"

#define TEA_REPOSITORY "https://github.com/RevengerWizard/teascript"

#define TEA_VERSION_MAJOR 0
#define TEA_VERSION_MINOR 0
#define TEA_VERSION_PATCH 0

#define TEA_VERSION_NUMBER (TEA_VERSION_MAJOR * 10000 + TEA_VERSION_MINOR * 100 + TEA_VERSION_PATCH)

#define TEA_VERSION "0.0.0"

#define TEA_SIGNATURE "\x1bTea"

#define TEA_MIN_STACK 20

typedef struct TeaState TeaState;

typedef void (*TeaCFunction)(TeaState* T);

typedef const char* (*TeaReader)(TeaState* T, void* ud, size_t* sz);

typedef int (*TeaWriter)(TeaState* T, void* ud, const void* p, size_t sz);

typedef void* (*TeaAlloc)(void* ud, void* ptr, size_t osize, size_t nsize);

typedef struct TeaReg
{
    const char* name;
    TeaCFunction fn;
    int nargs;
} TeaReg;

typedef TeaReg TeaModule;

typedef struct TeaClass
{
    const char* name;
    const char* type;
    TeaCFunction fn;
    int nargs;
} TeaClass;

typedef TeaClass TeaInstance;

#define TEA_MASK_NONE       (1 << TEA_TYPE_NONE)
#define TEA_MASK_NULL       (1 << TEA_TYPE_NULL)
#define TEA_MASK_NUMBER     (1 << TEA_TYPE_NUMBER)
#define TEA_MASK_BOOL       (1 << TEA_TYPE_BOOL)
#define TEA_MASK_STRING     (1 << TEA_TYPE_STRING)
#define TEA_MASK_RANGE      (1 << TEA_TYPE_RANGE)
#define TEA_MASK_FUNCTION   (1 << TEA_TYPE_FUNCTION)
#define TEA_MASK_MODULE     (1 << TEA_TYPE_MODULE)
#define TEA_MASK_CLASS      (1 << TEA_TYPE_CLASS)
#define TEA_MASK_INSTANCE   (1 << TEA_TYPE_INSTANCE)
#define TEA_MASK_LIST       (1 << TEA_TYPE_LIST)
#define TEA_MASK_MAP        (1 << TEA_TYPE_MAP)
#define TEA_MASK_FILE       (1 << TEA_TYPE_FILE)
#define TEA_MASK_USERDATA   (1 << TEA_TYPE_USERDATA)

#define TEA_VARARGS (-1)

enum
{
    TEA_OK,
    TEA_SYNTAX_ERROR,
    TEA_RUNTIME_ERROR,
    TEA_MEMORY_ERROR,
    TEA_FILE_ERROR,
    TEA_ERROR_ERROR
};

enum
{
    TEA_TYPE_NONE,
    TEA_TYPE_NULL,
    TEA_TYPE_NUMBER,
    TEA_TYPE_BOOL,
    TEA_TYPE_STRING,
    TEA_TYPE_RANGE,
    TEA_TYPE_FUNCTION,
    TEA_TYPE_MODULE,
    TEA_TYPE_CLASS,
    TEA_TYPE_INSTANCE,
    TEA_TYPE_LIST,
    TEA_TYPE_MAP,
    TEA_TYPE_FILE,
};

TEA_API TeaState* tea_new_state(TeaAlloc allocf, void* ud);
TEA_API void tea_close(TeaState* T);
TEA_API void tea_set_argv(TeaState* T, int argc, char** argv, int argf);
TEA_API void tea_set_repl(TeaState* T, bool b);

TEA_API TeaCFunction tea_atpanic(TeaState* T, TeaCFunction panicf);

TEA_API TeaAlloc tea_get_allocf(TeaState* T, void** ud);
TEA_API void tea_set_allocf(TeaState* T, TeaAlloc f, void* ud);

TEA_API int tea_get_top(TeaState* T);
TEA_API void tea_set_top(TeaState* T, int index);
TEA_API void tea_push_value(TeaState* T, int index);
TEA_API void tea_remove(TeaState* T, int index);
TEA_API void tea_insert(TeaState* T, int index);
TEA_API void tea_replace(TeaState* T, int index);
TEA_API void tea_copy(TeaState* T, int from_index, int to_index);

TEA_API const char* tea_typeof(TeaState* T, int index);

TEA_API int tea_get_mask(TeaState* T, int index);
TEA_API int tea_get_type(TeaState* T, int index);
TEA_API double tea_get_number(TeaState* T, int index);
TEA_API bool tea_get_bool(TeaState* T, int index);
TEA_API void tea_get_range(TeaState* T, int index, double* start, double* end, double* step);
TEA_API const char* tea_get_lstring(TeaState* T, int index, int* len);

TEA_API bool tea_is_object(TeaState* T, int index);
TEA_API bool tea_is_cfunction(TeaState* T, int index);

TEA_API bool tea_to_bool(TeaState* T, int index);
TEA_API double tea_to_numberx(TeaState* T, int index, bool* is_num);
TEA_API const char* tea_to_lstring(TeaState* T, int index, int* len);
TEA_API TeaCFunction tea_to_cfunction(TeaState* T, int index);

TEA_API bool tea_equal(TeaState* T, int index1, int index2);
TEA_API bool tea_rawequal(TeaState* T, int index1, int index2);

TEA_API void tea_concat(TeaState* T);

TEA_API void tea_pop(TeaState* T, int n);

TEA_API void tea_push_null(TeaState* T);
TEA_API void tea_push_true(TeaState* T);
TEA_API void tea_push_false(TeaState* T);
TEA_API void tea_push_bool(TeaState* T, bool b);
TEA_API void tea_push_number(TeaState* T, double n);
TEA_API const char* tea_push_lstring(TeaState* T, const char* s, int len);
TEA_API const char* tea_push_string(TeaState* T, const char* s);
TEA_API const char* tea_push_fstring(TeaState* T, const char* fmt, ...);
TEA_API const char* tea_push_vfstring(TeaState* T, const char* fmt, va_list args);
TEA_API void tea_push_range(TeaState* T, double start, double end, double step);
TEA_API void tea_push_cfunction(TeaState* T, TeaCFunction fn, int nargs);

TEA_API void tea_new_list(TeaState* T);
TEA_API void tea_new_map(TeaState* T);

TEA_API void tea_create_class(TeaState* T, const char* name, const TeaClass* klass);
TEA_API void tea_create_module(TeaState* T, const char* name, const TeaModule* module);

TEA_API int tea_len(TeaState* T, int index);

TEA_API void tea_add_item(TeaState* T, int list);
TEA_API bool tea_get_item(TeaState* T, int list, int index);
TEA_API void tea_set_item(TeaState* T, int list, int index);

TEA_API bool tea_get_field(TeaState* T, int obj);
TEA_API void tea_set_field(TeaState* T, int obj);

TEA_API bool tea_get_key(TeaState* T, int obj, const char* key);
TEA_API void tea_set_key(TeaState* T, int obj, const char* key);

TEA_API bool tea_get_global(TeaState* T, const char* name);
TEA_API void tea_set_global(TeaState* T, const char* name);
TEA_API void tea_set_funcs(TeaState* T, const TeaReg* reg);

TEA_API bool tea_has_module(TeaState* T, const char* module);

TEA_API bool tea_test_stack(TeaState* T, int size);
TEA_API void tea_check_stack(TeaState* T, int size, const char* msg);

TEA_API void tea_check_type(TeaState* T, int index, int type);
TEA_API void tea_check_any(TeaState* T, int index);
TEA_API double tea_check_number(TeaState* T, int index);
TEA_API bool tea_check_bool(TeaState* T, int index);
TEA_API void tea_check_range(TeaState* T, int index, double* start, double* end, double* step);
TEA_API const char* tea_check_lstring(TeaState* T, int index, int* len);
TEA_API TeaCFunction tea_check_cfunction(TeaState* T, int index);
TEA_API int tea_check_option(TeaState* T, int index, const char* def, const char* const options[]);

TEA_API void tea_opt_any(TeaState* T, int index);
TEA_API bool tea_opt_bool(TeaState* T, int index, bool def);
TEA_API double tea_opt_number(TeaState* T, int index, double def);
TEA_API const char* tea_opt_lstring(TeaState* T, int index, const char* def, int* len);

TEA_API int tea_gc(TeaState* T);

TEA_API void tea_call(TeaState* T, int n);
TEA_API int tea_pcall(TeaState* T, int n);

TEA_API int tea_loadx(TeaState* T, TeaReader reader, void* data, const char* name, const char* mode);
TEA_API int tea_dump(TeaState* T, TeaWriter writer, void* data);

TEA_API int tea_load_filex(TeaState* T, const char* filename, const char* mode);
TEA_API int tea_load_bufferx(TeaState* T, const char* buffer, size_t size, const char* name, const char* mode);

TEA_API int tea_load_string(TeaState* T, const char* s);

TEA_API void tea_error(TeaState* T, const char* fmt, ...);

#define tea_open()  tea_new_state(NULL, NULL)

#define tea_get_string(T, index) (tea_get_lstring(T, (index), NULL))
#define tea_to_number(T, index) (tea_to_numberx(T, (index), NULL))
#define tea_to_string(T, index) (tea_to_lstring(T, (index), NULL))

#define tea_push_literal(T, s)  (tea_push_lstring(T, "" s, (sizeof(s)/sizeof(char))-1))

#define tea_opt_string(T, index, def) (tea_opt_lstring(T, (index), (def), NULL))

#define tea_check_string(T, index) (tea_check_lstring(T, (index), NULL))
#define tea_check_list(T, index) (tea_check_type(T, index, TEA_TYPE_LIST))
#define tea_check_function(T, index) (tea_check_type(T, index, TEA_TYPE_FUNCTION))
#define tea_check_map(T, index) (tea_check_type(T, index, TEA_TYPE_MAP))
#define tea_check_file(T, index) (tea_check_type(T, index, TEA_TYPE_FILE))

#define tea_check_args(T, cond, msg, ...) if(cond) tea_error(T, (msg), __VA_ARGS__)

#define tea_load(T, reader, data, name) (tea_loadx(T, reader, data, name, NULL))
#define tea_load_file(T, filename) (tea_load_filex(T, filename, NULL))
#define tea_load_buffer(T, buffer, size, name) (tea_load_bufferx(T, buffer, size, name, NULL))

#define tea_register(T, n, f, args) (tea_push_cfunction(T, (f), (args)), tea_set_global(T, (n)))

#define tea_is_mask(T, n, m) (tea_get_mask(T, n) & (m))
#define tea_is_nonenull(T, n) (tea_get_type(T, (n)) <= TEA_TYPE_NONE)
#define tea_is_none(T, n) (tea_get_type(T, (n)) == TEA_TYPE_NONE)
#define tea_is_null(T, n) (tea_get_type(T, (n)) == TEA_TYPE_NULL)
#define tea_is_number(T, n) (tea_get_type(T, (n)) == TEA_TYPE_NUMBER)
#define tea_is_bool(T, n) (tea_get_type(T, (n)) == TEA_TYPE_BOOL)
#define tea_is_range(T, n) (tea_get_type(T, (n)) == TEA_TYPE_RANGE)
#define tea_is_string(T, n) (tea_get_type(T, (n)) == TEA_TYPE_STRING)
#define tea_is_list(T, n) (tea_get_type(T, (n)) == TEA_TYPE_LIST)
#define tea_is_map(T, n) (tea_get_type(T, (n)) == TEA_TYPE_MAP)
#define tea_is_function(T, n) (tea_get_type(T, (n)) == TEA_TYPE_FUNCTION)
#define tea_is_instance(T, n) (tea_get_type(T, (n)) == TEA_TYPE_INSTANCE)
#define tea_is_file(T, n) (tea_get_type(T, (n)) == TEA_TYPE_FILE)

#endif