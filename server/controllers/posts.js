import Post from '../models/Post.js';
import User from '../models/User.js';
import path, { dirname } from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { title } from 'process';

//Create post
export const createPost = async (req, res) => {
  try {
    const { title, text } = req.body;

    const user = await User.findById(req.userId);
    if (req.files) {
      let filename = Date.now().toString() + req.files.image.name;
      const __dirname = dirname(fileURLToPath(import.meta.url));

      req.files.image.mv(path.join(__dirname, '..', 'uploads', filename));

      const newPostWithImg = new Post({
        username: user.username,
        title,
        text,
        imgUrl: filename,
        author: req.userId,
      });

      await newPostWithImg.save();
      await User.findByIdAndUpdate(req.userId, {
        $push: { posts: newPostWithImg },
      });
      return res.json(newPostWithImg);
    }
    const newPost = new Post({
      username: user.username,
      title,
      imgUrl: '',
      autor: req.userId,
    });
    await newPost.save();
    await User.findByIdAndUpdate(req.userId, {
      $push: { posts: newPost },
    });
    return res.json(newPost);
  } catch (error) {
    res.log({ message: 'Что-то пошло не так' });
  }
};

//Get All
export const getAll = async (req, res) => {
  try {
    const posts = await Post.find().sort('-createdAt');
    const popularPosts = await Post.find().limit(3).sort('-views');
    if (!posts) {
      return res.json({ message: 'Постов нет' });
    }
    res.json({ posts, popularPosts });
  } catch (error) {
    res.json('Что-то пошло не так');
  }
};
//Get post and Update views
export const getById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
        if (!post) {
          return res.json({ message: 'Поста нет' });
        }
        post.views +=1 
        await post.save();   
    return res.json(post);
  } catch (error) {    
    res.status(404).json({ message: 'Пост не найден' });
  }
};
//Get all Posts User
export const getMyPost = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    const list = await Promise.all(
      user.posts.map((post) => {
        return Post.findById(post._id);
      }),
    );
    res.json(list.sort((a, b) => b.createdAt - a.createdAt));
  } catch (error) {
    res.json('Что-то пошло не так');
  }
};
//Remove Post
export const removePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    if (!post) return res.json({ message: 'Такой пост не найден' });
    

    await User.findByIdAndUpdate(req.userId, {
      $pull: { posts: req.params.id },
    });
    const __dirname = dirname(fileURLToPath(import.meta.url));
    fs.rm(path.join(__dirname, '..', 'uploads', post.imgUrl), (e) => {
      e && console.log(e);
    });
    res.json({ message: 'Пост удален.' });
  } catch (error) {
    res.json({ message: 'Что-то пошло не так' });
  }
};
// Update Post
export const updatePost = async (req, res) => {
  try {
    const { title, text, id } = req.body;
    const post = await Post.findById(id);
    if (req.files) {
      const __dirname = dirname(fileURLToPath(import.meta.url));
      fs.rm(path.join(__dirname, '..', 'uploads', post.imgUrl), (e) => {
        e && console.log(e);
      });
      let filename = Date.now().toString() + req.files.image.name;

      post.imgUrl = filename || '';
      req.files.image.mv(path.join(__dirname, '..', 'uploads', filename));
    }

    post.title = title;
    post.text = text;
    await post.save();

    res.json(post);
  } catch (error) {
    res.json({ message: 'Что-то пошло не так' });
  }
};
