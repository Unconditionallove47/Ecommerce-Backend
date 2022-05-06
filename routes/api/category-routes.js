const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  try {
    const ecommerceData = await Category.findAll({
      include: [{model:Product}]
    });
    res.status(200).json(ecommerceData);
  } catch (err) {
    res.status(500).json(err);
  }
  // be sure to include its associated Products
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  const ecommerceData = await Category.findByPk(req.params.id,{
    include:[{model:Product}]
  })
  .then(ecommerceData=>{
    if (!ecommerceData) {
      res.status(404).json({message:"This ID is not associated with any categories"});
      return;
    } else {
      res.json(ecommerceData);
    }
  })
  .catch(err=>{
    console.log(err);
    res.status(500).json({msg: "an error occured", err});
  });
  // be sure to include its associated Products
});

router.post('/', async (req, res) => {
  // create a new category
  try{
    const ecommerceData = await Category.create(req.body);
    res.status(200).json(ecommerceData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  const ecommerceData = await Category.update(req.body,{
    where:{
      id:req.params.id
    }
  })
  .then(ecommerceData => {
    if (!ecommerceData) {
      res.status(404).json({message:"This ID is not associated with any categories"});
      return;
    } else {
      res.json(ecommerceData);
    }
  })
  .catch(err => {
      console.log(err);
      res.status(500).json({ msg: "an error occured", err });
  });
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try{
    const ecommerceData = await Category.destroy({
        where: {id: req.params.id}
    });
    if (!ecommerceData) {
      res.status(404).json({message:"This ID is not associated with any categories"});
      return;
    } else {
      res.status(200).json(ecommerceData);
    }
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
