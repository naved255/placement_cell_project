import db from "../init/index.js";


export const getOfficerProfile = async (req, res) => {
  try {
    const { userId } = req.user;
    const [officers] = await db.execute('select o.* , u.* from officer o join users u on o.user_id=u.user_id where o.user_id=?', [userId]);
    return res.status(200).json({
      officer: officers[0]
    })
  } catch (err) {
    console.log(err);
  }
}

export const updateProfile = async(req,res)=>{
  try{
    const {userId} = req.user;
    let { name , email , phone ,designation ,department , office_room_no } = req.body;
    
    await db.execute('update users set name=?, email=? where user_id=?',[name,email,userId]);
    await db.execute('update officer set phone=? , designation=? ,department=? , office_room_no=? where user_id=?',[phone, designation , department , office_room_no,userId] )
    return res.status(200).json({
      message : "user"
    })
  }catch(err){
    console.log(err);
  }
}
