import { connectMongodb } from "@/lib/mongodb";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import User from "@/models/user";

export async function POST(req) {
    console.log("POST register");

    try {
        const { name, email, password } = await req.json();
        await connectMongodb();

        const hashedPass = await bcrypt.hash(password, 10)
        console.log("creating user")
        try {
            await User.create({ name, email, password: hashedPass })
        }
        catch (error) {
            console.log("error:" + error)
        }
        console.log("creating user returned")
        return NextResponse.json({ message: "User registered" }, { status: 200 })
    }
    catch (error) {
        return NextResponse.json(
            { message: "error occured while registering user : " + error },
            { status: 500 }
        )
    }
}