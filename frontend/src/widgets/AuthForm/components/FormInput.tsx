import { FieldPath, UseFormReturn } from 'react-hook-form'

import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
	StyledInput
} from '@/shared/components'

interface Props<T extends Record<string, any>> {
	form: UseFormReturn<T>
	label: string
	name: FieldPath<T>
	placeholder: string
}

export const FormInput = <T extends Record<string, any>>({
	form,
	label,
	name,
	placeholder
}: Props<T>) => {
	return (
		<FormField
			control={form.control}
			name={name}
			render={({ field }) => (
				<FormItem>
					<FormLabel>{label}</FormLabel>
					<FormControl>
						<StyledInput placeholder={placeholder} {...field} />
					</FormControl>
					<FormMessage />
				</FormItem>
			)}
		/>
	)
}
