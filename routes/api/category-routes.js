const router = require('express').Router();
const { Category, Product } = require('../../models');

// Route to get all categories
router.get('/', async (req, res) => {
  try{
    const categoryData = await Category.findAll({
      include: [{model: Product}],
    });
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// route to get 1 category by its ID
router.get('/:id', async (req, res) => {
 
  try {
    const selectCategory = await Category.findByPk(req.params.id, {
      include: [{model: Product}],
    });
    res.status(200).json(selectCategory);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Route to create a category.
router.post('/', async (req, res) => {
  try {
    const createCategory = await Category.create({
      category_name: req.body.category_name,
    });
    res.status(200).json(createCategory);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Route to update a category
router.put('/:id', async (req, res) => {
  try {
    const categoryId = req.params.id;
    const category = await Category.findByPk(categoryId);
    if (!category) {
      return res.status(404).json({ message: 'Category not found'});
    }
    await category.update({
      category_name:req.body.category_name,
    });
    res.status(200).json(category);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Route to delete a category
router.delete('/:id', async (req, res) => {
  try {
    const deleteCategory = await Category.destroy({
      where:  {
        id: req.params.id,
      },
    });
    if (!deleteCategory) {
      res.status(404).json({ message: 'No category found with that id.' });
      return;
    }
    res.status(200).json(deleteCategory);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
