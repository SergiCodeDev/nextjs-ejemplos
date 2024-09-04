import NextAuth from "next-auth"
import authConfig from "./auth.config"
import { NextResponse } from "next/server"

// export const { auth: middleware } = NextAuth(authConfig)
const { auth: middleware } = NextAuth(authConfig)

const publicRoutes = [
    "/",
    "/login",
    "/register",
    "/api/auth/verify-email"
]

export default middleware((req) => {
    const {nextUrl, auth} = req
    // El operador doble !! convierte cualquier valor a su equivalente booleano (true o false).
    const isLoggedIn = !!auth?.user

    // proteger rutas privadas
    if (!publicRoutes.includes(nextUrl.pathname) && !isLoggedIn) {
        return NextResponse.redirect(new URL("/login", nextUrl))
    }

    return NextResponse.next()
})

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};