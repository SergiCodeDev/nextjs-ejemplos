import { auth } from "@/auth"
import LogoutButton from "@/components/auth/logout-button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default async function Protected() {
  const session = await auth()

  if (!session) {
    return <div>Not authenticated</div>
  }

  // Función para obtener las iniciales
  const getInitials = (name: string | null | undefined) => {
    if (!name) {
      return "X"
    }
    const nameParts = name.split(" ")
    const firstInitial = nameParts[0]?.charAt(0) || ""
    const secondInitial = nameParts[1]?.charAt(0) || ""

    // Si hay un segundo nombre, lo usa, si no, solo usa la primera inicial
    return `${firstInitial}${secondInitial}`.toUpperCase()
  }

  return (
    <div className="container m-auto flex flex-col items-center">

      <section className="flex justify-center items-center gap-4 py-4 px-8">
        <Avatar className="h-14 w-14">
          <AvatarImage src={session.user.image ? session.user.image : ""} />
          <AvatarFallback>{getInitials(session.user.name)}</AvatarFallback>
        </Avatar>
        <h2 className="font-semibold text-xl">{session.user.name}</h2>
      </section>

      <section>
        <pre>
          {
            JSON.stringify(session, null, 2)
          }
        </pre>
        <LogoutButton />
      </section>

    </div>
  )
}