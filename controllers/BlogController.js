const Blog = require('../models/Blog');
const Category = require('../models/Category');

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
                        res.render('blog/index', {
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
                if (!blog || !blog.id) {
                    res.status(404).render("exception/404.ejs", {
                        layout: false
                    });
                }

                res.render('blog/detail', {
                    'title': 'Detail',
                    'css': 'detail',
                    blog
                }); 
            })
            .catch(next);
        
    }
}

module.exports = new BlogController();