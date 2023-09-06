#include <stdio.h>

#include <tea.h>

static TeaState* T = NULL;

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

	tea_interpret(T, "", script);
}