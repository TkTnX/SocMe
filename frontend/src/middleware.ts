import { jwtDecode } from 'jwt-decode'
import { MiddlewareConfig, NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
	const token = request.cookies.get('refreshToken')
	const { pathname } = request.nextUrl
	let payload: null | { userId: string } = null

	if (token) {
		payload = jwtDecode(token.value)
	}

	if (pathname.startsWith('/auth') && token) {
		return NextResponse.redirect(
			new URL(payload ? `/profile/${payload.userId}` : '/', request.url)
		)
	}

	if (pathname === '/profile' && token) {
		return NextResponse.redirect(
			new URL(`/profile/${payload?.userId}`, request.url)
		)
	}

	const isAuthPage = pathname.startsWith('/auth')

	if (!token && !isAuthPage) {
		return NextResponse.redirect(new URL('/auth/sign-in', request.url))
	}

	return NextResponse.next()
}
export const config: MiddlewareConfig = {
	matcher: ['/((?!_next/static|_next/image|favicon.ico|images|uploads).*)']
}
