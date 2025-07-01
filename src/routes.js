const { addNoteHandler, getAllNotesHandler, getNodeByIdHandler, editNodeByIdHandler, deleteNodeByIdHandler } = require('./handler');

const routes=[
  {
    method:'POST',
    path:'/notes',
    handler: addNoteHandler,
  },
  {
    method:'GET',
    path:'/notes',
    handler: getAllNotesHandler,
  },
   {
    method:'GET',
    path:'/notes/{id}',
    handler: getNodeByIdHandler,
  },
  {
    method:'PUT',
    path:'/notes/{id}',
    handler: editNodeByIdHandler,
  },
  {
    method:'DELETE',
    path:'/notes/{id}',
    handler: deleteNodeByIdHandler,
  },

];

module.exports=routes;