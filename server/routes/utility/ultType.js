const {validate,uType}  = require('../../models/Utility/UtilityType');

const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const utilityTypes = await uType.find();
        res.status(200).send(utilityTypes);
      } catch (error) {
        console.error("Error fetching utility types:", error.message);
        res.status(500).send({ error: error.message });
      }
});

router.post('/', async (req, res)=>{

    const { error } = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    let existPostTypes = await uType.findOne({ utilityName: req.body.utilityName });
    if (existPostTypes) return res.status(400).send('Post types already registered.');

    let postsType = new uType({
        utilityName : req.body.utilityName,
        utilityDescription : req.body.utilityDescription
    });

    postsType = await postsType.save();
    return res.send(postsType);
});

router.delete('/:id', async (req, res) => {
  try {
    const id = req.params.id; // Access the ID from the path parameter
    const utilityType = await uType.findByIdAndRemove(id); // Use the id to find and remove the document
    if (!utilityType) {
      return res.status(404).send('The utility type with the given ID was not found.');
    }

    res.send(utilityType); // Return the deleted document
  } catch (error) {
    console.error("Error deleting utility type:", error.message);
    res.status(500).send({ error: error.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const id = req.params.id; // Access the ID from the path parameter
    const utilityType = await uType.findByIdAndUpdate
    (id, { utilityName: req.body.utilityName, utilityDescription: req.body.utilityDescription }, { new: true }); // Find the document by id and update
    if (!utilityType) {
      return res.status(404).send('The utility type with the given ID was not found.');
    }
    res.send(utilityType); // Return the deleted document
  } catch (error) {
    console.error("Error updating utility type:", error.message);
    res.status(500).send({ error: error.message });
  }
});

module.exports = router;
