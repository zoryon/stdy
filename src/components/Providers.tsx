import { UserContextProvider } from "@/contexts/user.context"

const Providers = ({ children }: { children: React.ReactNode }) => {
    return (
        <UserContextProvider>
            {children}
        </UserContextProvider>
    )
}

export default Providers