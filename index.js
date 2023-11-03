import express from "express";
import bodyParser from "body-parser";
import axios from "axios";
import path, { parse } from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";
// Its Working
const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const port = 3000;
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs"); // Set EJS as the view engine
app.set("views", path.join(__dirname, "views")); // Specify the views directory

// ?-----------------------------------------------------SHOW HOMEPAGE
app.get("/", (req, res) => {
  res.render("index.ejs", { posts: blogs });
});

// ?------------------------------------------------------SHOW POST
app.get("/post/:id", (req, res) => {
  const id = parseInt(req.params.id);
  console.log(id);
  const searchIndex = blogs.findIndex((post) => {
    return post.id === id;
  });
  console.log(blogs[searchIndex]);
  res.render("post.ejs", { post: blogs[searchIndex] });
});

// ?-----------------------------------------------------SHOW ADD POST PAGE
app.get("/add", (req, res) => {
  res.render("add.ejs");
});

//? ----------------------------------------------------ADD NEW POST
app.post("/add", async (req, res) => {
  const newPost = {
    id: blogs.length + 1,
    title: req.body.title,
    content: req.body.content,
    author: req.body.author,
    date: "",
  };

  blogs.push(newPost);
  res.render("post.ejs", { post: newPost });
});

// ?---------------------------------------------------------SHOW EDIT PAGE
app.get("/edit/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const searchIndex = blogs.findIndex((post) => {
    return post.id === id;
  });
  const post = blogs[searchIndex];
  res.render("edit.ejs", { post: post });
});

// ?-------------------------------------------------------- DO EDIT FUNCTION

app.post("/edit/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const searchIndex = blogs.findIndex((post) => {
    return post.id === id;
  });
  const existPost = blogs[searchIndex];
  const replacementPost = {
    id: id,
    title: req.body.title || existPost.title,
    content: req.body.content || existPost.content,
    date: "",
    author: req.body.author || existPost.author,
  };

  blogs[searchIndex] = replacementPost;
  console.log(replacementPost, "--------------------PATCH----REPLACEMENT POST");
  res.render("post.ejs", { post: replacementPost });
});

app.get("/delete/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const postIndex = blogs.findIndex((post) => {
    return post.id === id;
  });

  blogs.splice(postIndex, 1);
  res.send(`Post With Id: ${id} Deleted. Go To <a href="/">Homepage</a>`);
});
// ------------------------
app.listen(port, () => {
  console.log(`SERVER STARTED AT PORT ---- ${port}`);
});
const blogs = [
  {
    id: 1,
    title: "This is a Blog First",
    content: "This is the content of the first blog and you must read it",
    date: "",
    author: "Ankit Kaushik",
  },
  {
    id: 2,
    title: "Another Blog",
    content: "Some content for another blog.",
    date: "",
    author: "John Doe",
  },
  {
    id: 3,
    title: "A Third Blog",
    content: "Content for the third blog post.",
    date: "",
    author: "Jane Smith",
  },
  {
    id: 4,
    title: "Fourth Blog",
    content: "Content for the fourth blog post.",
    date: "",
    author: "Alice Johnson",
  },
  {
    id: 5,
    title: "Fifth Blog",
    content: "Content for the fifth blog post.",
    date: "",
    author: "Bob Brown",
  },
  {
    id: 6,
    title: "Sixth Blog",
    content: "Content for the sixth blog post.",
    date: "",
    author: "Eva Lee",
  },
  {
    id: 7,
    title: "Seventh Blog",
    content: "Content for the seventh blog post.",
    date: "",
    author: "Chris Davis",
  },
  {
    id: 8,
    title: "Eighth Blog",
    content: "Content for the eighth blog post.",
    date: "",
    author: "Sam Wilson",
  },
  {
    id: 9,
    title: "Ninth Blog",
    content: "Content for the ninth blog post.",
    date: "",
    author: "Olivia Martinez",
  },
  {
    id: 10,
    title: "Tenth Blog",
    content: "Content for the tenth blog post.",
    date: "",
    author: "David Miller",
  },
];
