import prisma from "../../utils/prisma";

type Product = {
    name: string;
    price: number;
    description: string;
    imageUrl: string;
    sizes: { name: string; }[];
    quantites: { name: string, total: number; }[];
    rating: number;
    category: { name: string; }[];
};
export async function createProduct({ name, price, sizes, rating, description, quantites, imageUrl, category }: Product) {
    console.log(name, price, sizes, description, imageUrl);
    try {
        prisma.product.create({
            data: {
                name,
                price,
                description,
                imageUrl,
                size: {
                    createMany: {
                        data: sizes
                    }
                },
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
                }
            },
            include: {
                size: true,
                quantity: true,
                rating: true
            }
        }).catch((err) => console.log(err));

        return { data: "" };
    } catch (err: any) {
        return { ProductCreationError: err.mesaage };
    }
}