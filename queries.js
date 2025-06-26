const { MongoClient } = require('mongodb');

// My URI (local)
const uri = "mongodb://localhost:27017"; 
const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    const db = client.db('plp_bookstore');
    const books = db.collection('books');

    //Find all books in a specific genre
    const genreBooks = await books.find({ genre: "Fantasy" }).toArray();
    console.log("Fantasy Books:", genreBooks);

    //Find books published after 2015
    const recentBooks = await books.find({ published_year: { $gt: 2015 } }).toArray();
    console.log("Books after 2015:", recentBooks);

    //Find books by a specific author
    const authorBooks = await books.find({ author: "James Clear" }).toArray();
    console.log("Books by James Clear:", authorBooks);

    //Update price of a specific book
    const updateResult = await books.updateOne(
      { title: "Atomic Habits" },
      { $set: { price: 12.99 } }
    );
    console.log("Price Updated:", updateResult.modifiedCount);

    //Delete a book by title
    const deleteResult = await books.deleteOne({ title: "Dune" });
    console.log("Deleted Books:", deleteResult.deletedCount);

  } catch (error) {
    console.error("Error:", error);
  } finally {
    await client.close();
  }
}
 //Find books that are in stock AND published after 2010
    const inStockRecentBooks = await books.find({
        in_stock: true,
        published_year: { $gt: 2010 }
    }).toArray();
    console.log("In Stock Recent Books:", inStockRecentBooks);
    
run();
