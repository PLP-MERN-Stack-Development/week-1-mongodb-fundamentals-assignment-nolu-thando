//Arrange the price of books by genre

use('plp_bookstore');

db.books.aggregate([
	{ $group: {
         _id: "$genre",
          averagePrice: { $avg: "$price" } 
        } 
    },
{
  $project: {
    _id: 0,
    genre: "$_id",
    averagePrice: { $round: ["$averagePrice", 2] }
  }
},
{ $sort: { averagePrice: -1 } } // Optional: highest to lowest
]);

//Finding the author with the most books in the database
db.books.aggregate([
    { $group: {
        _id: "$author",
        bookcount: { $sum: 1 }
    }
    },
    { $sort: { bookcount: -1 } }, // Sort by book count in descending order
    { $limit: 1 } // Limit to the top author
]);

//Grouping books by publication year and counting them
db.books.aggregate([
    { $group: {
        _id: "$published_year",
        bookCount: { $sum: 1 }
    }
    },
    { $sort: { _id: 1 } } // Sort by publication year in ascending order
]);

//Indexing on the title field
use('plp_bookstore');
db.books.createIndex({ title: 1})

//Compound indexing on author and published_year
db.books.createIndex({ author: 1, published_year: 1 });

//Using "explain" to demonstrate the use of indexes
db.books.find({ title: "Atomic Habits" }).explain("executionStats");