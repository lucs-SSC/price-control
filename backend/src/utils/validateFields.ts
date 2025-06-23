import { validate as isUUID } from 'uuid';
import { prisma } from '../../prisma/client';

interface Fields {
    [key: string]: string | undefined;
}

export const validateFields = async (ids: Fields) => {
    const invalidFormat: string[] = [];
    const notFound: string[] = [];

    for (const [key, value] of Object.entries(ids)){
        if(value && !isUUID(value)){
            invalidFormat.push(key);
        }
    }

    if(invalidFormat.length > 0){
        return { invalidFormat, notFound};
    }

    const checks = await Promise.all([
        ids.userId ? prisma.user.findUnique({ where: { id: ids.userId } }) : Promise.resolve(null),
        ids.productId ? prisma.product.findUnique({ where: { id: ids.productId } }) : Promise.resolve(null),
        ids.storeId ? prisma.store.findUnique({ where: { id: ids.storeId } }) : Promise.resolve(null),
    ]);


    if (ids.userId && !checks[0]) notFound.push('userId');
    if (ids.productId && !checks[1]) notFound.push('productId');
    if (ids.storeId && !checks[2]) notFound.push('storeId');

    return { invalidFormat, notFound };
}