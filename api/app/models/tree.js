var mongoose = require('mongoose');

var treeSchema = mongoose.Schema({
  tree_id : {type: String},
  block_id : {type: String},
  created_at :{type: String},
  tree_dbh: {type: String},
  stump_diam:{type: String},
  curb_loc: {type: String},
  status: {type: String},
  health: {type: String},
  spc_latin: {type: String},
  spc_common: {type: String},
  steward: {type: String},
  guards: {type: String},
  sidewalk: {type: String},
  user_type: {type: String},
  problems: {type: String},
  root_stone: {type: String},
  root_grate: {type: String},
  root_other: {type: String},
  trunk_wire: {type: String},
  trnk_light: {type: String},
  trnk_other: {type: String},
  brch_light:{type: String},
  brch_shoe: {type: String},
  brch_other:{type: String},
  address: {type: String},
  postcode: {type: String},
  zip_city: {type: String},
  'community board': {type: String},
  borocode: {type: String},
  borough: {type: String},
  cncldist: {type: String},
  st_assem: {type: String},
  st_senate: {type: String},
  nta: {type: String},
  nta_name:{type: String},
  boro_ct: {type: String},
  state: {type: String},

  location: { type: {type:String}, coordinates: [Number]},

  x_sp: {type: String},
  y_sp: {type: String},
  'council district': {type: String},
  'census tract': {type: String},
  bin: {type: String},
  bbl: {type: String},
});

treeSchema.index({location: '2dsphere'});

module.exports = mongoose.model('Tree', treeSchema);
