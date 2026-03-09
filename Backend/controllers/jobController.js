const Job = require('../models/Job')
const mongoose = require("mongoose")
const cloudinary = require('../config/cloudinary')


const createJob = async (req,res,next)=>{               

    try{

        const { title, company, status, location, notes } = req.body

        const job = await Job.create({
            title,
            company,
            status,
            location,
            notes,
            user: req.user.id 
        })

        res.status(201).json({
            success:true,
            job   
        })
    }catch(err){
        next(err)
    }
}

const getMyJob = async (req,res,next)=>{
    try {

        const { status, keyword } = req.query
        const page = Number(req.query.page) || 1
        const limit = Number(req.query.limit) || 5
        const skip = (page - 1) * limit
        

        const queryObject = {
            user:  req.user.id
        }

        if(status && status !== 'All'){
            queryObject.status = status
        }

        if(keyword){
            queryObject.$or = [
                { title: {$regex: keyword,$options:"i"}},
                {company:{$regex:keyword,$options:"i"}}
            ]
        }

        const totalJobs = await Job.countDocuments(queryObject) 

        const jobs = await Job.find(queryObject ).skip(skip).limit(limit)

        const allJobs = await Job.find()

        res.status(200).json({
            success: true,
            jobs,
            totalPages: Math.ceil(totalJobs/limit),
            currentPage: page
        })

        // console.log("Logged in user:", req.user.id)
        // console.log("Query Object:", queryObject)
        // console.log("Found Jobs:", jobs)
        // console.log("All Jobs:", allJobs)

    } catch (err) {
        next(err)
    }
}

const updateJob = async (req, res, next) => {
    try {
        const job = await Job.findOne({
            _id: req.params.id,
            user: req.user.id   // 🔥 security check
        })

        if (!job) {
            return res.status(404).json({
                message: "Job not found"
            })
        }

        Object.assign(job, req.body)
        await job.save()

        res.status(200).json({
            success: true,
            job
        })

    } catch (err) {
        next(err)
    }
}

const deleteJob = async (req, res, next) => {
    try {
        const job = await Job.findOneAndDelete({
            _id: req.params.id,
            user: req.user.id
        })

        if (!job) {
            return res.status(404).json({
                message: "Job not found"
            })
        }

        res.status(200).json({
            success: true,
            message: "Job deleted"
        })

    } catch (err) {
        next(err)
    }
}


const uploadResumeController = async (req,res,next)=>{

    try{

        const fs = require('fs')

        const job = await Job.findOne({
            _id: req.params.id,
            user: req.user.id
        })

        if(!job){
            return res.status(404).json({message:"Job not found"})
        }

        if(!req.file){
            return res.status(400).json({message:"No file uploaded"})
        }

        // delete old file if exist

        if(job.resume){
            fs.unlink(job.resume , (err)=>{

                if(err) console.log("old file delete error:",err);
                
            })
        }

        // delete old cloud file if exist

        if(job.resumePublicId){
            await cloudinary.uploader.destroy(job.resumePublicId,{

                resource_type:"raw"

            })
        }

        // save new file 

        job.resume = req.file.path
        job.resumePublicId = req.file.filename; 
        await job.save()

        console.log("req.file:", req.file)

        res.status(200).json({
            success: true,
            message: " Resume uploaded ",
            job
        })

        // res.status(200).json({ message: "Reached controller" })
    }catch(err){
        next(err)
    }

}
module.exports = {createJob,getMyJob,updateJob,deleteJob,uploadResumeController}