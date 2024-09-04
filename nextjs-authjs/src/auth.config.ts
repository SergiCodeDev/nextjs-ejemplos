// https://authjs.dev/guides/edge-compatibility
import type { NextAuthConfig } from "next-auth"
import credentials from "next-auth/providers/credentials"
import { loginSchema } from "./lib/zod"
import { prisma } from "./prisma"
// Your own logic for dealing with plaintext password strings; be careful!
// import { saltAndHashPassword } from "@/utils/password"
import bcrypt from "bcryptjs"
import {nanoid} from "nanoid"
 
// Notice this is only an object, not a full Auth.js instance
export default {
  providers: [
    credentials({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // credentials: {
      //   email: {},
      //   password: {},
      // },
     /*  authorize: async (credentials) => {
        let user = null
 
        // logic to salt and hash password
        const pwHash = saltAndHashPassword(credentials.password)
 
        // logic to verify if the user exists
        user = await getUserFromDb(credentials.email, pwHash)
 
        if (!user) {
          // No user found, so this is their first attempt to login
          // meaning this is also the place you could do registration
          throw new Error("User not found.")
        }
 
        // return user object with their profile data
        return user
        
      }, */
      authorize: async (credentials) => {
        const {data, success} = loginSchema.safeParse(credentials)

        if (!success) {
          throw new Error("Invalid credentials")
        }

        const user = await prisma.user.findUnique({
          where: {
            email: data.email,
          }
        })

        if (!user || !user.password) {
          throw new Error("Invalid credentials")
        }

        const isValid = await bcrypt.compare(data.password, user.password)

        if (!isValid) {
          throw new Error("Invalid credentials")
        }

        // verificación email
        if(!user.emailVerified) {
          const verifyTokenExist = await prisma.verificationToken.findFirst({
            where: {
              identifier: user.email
            }
          })

          // si existe un token, lo eliminamos
          if (verifyTokenExist?.identifier) {
            await prisma.verificationToken.delete({
              where: {
                identifier: user.email
              }
            })
          }

          const token = nanoid()

          await prisma.verificationToken.create({
            data: {
              identifier: user.email,
              token,
              expires: new Date(Date.now() + 1000 * 60 * 60 * 24)
            }
          })
        }

        return user
      }
    }),
  ],
} satisfies NextAuthConfig