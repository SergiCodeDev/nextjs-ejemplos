import FormLogin from "@/components/auth/form-login";

export default function Login({
    searchParams,
}: {
    searchParams: {verifield: string,  error: string}
}) {
    const isVerifield = searchParams.verifield === "true"
    const OAuthAccountNotLinked = searchParams.error === "OAuthAccountNotLinked"
    return (
        <main className="grid place-content-center min-h-screen">
            <FormLogin 
            isVerifield={isVerifield} 
            OAuthAccountNotLinked={OAuthAccountNotLinked}
            />
        </main>
    )
}