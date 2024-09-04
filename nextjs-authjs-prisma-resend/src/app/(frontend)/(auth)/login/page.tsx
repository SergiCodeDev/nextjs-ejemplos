import FormLogin from "@/components/auth/form-login";

export default function Login({
    searchParams,
}: {
    searchParams: {verifield: string}
}) {
    const isVerifield = searchParams.verifield === "true"
    return (
        <main className="grid place-content-center min-h-screen">
            <FormLogin isVerifield={isVerifield} />
        </main>
    )
}