import Image from 'next/image'

interface Props {
	isPremium: boolean
}

export const PremiumIcon = ({ isPremium }: Props) => {
	if (!isPremium) return
	return (
		<Image
			src={'/images/icons/premium-icon.svg'}
			width={16}
			height={13}
			alt='Премиум пользователь'
		/>
	)
}
