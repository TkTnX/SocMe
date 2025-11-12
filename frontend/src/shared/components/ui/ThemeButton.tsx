'use client'

import {
	Button,
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger
} from '.'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import * as React from 'react'

export function ThemeButton() {
	const { setTheme, theme } = useTheme()

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant='outline'>
					<Sun className='block h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:hidden dark:scale-0 dark:-rotate-90' />
					<Moon className='hidden h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:block dark:scale-100 dark:rotate-0' />
					{theme && <span>Тема</span>}
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align='end'>
				<DropdownMenuItem onClick={() => setTheme('light')}>
					Светлая
				</DropdownMenuItem>
				<DropdownMenuItem onClick={() => setTheme('dark')}>
					Тёмная
				</DropdownMenuItem>
				<DropdownMenuItem onClick={() => setTheme('system')}>
					Системная
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
