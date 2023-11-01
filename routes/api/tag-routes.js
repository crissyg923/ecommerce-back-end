const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// route to get all tags
router.get('/', async (req, res) => {
  try {
    const tagData = await Tag.findAll({
      include: [
        {
          model: Product, 
          through: ProductTag, 
          as: 'tag_product' 
        }
      ],
    } );
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// route to get a tag by ID
router.get('/:id', async (req, res) => {
  try{
    const selectTag = await Tag.findByPk(req.params.id, {
      include: [
        {
          model: Product, 
          through: ProductTag, 
          as: 'tag_product' 
        }
      ],
    });
    res.status(200).json(selectTag);
  } catch (err) {
    res.status(500).json(err);
  }
});

// route to create a new tag
router.post('/', async (req, res) => {
  try {
    const createTag = await Tag.create({
      tag_name: req.body.tag_name,
    });
    res.status(200).json(createTag);
  } catch (err) {
    res.status(400).json(err);
  }
});

// route to update tag name by ID
router.put('/:id', async (req, res) => {
  try {
    const tagId = req.params.id;
    const tag = await Tag.findByPk(tagId);
    if (!tag) {
      return res.status(400).json({ message: 'Tag not found'});
    }
    await tag.update({
      tag_name:req.body.tag_name,
    });
    res.status(200).json(tag);
  } catch(err) {
    res.status(500).json(err);
  }
});

// route to delete a tag by ID
router.delete('/:id', async (req, res) => {
  try {
    const deleteTag = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });
    if(!deleteTag) {
      res.status(404).json({message: 'No tag found with that ID!'});
      return;
    }
    res.status(200).json(deleteTag);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
