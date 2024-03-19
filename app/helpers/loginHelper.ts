'use server'

import prisma from "../libs/prisma";
import { generateToken } from "./jwt";

interface UserAdminProps {
    email: string;
    password: string;
}

export const getUserAdmin = async (data:UserAdminProps) => {

    const result = await prisma.userAdmin.findFirst({
        select: {
            email: true,
        },
        where: {
            email: data.email,
        }
    })

    if (!result) {
        return {
            status: 404,
            message: "Account not found, please register first"
        };
    }

    const resultPassword = await prisma.userAdmin.findFirst({
        where: {
            email: data.email,
            password: data.password
        }
    })

    if (!resultPassword) {
        return {
            status: 400,
            message: "Password incorrect, please try again"
        };
    }

    const payload = {
        id: resultPassword.id,
        email: resultPassword.email,
        createdAt: resultPassword.created_at,
    }

    const token = generateToken(payload);

    return {
        status: 200,
        message: "Login success",
        token: token,
        payload: payload
    };

}