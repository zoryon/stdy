'use client'

import UserInfo from "./UserInfo";

const Sidebar = () => (
    <div className="w-[256px] h-screen bg-background flex flex-col border-r px-2 py-5">
        <UserInfo />
    </div>
);

export default Sidebar;
