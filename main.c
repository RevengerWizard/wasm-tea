#include <stdio.h>
#include <string.h>

#include <tea.h>

static tea_State* T = NULL;

void new_state()
{
	if(T != NULL)
		return;

	T = tea_open();
}

void free_state()
{
	if(T == NULL)
		return;

	tea_close(T);
	T = NULL;
}

void run_tea(const char* script)
{
	if(T == NULL)
		return;

	if(tea_load_bufferx(T, script, strlen(script), "?<wasm>", "t") == TEA_OK)
	{
		tea_pcall(T, 0);
	}
}