let articles =[
    {
        id: "create-blog-site",
        title: "How to create a Simple Blog Site?",
        content: [
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt cum sapiente, quaerat vero odio perferendis. Corrupti fuga nemo, similique qui facere voluptas. Et eius quibusdam, rem deleniti velit adipisci quam accusantium quas aperiam, voluptas hic officia esse modi. Nihil, libero dignissimos asperiores illo in ullam!',
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt cum sapiente, quaerat vero odio perferendis. Corrupti fuga nemo, similique qui facere voluptas. Et eius quibusdam, rem deleniti velit adipisci quam accusantium quas aperiam, voluptas hic officia esse modi. Nihil, libero dignissimos asperiores illo in ullam!',
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt cum sapiente, quaerat vero odio perferendis. Corrupti fuga nemo, similique qui facere voluptas. Et eius quibusdam, rem deleniti velit adipisci quam accusantium quas aperiam, voluptas hic officia esse modi. Nihil, libero dignissimos asperiores illo in ullam!'
        ],
        upvotes: 0,
        comments: [{
            author: 'Sandeep Wadhawan',
            text: 'Nice Article!',
            createdAt: new Date().toLocaleDateString()
        }]
    },

    {
        id: "intro-to-express",
        title: "Introduction to Express.js",
        content: [
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt cum sapiente, quaerat vero odio perferendis. Corrupti fuga nemo, similique qui facere voluptas. Et eius quibusdam, rem deleniti velit adipisci quam accusantium quas aperiam, voluptas hic officia esse modi. Nihil, libero dignissimos asperiores illo in ullam!',
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt cum sapiente, quaerat vero odio perferendis. Corrupti fuga nemo, similique qui facere voluptas. Et eius quibusdam, rem deleniti velit adipisci quam accusantium quas aperiam, voluptas hic officia esse modi. Nihil, libero dignissimos asperiores illo in ullam!',
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt cum sapiente, quaerat vero odio perferendis. Corrupti fuga nemo, similique qui facere voluptas. Et eius quibusdam, rem deleniti velit adipisci quam accusantium quas aperiam, voluptas hic officia esse modi. Nihil, libero dignissimos asperiores illo in ullam!'
        ],
        upvotes: 0,
        comments: []
    },
    
    {
        id: "handlebars",
        title: "Working with handlebars",
        content: [
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt cum sapiente, quaerat vero odio perferendis. Corrupti fuga nemo, similique qui facere voluptas. Et eius quibusdam, rem deleniti velit adipisci quam accusantium quas aperiam, voluptas hic officia esse modi. Nihil, libero dignissimos asperiores illo in ullam!',
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt cum sapiente, quaerat vero odio perferendis. Corrupti fuga nemo, similique qui facere voluptas. Et eius quibusdam, rem deleniti velit adipisci quam accusantium quas aperiam, voluptas hic officia esse modi. Nihil, libero dignissimos asperiores illo in ullam!',
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt cum sapiente, quaerat vero odio perferendis. Corrupti fuga nemo, similique qui facere voluptas. Et eius quibusdam, rem deleniti velit adipisci quam accusantium quas aperiam, voluptas hic officia esse modi. Nihil, libero dignissimos asperiores illo in ullam!'
        ],
        upvotes: 0,
        comments: []
    }
];

module.exports = articles;