'use server'

import prisma from "../libs/prisma"

export const getAllDataListActivity = async () => {

    const result = await prisma.listActivity.findMany();
    const getNameActivity = await prisma.activity.findMany({
        select: {
            id: true,
            name: true
        }
    });

    const data = result.map((item) => {
        return {
            id: item.id,
            activity: getNameActivity.filter((res) => res.id == item.id_activity)[0]?.name,
            name: item.name,
            description: item.description
        }
    })

    return data;
}

export const updateDataListActivity = async (id_activityList: number ,id_activity: number, name_listActivity: string, description: string) => {
    
    const result = await prisma.listActivity.update({
        where: { id: id_activityList },
        data: { 
            id_activity: parseInt(id_activity.toString()),
            name: name_listActivity,
            description: description
        },
    });
    
    return result;
}

export const addDataListActivity = async (id_activity: number, activityList: string, description: string) => {

    const result = await prisma.listActivity.create({
        data: {
            id_activity: parseInt(id_activity.toString()),
            name: activityList,
            description: description
        }
    });

    return result;

}

export const deleteDataListActivity = async (id: number) => {
    
        const result = await prisma.listActivity.delete({
            where: { id: id }
        });
    
        return result;
}