'use client'

import { useUserContext } from "@/contexts/user.context";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "../ui/dropdown-menu";
import { CreditCard, LogOut, Settings, User, LucideIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import axios from "axios";

const UserInfo = () => {
    const { user } = useUserContext();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <div>
                    <UserProfile
                        avatarUrl={user?.avatar_url}
                        username={user?.username}
                        email={user?.email}
                    />
                </div>
            </DropdownMenuTrigger>
            <UserDropdown />
        </DropdownMenu>
    );
};

// display user's avatar, username and email
const UserProfile = ({ avatarUrl, username, email }: { avatarUrl: string | null, username: string, email: string }) => (
    <div className="w-full h-12 flex items-center gap-3 cursor-pointer hover:bg-secondary px-3 py-7 rounded-sm">
        <Avatar>
            <AvatarImage src={avatarUrl || "https://github.com/shadcn.png"} alt={username} />
            <AvatarFallback>
                <img src="https://github.com/shadcn.png" alt="fallback" />
            </AvatarFallback>
        </Avatar>
        <div className="flex flex-col justify-between">
            <div className="text-base">{username}</div>
            <div className="text-xs text-neutral-400">{email}</div>
        </div>
    </div>
);

// dropdown menu
const UserDropdown = () => {
    const router = useRouter()

    return (
        <DropdownMenuContent className="w-[230px]">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownIconItem icon={User} label="Profile" />
            <DropdownIconItem icon={CreditCard} label="Billing" />
            <DropdownIconItem icon={Settings} label="Settings" />
            <DropdownMenuSeparator />
            <DropdownIconItem icon={LogOut} label="Logout" fn={async () => {
                const { data } = await axios.post('/api/auth/logout')
                if (data) router.replace("/login")
            }} />
        </DropdownMenuContent>
    )
};

// consistent styling
const DropdownIconItem = ({ icon: Icon, label, fn }: { icon: LucideIcon; label: string, fn?: () => void }) => (
    <DropdownMenuItem onClick={fn}>
        <Icon className="size-4 mr-2" />
        {label}
    </DropdownMenuItem>
);

export default UserInfo