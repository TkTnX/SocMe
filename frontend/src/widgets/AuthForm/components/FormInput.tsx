import { FieldPath, UseFormReturn } from 'react-hook-form';



import { FormControl, FormField, FormItem, FormLabel, FormMessage, StyledInput } from '@/shared/components';





interface Props<T extends Record<string, any>>
	extends Omit<React.ComponentProps<'input'>, 'form'> {
	form: UseFormReturn<T>
	label: string
	name: FieldPath<T>
}

export const FormInput = <T extends Record<string, any>>({
	form,
	label,
	name,
	...props
}: Props<T>) => {
	return (
		<FormField
			control={form.control}
			name={name}
			render={({ field }) => (
				<FormItem>
					<FormLabel>{label}</FormLabel>
					<FormControl>
						<StyledInput placeholder={props.placeholder} {...field} {...props} />
					</FormControl>
					<FormMessage />
				</FormItem>
			)}
		/>
	)
}