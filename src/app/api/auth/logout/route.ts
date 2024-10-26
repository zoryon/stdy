import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function POST() {
    const supabase = createClient()
    const { error } =  await supabase.auth.signOut()

    if (error) {
        return NextResponse.json(
            { error: 'An unexpected error occurred on our end, please try again later' },
            { status: 500 }
        )
    } 

    return NextResponse.json(
        { message: 'Successfully logged out the user' },
        { status: 200 }
    )
}