const mongoose = require("mongoose");
require("dotenv").config();

const employeeSchema = new mongoose.Schema({
    employeeId: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    department: {
        type: String,
        required: true
    },
    designation: {
        type: String,
        required: true
    },
    salary: {
        type: Number,
        required: true
    },
    experience: {
        type: Number,
        required: true
    },
    skills: {
        type: [String]
    },
    status: {
        type: String,
        required: true
    }
});

const Employee = mongoose.model("Employee", employeeSchema);

async function main() {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Connected to MongoDB");

        // Insert 4 employee records
        await Employee.deleteMany({});

        await Employee.insertMany([
            {
                employeeId: "E101",
                name: "Arun",
                department: "IT",
                designation: "Developer",
                salary: 50000,
                experience: 2,
                skills: ["Java", "MongoDB"],
                status: "Active"
            },
            {
                employeeId: "E102",
                name: "Bharathi",
                department: "IT",
                designation: "Tester",
                salary: 45000,
                experience: 3,
                skills: ["Testing", "Selenium"],
                status: "Active"
            },
            {
                employeeId: "E103",
                name: "Kavin",
                department: "HR",
                designation: "HR Executive",
                salary: 40000,
                experience: 4,
                skills: ["Recruitment", "Communication"],
                status: "Active"
            },
            {
                employeeId: "E104",
                name: "Priya",
                department: "Finance",
                designation: "Accountant",
                salary: 55000,
                experience: 5,
                skills: ["Excel", "Accounting"],
                status: "Active"
            }
        ]);

        console.log("4 employees inserted");

        // Retrieve employees from IT with experience > 2
        const departmentEmployees = await Employee.find({
            department: "IT",
            experience: { $gt: 2 }
        });

        console.log("\nIT employees with experience > 2:");
        console.log(departmentEmployees);

        // Find one employee using employeeId
        const employee = await Employee.findOne({
            employeeId: "E101"
        });

        console.log("\nEmployee with ID E101:");
        console.log(employee);

        // Display only name, designation, salary and department
        const selectedEmployee = await Employee.findOne(
            { employeeId: "E101" },
            {
                _id: 0,
                name: 1,
                designation: 1,
                salary: 1,
                department: 1
            }
        );

        console.log("\nSelected employee details:");
        console.log(selectedEmployee);

        // Update designation and salary
        await Employee.updateOne(
            { employeeId: "E101" },
            {
                $set: {
                    designation: "Senior Developer",
                    salary: 60000
                }
            }
        );

        console.log("\nEmployee E101 updated");

        // Increase salary of all IT employees by 10%
        await Employee.updateMany(
            { department: "IT" },
            {
                $mul: {
                    salary: 1.10
                }
            }
        );

        console.log("IT employees salary increased by 10%");

        // Find employees with salary between 45000 and 65000
        const salaryEmployees = await Employee.find({
            salary: {
                $gte: 45000,
                $lte: 65000
            }
        });

        console.log("\nEmployees with salary between 45000 and 65000:");
        console.log(salaryEmployees);

        // Delete one employee using employeeId
        await Employee.deleteOne({
            employeeId: "E103"
        });

        console.log("\nEmployee E103 deleted");

        // Display remaining employees sorted by salary descending
        const remainingEmployees = await Employee.find()
            .sort({ salary: -1 });

        console.log("\nRemaining employees sorted by salary:");
        console.log(remainingEmployees);

    } catch (error) {
        console.log("Error:", error);
    } finally {
        await mongoose.connection.close();
        console.log("\nMongoDB connection closed");
    }
}

main();