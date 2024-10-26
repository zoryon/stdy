import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"

const Sidebar = () => {
    return (
        <div className="w-[256px] h-screen border-r px-4 py-6">
            <UserInfo />
        </div>
    )
}

const UserInfo = () => {
    return (
        <div className="w-full h-12 flex items-center gap-2">
            <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="flex flex-col justify-between">
                {/* username */}
                <div className="text-base">zoryon</div>
                {/* user email */}
                <div className="text-sm text-neutral-400">gioelespata@gmail.com</div>
            </div>
        </div>
    )
}

export default Sidebar