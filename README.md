# Inventory Count API

This is an API for an Inventory Count System. It's designed to manage inventory counts by using various entities such as users, products, subproducts, count plans, and count executions. 

## System Overview

- **User**: A person performing actions, they can be either admins or counters.
- **Product**: A collection of Subproducts, they have a price, name, and category.
- **Subproduct**: They have multiple barcodes to identify them.
- **CountPlan**: Users can create multiple CountPlans, and CountPlans will create CountExecutions periodically based on their repetition schedule.
- **CountExecution**: They are started by CountPlan periodically, they hold UserProductCounts.
- **UserProductCounts**: An User can add many counted Subproducts to a CountExecution.

## Technologies Used

- Node.js with TypeScript
- MySQL
- Docker
- Fastify
- Node-cron for the scheduled job

## Installation

To install and run the application, follow these steps:

1. Install Docker and Docker-Compose on your machine.
2. Clone the repository:

    ```bash
    git clone https://github.com/yourusername/inventory-count-api.git
    cd inventory-count-api
    ```

3. Build the Docker image and run it(It will run all the migrations and seeds :

    ```bash
    docker-compose up --build web
    ```

## API Documentation

### Endpoints

- `POST /sign-in`: Sign in with either admin(admin, adminPass) or counter (counter1, counterPass).
- `POST /count-plan/weekly`: Create a CountPlan with a weekly schedule.
- `POST /count-plan/bi-weekly/monday`: Create a CountPlan with a 2nd Monday monthly schedule.
- `POST /product`: Add new products.
- `PUT /count-plan/:id/start`: Check the current CountPlan and start the CountExecution if necessary based on the schedule.
- `POST /countplan/product-count`: Add UserProductCounts to a CountExecution.
- `PUT /count-plan/:id/end`: End a CountExecution changing its status to end.
- `GET /countexecution/:id/productprice`: Extract from a CountExecution the pricing per Product based on the counted quantity.
- `GET /countexecution/:id/totalprice`: Extract from a CountExecution the total pricing of all Product based on the counted quantity.
- `GET /countexecution/:id/categoryprice`: Extract from a CountExecution the pricing of Product by category.

## Further Considerations

- The application is designed with scalability in mind, allowing for the database schema to be expanded upon in the future.
- Please note that all operations are for admin roles only, except for adding UserProductCounts to CountExecution, which is also allowed for counter roles.

## License

This project is licensed under the MIT License - see the LICENSE.md file for details.

## Author

[Nikolaos Tsiougkranas](https://github.com/Nikos-Tsiougranas)
