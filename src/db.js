const { MongoClient } = require("mongodb");

const uri =
    "mongodb://user_453vzz4yr:p453vzz4yr@db01.dbhost.dev:5050/db_453vzz4yr";

const client = new MongoClient(uri);

async function main() {
    try {
        await client.connect();
        console.log("Connected to MongoDB");

        const db = client.db("db_453vzz4yr");
        const products = db.collection("products");

        // 1. Insert 5 products

        const productData = [
            {
                productId: "P001",
                productName: "Laptop",
                category: "Electronics",
                price: 55000,
                quantity: 10,
                supplier: "Dell"
            },
            {
                productId: "P002",
                productName: "Mouse",
                category: "Electronics",
                price: 800,
                quantity: 25,
                supplier: "Logitech"
            },
            {
                productId: "P003",
                productName: "Keyboard",
                category: "Electronics",
                price: 1500,
                quantity: 15,
                supplier: "HP"
            },
            {
                productId: "P004",
                productName: "Notebook",
                category: "Stationery",
                price: 100,
                quantity: 50,
                supplier: "Classmate"
            },
            {
                productId: "P005",
                productName: "Pen",
                category: "Stationery",
                price: 20,
                quantity: 100,
                supplier: "Cello"
            }
        ];

        const result = await products.insertMany(productData);

        console.log("1. Products inserted successfully");
        console.log("Inserted count:", result.insertedCount);


        // 2. Display products belonging to a specific category

        const categoryProducts = await products
            .find({ category: "Electronics" })
            .toArray();

        console.log("\n2. Electronics Products:");
        console.log(categoryProducts);


        // 3. Find one product using findOne()

        const oneProduct = await products.findOne({
            productId: "P001"
        });

        console.log("\n3. One Product:");
        console.log(oneProduct);


        // 4. Display only product name, price and quantity

        const productDetails = await products
            .find(
                {},
                {
                    projection: {
                        _id: 0,
                        productName: 1,
                        price: 1,
                        quantity: 1
                    }
                }
            )
            .toArray();

        console.log("\n4. Product Name, Price and Quantity:");
        console.log(productDetails);


        // 5. Update price and quantity using updateOne()

        const updateResult = await products.updateOne(
            { productId: "P001" },
            {
                $set: {
                    price: 60000,
                    quantity: 8
                }
            }
        );

        console.log("\n5. Price and quantity updated");
        console.log("Modified count:", updateResult.modifiedCount);


        // 6. Update a product using productId

        const updateProduct = await products.updateOne(
            { productId: "P002" },
            {
                $set: {
                    supplier: "Logitech India"
                }
            }
        );

        console.log("\n6. Product updated using productId");
        console.log("Modified count:", updateProduct.modifiedCount);


        // 7. Delete one product using productId

        const deleteResult = await products.deleteOne({
            productId: "P005"
        });

        console.log("\n7. Product deleted");
        console.log("Deleted count:", deleteResult.deletedCount);


        // 8. Display final product records

        const finalProducts = await products
            .find({})
            .toArray();

        console.log("\n8. Final Product Records:");
        console.log(finalProducts);

    } catch (error) {
        console.log("Error:", error);

    } finally {
        await client.close();
    }
}

main();