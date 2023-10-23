import prisma from "../../utils/prisma";

type Product = {
    name: string;
    price: number;
    description: string;
    imageUrl: string;
    quantites: { name: string, total: number; size: string; color: string; }[];
    rating: number;
    category: { name: string; }[];
    tags: string[];
};
export async function createProduct({ name, rating, description, quantites, imageUrl, category, tags }: Product) {
    try {
        const data = await prisma.product.create({
            data: {
                name,
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
                tags
            },
            include: {
                category: true,
                rating: true,
                quantity: true,
            },
        });

        return { data };
    } catch (err: any) {
        return { ProductCreationError: err };
    }
}