import { NextRequest, NextResponse } from "next/server";
import { User } from "../../../../../models/User";
import { connection } from "../../../../../lib/db";


export async function POST(request: NextRequest) {

    try {
        const {email, password, name} = await request.json();

        if(!email || !password || !name) {
            return NextResponse.json(
                {error: "Please provide all the fields"},
                {status: 400}
            )
        }

        await connection();

        const existingUser = await User.findOne({email})

        if(existingUser) {
            return NextResponse.json(
                {error: "User already exists"},
                {status: 400}
            )
        }

        const user = User.create({
            email,
            password,
            name
        });

        if(!user) {
            return NextResponse.json(
                {error: "Failed to create user"},
                {status: 500}
            )
        }

        return NextResponse.json(
            {message: "User created successfully"},
            {status: 201}
        )
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            {error: "Internal server error"},
            {status: 500}
        )
    }
};