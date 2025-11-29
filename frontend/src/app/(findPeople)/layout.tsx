import { LeftMenu, PeopleFilterMenu} from '@/widgets'
import { Suspense } from 'react'

export default function FindPeopleLayout({
    children
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <div className='container mt-10 flex min-h-screen items-start gap-4'>
            <LeftMenu />
            <main className='flex flex-1 items-start gap-4'>{children}</main>
            <Suspense>
                <PeopleFilterMenu />
            </Suspense>

        </div>
    )
}
