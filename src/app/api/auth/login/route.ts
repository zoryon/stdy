import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function POST(req: Request) {
    const supabase = createClient()

    try {
        const { email, password } = await req.json()

        // validate inputs
        if (!email || !password) {
            return NextResponse.json(
                { error: 'Incomplete data' },
                { status: 400 }
            )
        }

        // attempt to sign in the user
        const { error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password,
        })

        // sign in error handling
        if (error) {
            return NextResponse.json( 
                { error: error.message },
                { status: 400 }
            )
        }

        return NextResponse.json(
            { message: 'Successfully logged in the user' },
            { status: 200 }
        )
    } catch (error) {
        return NextResponse.json(
            { error: 'An unexpected error occurred on our end, please try again later' },
            { status: 500 }
        )
    }
}