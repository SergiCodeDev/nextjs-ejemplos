import { prisma } from '@/prisma'
import { redirect } from 'next/navigation'
import { type NextRequest } from 'next/server'
 
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const token = searchParams.get('token')
  // query is "hello" for /api/search?query=hello

  if (!token){
    return new Response("Token not found", {status: 400})
  }

  // Encuentra el token de verificación
  const verifyToken = await prisma.verificationToken.findFirst({
    where: {
        token
    }
  })

  if (!verifyToken){
    return new Response("Token not found", {status: 400})
  }

  // Verifica si el token ha expirado
  if (verifyToken.expires < new Date()) {
    return new Response("Token expire", {status: 400})
  }

  // Encuentra al usuario usando el identificador del token
  const user = await prisma.user.findUnique({
    where: {
        email: verifyToken.identifier
    }
  })

  if (user?.emailVerified) {
    return new Response("Email already verifield", {status: 400})
  }

  // Actualiza la verificación del email del usuario
  await prisma.user.update({
    where: {
        email: verifyToken.identifier
    },
    data: {
        emailVerified: new Date()
    }
  })

  // Elimina el token de verificación usando ambos campos de la clave primaria compuesta
  await prisma.verificationToken.delete({
    where: {
      identifier_token: {
        identifier: verifyToken.identifier,
        token: verifyToken.token
      }
    }
  })

  //return new Response("Email verified successfully", { status: 200 })
  redirect("/login?verified=true")
}