const { format } = require('morgan');
const Blog = require('../models/Blog');
const Category = require('../models/Category');
const multer  = require('multer');
const path = require('path');
const UploadHelper = require('../helpers/upload');

class BlogController {
    /*
        Blog Page
    */
    index(req, res, next) {
        var categorySlug = req.params.slug ?? {$ne: null};
        var searchValue = req.query.search;

        var condition = {
            title: searchValue ? { $regex: '.*' + searchValue + '.*', $options: 'i' } : {$ne: null},
            category_slug: categorySlug
        };     

        Category.find({})
            .then(categories => {
                return categories;
            })
            .then(function(categories) {
                Blog.find(condition)
                    .then(blogs => {
                        // Remove blog.content
                        blogs = blogs.map(blog => {
                            blog = blog.toObject();
                            delete blog.content;
                            return blog;
                        });

                        // Render view
                        res.render('Blog/index', {
                            'title': 'Blog',
                            'css': 'blog',
                            blogs,
                            categories,
                            categorySlug,
                            searchValue
                        });
                    })
            })
            .catch(next);
    }

    /*
        Get detail post
    */
    detail(req, res, next) {
        var condition = {
            slug: req.params.slug
        }

        Blog.findOne(condition)
            .then(blog => {
                // Request fail
                if (!blog) {
                    res.status(404).render("Exception/404.ejs", {
                        layout: false
                    });
                }

                res.render('Blog/detail', {
                    'title': blog.title,
                    'css': 'detail',
                    blog
                }); 
            })
            .catch(next);
    }

    /*
        Create post
    */
    create(req, res, next) {
        Category.find({})
            .then(categories => {
                res.render('Blog/create', {
                    'title': 'Create blog',
                    'css': 'create',
                    categories
                }); 
            })    
            .catch(next)
    }

    /*
        Store blog
    */
    store(req, res, next) {
        let path = 'public/img/post/';
        let param = 'image';
        const upload = UploadHelper.upload(path, param);

        // Upload image
        upload(req, res, function(err) {
            if (req.fileValidationError) {
                return res.send(req.fileValidationError);
            }
            else if (!req.file) {
                return res.send('Please select an image to upload');
            }
            else if (err instanceof multer.MulterError) {
                return res.send(err);
            }
            else if (err) {
                return res.send(err);
            }
            
            var formData = req.body;
            formData.image = req.file.filename;

            // Not enter "Submit"
            if (formData.submit !== "Submit") {
                res.status(404).render("Exception/404.ejs", {
                    layout: false
                });
            }

            const blog = new Blog(formData);
            blog.save({})
                .then(() => {
                    res.redirect('/blog');
                })  
                .catch(next);
        })
        
    }
}

module.exports = new BlogController();