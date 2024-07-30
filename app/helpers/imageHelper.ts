'use server';

import prisma from "../libs/prisma";
import cloudinary from "../libs/cloudinary";

export default async function imageHelper(id: number,url: string) {

  try {

    const upload = await cloudinary.uploader.upload(url,{
      folder: 'citramas_image_2024'
    })
    
    const response = await prisma.storageImage.create({
      data: {
        id_listActivity: parseInt(id.toString()),
        url: upload.secure_url,
      }
    });

    console.log('response:', response);

    return response;

  } catch (error:any) {
    console.error('Error:', error);
    return { error: true, message: error.message || 'Unknown error during image upload.' }; // Handle errors gracefully
  }
}

export const updateDataImage = async (id_gambar: number, id_activityList: number, url_image: string) => {
  
  try {

    const resUpload = await cloudinary.uploader.upload(url_image, {
      folder: 'citramas_image_2024'
    });

    const response = await prisma.storageImage.update({
      where: { id: id_gambar },
      data: {
        id_listActivity: parseInt(id_activityList.toString()),
        url: resUpload.secure_url,
      }
    });

    console.log('response:', response);
    
    return response;
  } catch (error:any) {
    console.error('Error:', error);
    return { error: true, message: error.message || 'Unknown error during image update.' }; // Handle errors gracefully
  }

}

export const getAllDataImage = async () => {
  try {
    const dataListActivity = await prisma.listActivity.findMany();
    const response = await prisma.storageImage.findMany({
      select: {
        id: true,
        id_listActivity: true,
        url: true,
      }
    });

    if (response.length === 0 || dataListActivity.length === 0) return [];

    return response.map((item) => {
      return {
        id: item.id,
        name_listActivity: dataListActivity.find((listActivity) => listActivity.id === item.id_listActivity)?.name || '',
        url: item.url,
      }
    })
  } catch (error:any) {
    console.error('Error:', error);
    return { error: true, message: error.message || 'Unknown error during image fetchings.' }; // Handle errors gracefully
  }
}

export const deleteDataImage = async (id: number) => {
  try {
    const response = await prisma.storageImage.delete({
      where: { id: id }
    });

    return response;
  } catch (error:any) {
    console.error('Error:', error);
    return { error: true, message: error.message || 'Unknown error during image delete.' }; // Handle errors gracefully
  }
}