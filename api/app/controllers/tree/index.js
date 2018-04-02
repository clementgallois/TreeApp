const Tree = require('../../models/tree.js');

const tree = (app) => {
  app.post('/tree', async(req, res) => {
    if (!req.body.longitude || !req.body.latitude){
      return res.status(400).json({success: false, message:'Error: Invalid coordinates'});
    }
    try{
      const tree = await Tree.findOne({
        location:{
          $near: {
            $geometry:{
              type:'Point',
              coordinates:[req.body.longitude, req.body.latitude]
            }
          }
        }
      });
      if (!tree){
        return res.status(400).json({success: false, message:'Error: couldn\'t find any tree'});
      }
      // put the data back to the way it was when received
      let cleanTree = tree.toObject();
      cleanTree.latitude = cleanTree.location.coordinates[1];
      cleanTree.longitude = cleanTree.location.coordinates[0];
      delete cleanTree.location;

      return res.status(200).json({
        success: true,
        tree: cleanTree
      });
    }
    catch(err){
      return res.status(500).json({success: false, message:'Error: Internal server error'});
    }
  });


};

module.exports = tree;
