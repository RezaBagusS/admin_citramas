'use server'

import prisma from "../libs/prisma"

interface dataNews {
    id?: number;
    title: string;
    description: string;
    date: Date;
    note: string | null;
    path: string;
}

export const getAllNewsData = async () => {
    
    const res = await prisma.news.findMany({
        select: {
            id: true,
            title: true,
            description: true,
            date: true,
            note: true,
            path: true
        },
        orderBy: {
            date: 'desc'
        }
    })

    return res;
}

export const deleteNewsData = async (id: number) => {
    const result = await prisma.news.delete({
        where: { id: id }
    });

    return result;
}

export const addNewsData = async (dataNews: dataNews) => {

    const { title, description, date, note, path } = dataNews;

    const setFormatDate = new Date(date)

    const res = await prisma.news.create({
        data: {
            title: title,
            description: description,
            date: setFormatDate,
            note: note,
            path: path
        }
    })

    console.log("RES TAMBAH NEWS DATA : ", res);

    return res;

}

export const updateNewsData = async (dataNews: dataNews) => {

    console.log("DATA NEWS : ", dataNews);

    const { id, title, description, date, note, path } = dataNews;
    
    const res = await prisma.news.update({
        where: {
            id: id
        },
        data: {
            title: title,
            description: description,
            date: new Date(date),
            note: note,
            path: path,
            createdAt: new Date()
        }
    })

    return res;
}