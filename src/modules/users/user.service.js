import User from "../../DB/models/user.model.js";
export const createUser = async (req,res,next) =>{
    try{
        const {id,name,email,password,role} = req.body;
        const users =  User.build({name,email,password,role});
        await users.save();
        res.status(201).json({message:"User created successfully",users});
            
        }
        catch(err){
            res.status(500).json({message:"Error creating user",error:err.message});
        }
}
export const updateUser = async (req,res,next) =>{
    try{ 
        const {id} = req.params;
        const {name,email,password,role} = req.body;
        const user = await User.findByPk(id);

        if(!user){
            res.status(404).json({message:"User not found"});
            return;
        }

        await user.update({name,email,password,role});
        res.status(200).json({message:"User updated successfully",user});
    }
    catch(err){
        res.status(500).json({message:"Error creating or updating user",error:err.message});
    }
}

export const getUserByEmail = async (req,res,next) =>{
    try{
        const email = req.params.email ?? req.query.email;
        if(!email){
            res.status(400).json({message:"Email is required"});
            return;
        }
        const users = await User.findOne({where:{email}});
        if(!users){
            res.status(404).json({message:"User not found"});
            return;
        }
        res.status(200).json({message:"User found",users});
    }
    catch(err){
        res.status(500).json({message:"Error finding user",error:err.message});
    }
}
export const getUserById = async (req,res,next) =>{
    try{
        const {id} = req.params;
        const users = await User.findByPk(id,{attributes:{exclude:["role"]}});
        if(!users){
            res.status(404).json({message:"User not found"});
            return;
        }
        res.status(200).json({message:"User found",users});
    }
    catch(err){
        res.status(500).json({message:"Error finding user",error:err.message});
    }
}

            
    