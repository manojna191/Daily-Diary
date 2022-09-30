//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/blogDB", {useNewUrlParser: true});
const PostSchema = {
  title: String,
  content: String
}
const Post = mongoose.model("Post", PostSchema);

const homeStartingContent = "Everyone would have gone through something in a day whether it may be good bad. To note down your key moments of life and laugh out loud by reading it after few years is a beautiful experiece. Note down about your day here and check it whenever you wanna relive it";
const aboutContent = "We are team of 2, Manojna - 20bbs0016 & Anshu Reddy - 20bbs0141. We are computrer science grads of VIT";
const contactContent = "You can share your experience and suggestions thorugh our mail ids. Manojna - vinjamuri.manojna2020@vitstudent.ac.in, Anshu - anshureddy.ashanna2020@vitstudent.ac.in";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", function(req,res){
  Post.find({}, (err, posts)=>{
    if(!err){
      res.render("home",{info: homeStartingContent, dairy:posts});
    };
  })
});

app.get("/about",function(req,res){
  res.render("about",{info:aboutContent});
});

app.get("/contact", function(req,res){
  res.render("contact",{info: contactContent});
});

app.get("/compose",function(req,res){
  res.render("compose");
})

app.post("/compose",function(req,res){
  const post = new Post({
    title: req.body.posttitle,
    content: req.body.postbody
  });
  post.save((err)=>{
    if(!err){
      res.redirect("/");
    }
  });
})

app.get("/posts/:postId",function(req,res){
  const requestedId = req.params.postId;

  Post.findOne({_id: requestedId}, (err,post)=>{
    if(!err){
      res.render("post",{title: post.title, content:post.content});
    }
  });
})




app.listen(3000, function() {
  console.log("Server started on port 3000");
});
