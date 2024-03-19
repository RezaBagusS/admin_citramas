'use server'

import prisma from "../libs/prisma"

export const getAllDataActivity = async () => {

    const result = await prisma.activity.findMany();

    return result;
}

export const updateDataActivity = async (id_activity: number, activity: string) => {
    
    const result = await prisma.activity.update({
        where: { id: id_activity },
        data: { name: activity },
    });
    
    return result;
}