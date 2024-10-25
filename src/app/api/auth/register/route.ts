import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function POST(req: Request) {
    const supabase = createClient()

    try {
        const { email, password, username } = await req.json()

        // validate inputs
        if (!email || !password || !username) {
            return NextResponse.json(
                { error: 'Incomplete data' },
                { status: 400 }
            )
        }

        // attempt to sign up the user
        const { error } = await supabase.auth.signUp({
            email: email,
            password: password,
            options: {
                data: {
                    username: username,
                }
            }
        });
        
        // sign up error handling
        if (error) {
            return NextResponse.json(
                { error: error.message },
                { status: 400 }
            )
        }

        return NextResponse.json(
            { message: 'Successfully created the user. Now waiting for verification' },
            { status: 200 }
        )
    } catch {
        return NextResponse.json(
            { error: 'An unexpected error occurred on our end, please try again later' },
            { status: 500 }
        )
    }
}