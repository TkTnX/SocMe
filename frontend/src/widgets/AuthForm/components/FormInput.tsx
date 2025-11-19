import { FieldPath, UseFormReturn } from 'react-hook-form';



import { FormControl, FormField, FormItem, FormLabel, FormMessage, StyledInput } from '@/shared/components';





interface Props<T extends Record<string, any>>
	extends Omit<React.ComponentProps<'input'>, 'form'> {
	form: UseFormReturn<T>
	label?: string
	name: FieldPath<T>
	isShowErrorMessage?: boolean
}

export const FormInput = <T extends Record<string, any>>({
	form,
	label,
	name,
	isShowErrorMessage = true,
	...props
}: Props<T>) => {
	return (
		<FormField
			control={form.control}
			name={name}
			render={({ field }) => (
				<FormItem className={props.className}>
					{label && <FormLabel>{label}</FormLabel>}
					<FormControl>
						<StyledInput
							placeholder={props.placeholder}
							{...field}
							{...props}
						/>
					</FormControl>
					{isShowErrorMessage && <FormMessage />}
				</FormItem>
			)}
		/>
	)
}