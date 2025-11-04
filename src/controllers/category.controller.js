import Category from "../models/category.model.js";

export const createCategory=async (req,res)=>{
    try {
        const {title}=req.body
        const category=new Category({title})
        await category.save()
        res.json(category)
    } catch (error) {
        res.status(500).json({message:error.message})
    }
    }

export const getAllCategories=async(req,res)=>{
    try {
        const categories=await Category.find()
        res.status(200).json(categories)
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

export const getCategoryById=async(req,res)=>{
    try {
        const id =req.params.id
        const category=await Category.findById(id)
        res.json(category)
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

export const updateCategory=async(req,res)=>{
    try {
        const {title}=req.body
        const id=req.params.id
        const category=await Category.findByIdAndUpdate(id,{title},{new:true})
        if (!category) {
            return res.status(404).json({message:'Category not found'})
        }
        await category.save()
        res.json({category})
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

export const deleteCategory=async(req,res)=>{
    try {
        const id=req.params.id
        const category=await Category.findByIdAndDelete(id)
        res.json(category)
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}