import prisma from "../../utils/prisma";

type Product = {
    name: string;
    price: number;
    description: string;
    imageUrl: string;
    quantites: { name: string, total: number; size: string; color: string; }[];
    rating: number;
    category: { name: string; }[];
};
export async function createProduct({ name, price, rating, description, quantites, imageUrl, category }: Product) {
    try {
        const data = await prisma.product.create({
            data: {
                name,
                price,
                description,
                imageUrl,
                quantity: {
                    createMany: {
                        data: quantites
                    }
                },
                rating: {
                    create: {
                        rating
                    }
                },
                category: {
                    createMany: {
                        data: category
                    }
                },
            },
            include: {
                category: true,
                rating: true,
                quantity: true,
            }
        }).catch((err) => {
            console.log(err);
        });

        return { data };
    } catch (err: any) {
        return { ProductCreationError: err };
    }
}