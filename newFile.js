// This code snippet is for querying a MongoDB database to find books that are in stock and published after 2010,
// while also sorting the results by price in descending order and implementing pagination.
// Connect to MongoDB
db.books.find({
  in_stock: true,
  published_year: { $gt: 2010 }
},
{
  title: 1,
  author: 1,
  published_year: 1,
  price
})
.sort ({price: 1}) // Sort by price in ascending order
.skip ((page - 1)*5)// Skip documents for pagination
.limit(5) // Limit to 5 documents per page

//Decending order
db.books.find({
  in_stock: true,
  published_year: { $gt: 2010 }
},
  {
    title: 1,
    author: 1,
    published_year: 1,
    price
  })
  .sort({ price: -1 }) // Sort by price in descending order
  .skip((page - 1) * 5) // Skip documents for pagination
  .limit(5); // Limit to 5 documents per page
