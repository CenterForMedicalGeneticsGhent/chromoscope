import React, { useState } from "react";

import 'react-tabulator/css/tabulator.min.css';
import { ReactTabulator } from 'react-tabulator';

export default function TabularTableDev() {

    //define the table data and columns
    // A function to generate a random name
    const randomName = () => {
        // An array of possible first names
        const firstNames = ["John", "Mary", "Bob", "Alice", "David", "Emma", "James", "Anna", "Tom", "Lisa"];
        // An array of possible last names
        const lastNames = ["Smith", "Jones", "Brown", "Johnson", "Miller", "Davis", "Wilson", "Taylor", "Clark", "Lee"];
        // Pick a random first name from the array
        const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
        // Pick a random last name from the array
        const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
        // Return the full name
        return firstName + " " + lastName;
    };

    // A function to generate a random age between 18 and 65
    const randomAge = () => {
        return Math.floor(Math.random() * 48) + 18;
    };

    // A function to generate a random gender
    const randomGender = () => {
        // An array of possible genders
        const genders = ["male", "female"];
        // Pick a random gender from the array
        return genders[Math.floor(Math.random() * genders.length)];
    };

    // A function to generate a random occupation
    const randomOccupation = () => {
        // An array of possible occupations
        const occupations = ["teacher", "doctor", "lawyer", "engineer", "nurse", "accountant", "chef", "artist", "writer", "student"];
        // Pick a random occupation from the array
        return occupations[Math.floor(Math.random() * occupations.length)];
    };

    // A function to generate a random salary between 20000 and 100000
    const randomSalary = () => {
        return Math.floor(Math.random() * 80001) + 20000;
    };

    // A function to generate a random email address based on the name
    const randomEmail = (name) => {
        // Split the name by space
        const nameParts = name.split(" ");
        // Use the first letter of the first name and the full last name as the username
        const username = nameParts[0][0] + nameParts[1];
        // An array of possible domains
        const domains = ["gmail.com", "yahoo.com", "outlook.com", "hotmail.com", "aol.com"];
        // Pick a random domain from the array
        const domain = domains[Math.floor(Math.random() * domains.length)];
        // Return the email address
        return username + "@" + domain;
    };

    // A function to generate a random phone number
    const randomPhone = () => {
        // An array of possible area codes
        const areaCodes = ["202", "212", "213", "305", "312", "323", "347", "415", "510", "646"];
        // Pick a random area code from the array
        const areaCode = areaCodes[Math.floor(Math.random() * areaCodes.length)];
        // Generate a random 7-digit number
        const number = Math.floor(Math.random() * 10000000).toString().padStart(7, "0");
        // Format the phone number
        return "(" + areaCode + ") " + number.slice(0, 3) + "-" + number.slice(3);
    };

    // An array to store the data
    const data = [];

    // A loop to generate 1024 rows of data
    for (let i = 0; i < 1024; i++) {
        // Generate a random name
        const name = randomName();
        // Generate a random age
        const age = randomAge();
        // Generate a random gender
        const gender = randomGender();
        // Generate a random occupation
        const occupation = randomOccupation();
        // Generate a random salary
        const salary = randomSalary();
        // Generate a random email
        const email = randomEmail(name);
        // Generate a random phone
        const phone = randomPhone();
        // Create an object with the data
        const row = { name, age, gender, occupation, salary, email, phone };
        // Push the object to the data array
        data.push(row);
    }

    // An array to store the columns
    const columns = [
        { title: "Name", field: "name" },
        { title: "Age", field: "age" },
        { title: "Gender", field: "gender" },
        { title: "Occupation", field: "occupation" },
        { title: "Salary", field: "salary" },
        { title: "Email", field: "email" },
        { title: "Phone", field: "phone" },
    ];

    // add params
    const height = "700px"
    const pagination = true
    const paginationSize = 25
    const paginationSizeSelector = [5, 10, 25, 50, 100]
  
    return (
        <div>
        <ReactTabulator 
            data={data} 
            columns={columns} 
            height={height} //to enable scrolling
            options={{
                pagination:pagination,
                paginationSize:paginationSize,
                paginationSizeSelector:paginationSizeSelector,
            }}
        />
        </div>
    );
}

