const { nanoid } = require('nanoid');
const notes=require('./notes');

const addNoteHandler =(request, h)=>{
  const { title, tags, body }=request.payload;

  const id=nanoid(16);
  const createdAt=new Date().toISOString();
  const updatedAt=createdAt;

  const newNote={
    title, tags, body, id, createdAt, updatedAt,
  };

  notes.push(newNote);

  const isSuccess=notes.filter((note)=>note.id===id).length > 0;

  if (isSuccess){
    const response=h.response({
      status:'Success',
      message:'Catatan Berhasil Ditambahkan',
      data:{
        noteId:id,
      },
    });
    response.code(201);
    return response;
  }

  const response=h.response({
    status:'fail',
    message:'Catatan Gagal Ditambahkan'
  });
  response.code(500);
  return response;

};

  const getAllNotesHandler=()=>({
    status:'success',
    data:{
      notes,
    },
  });

  const getNodeByIdHandler=(request,h)=>{
    const {id}=request.params;

    const note=notes.filter((n)=>n.id===id)[0];

    if(note !== undefined){
        return{
            status:'success',
            data:{
                note,
            },
        };
    }

    const response=h.response({
        status:'fail',
        message:'Data Tidak Ditemukan',
    });
    response.code(404);
    return response;
  };

  const editNodeByIdHandler=(request,h)=>{
    const{id}=request.params;

    const{title,tags,body}=request.payload;
    const updatedAt=new Date().toISOString();

    const index=notes.findIndex((note)=>note.id===id);

    if(index!==-1){
        notes[index]={
            ...notes[index],
            title,
            tags,
            body,
            updatedAt,
        };

    const response=h.response({
        status:'success',
        message:'Catatan Berhasil Diperbarui',
    });
    response.code(200);
    return response;    
    }

    const response=h.response({
        status:'fail',
        message:'Catatan gagal Diperbarui,id tidak ditemukan',
    });
    response.code(404);
    return response;
  };

  const deleteNodeByIdHandler=(request,h)=>{
    const {id}=request.params;

    const index=notes.findIndex((note)=>note.id===id);

    if(index !== -1){
        notes.splice(index,1);
        const response=h.response({
            status:'success',
            messsage:'Catatan Berhasil dihapus',
        });
            response.code(200);
            return response;
    }
    const response=h.response({
            status:'fail',
            messsage:'Catatan gagal dihapus,id tidak ditemukan',
        });
            response.code(404);
            return response;
  };

module.exports={ addNoteHandler, getAllNotesHandler,getNodeByIdHandler,editNodeByIdHandler,deleteNodeByIdHandler};