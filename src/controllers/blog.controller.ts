import { Request, Response, NextFunction } from 'express';
import multer from 'multer';
import { FilterQuery } from 'mongoose';
import Blog, { IBlogDocument } from '../models/blog.model';
import Category from '../models/category.model';
import UploadHelper from '../helpers/upload.helper';

class BlogController {
  index(req: Request, res: Response, next: NextFunction): void {
    const categorySlug = req.params.slug;
    const searchValue = req.query.search as string | undefined;

    const condition: FilterQuery<IBlogDocument> = {};
    if (searchValue) {
      condition.title = { $regex: '.*' + searchValue + '.*', $options: 'i' };
    }
    if (categorySlug) {
      condition.category_slug = categorySlug;
    }

    Category.find({})
      .then((categories) =>
        Blog.find(condition)
          .select('-content')
          .then((blogs) => {
            res.render('Blog/index', {
              title: 'Blog',
              css: 'blog',
              blogs,
              categories,
              categorySlug,
              searchValue,
            });
          }),
      )
      .catch(next);
  }

  detail(req: Request, res: Response, next: NextFunction): void {
    Blog.findOne({ slug: req.params.slug })
      .then((blog) => {
        if (!blog) {
          return res.status(404).render('exception/404.ejs', { layout: false });
        }
        res.render('Blog/detail', { title: blog.title, css: 'detail', blog });
      })
      .catch(next);
  }

  create(_req: Request, res: Response, next: NextFunction): void {
    Category.find({})
      .then((categories) => {
        res.render('Blog/create', { title: 'Create blog', css: 'create', categories });
      })
      .catch(next);
  }

  store(req: Request, res: Response, next: NextFunction): void {
    const upload = UploadHelper.upload('public/img/post/', 'image');

    upload(req, res, (err: unknown) => {
      if (req.fileValidationError) return res.send(req.fileValidationError);
      if (!req.file) return res.send('Please select an image to upload');
      if (err instanceof multer.MulterError) return res.send(err.message);
      if (err) return next(err);

      const formData = req.body as Record<string, unknown>;
      formData.image = req.file.filename;

      if (formData.submit !== 'Submit') {
        return res.status(404).render('exception/404.ejs', { layout: false });
      }

      const blog = new Blog(formData);
      blog
        .save()
        .then(() => res.redirect('/blog'))
        .catch(next);
    });
  }
}

export default new BlogController();
