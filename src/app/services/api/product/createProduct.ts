import prisma from "../../utils/prisma";

type Product = {
    name: string;
    price: number;
    description: string;
    imageUrl: string;
    sizes: string[];

};
export async function createProduct({ name, price, sizes, description, imageUrl }: Product) {
    try {
        let data = await prisma.product.create({
            data: {
                name,
                price,
                description,
                imageUrl,
                sizes,
            }
        });
        return { data };
    } catch (err: any) {
        return { ProductCreationError: err.mesaage };
    }
}