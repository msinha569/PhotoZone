'use server'
import { revalidatePath } from "next/cache"
import User from "../database/models/user.model"
import { connectToDatabase } from "../database/mongoose"
import { handleError } from "../utils"


export async function createUser(user: CreateUserParams) {
    try {
        await connectToDatabase()
        const newUser = await User.create(user)
        console.log("User created");
        
        return JSON.parse(JSON.stringify(newUser))
    } catch (error) {
        handleError(error)
    }
}

export async function getUserById(UserId: string){
    try {
        await connectToDatabase()
        const user = await User.findOne({clerkId: UserId})
        if (!user) throw new Error('User not found')
        return JSON.parse(JSON.stringify(user))
    } catch (error) {
        handleError(error)
    }
}

export async function updateUser(clerkId: string, user: UpdateUserParams){
    try {
        const res = await connectToDatabase()
        
        const updatedUser = await User.findOneAndUpdate({clerkId}, user, {new: true})
        if (!updatedUser) throw new Error('User not found')
        return JSON.parse(JSON.stringify(updatedUser))
    } catch (error) {
        handleError(error)
    }
}

export async function deleteUser(clerkId: string){
    try {
        await connectToDatabase()
        const userToDelete = await User.findOne({clerkId})
        if (!userToDelete) throw new Error('User not found')
        
        const deletedUser = await User.findOneAndDelete({_id:userToDelete._id})
        revalidatePath('/')

        return deletedUser ? JSON.parse(JSON.stringify(deletedUser)) : null
    } catch (error) {
        handleError(error)
    }
}

export async function updateCredits(userId: string, creditFee: number){
    try {
        await connectToDatabase()

        const updatedUserCredits = await User.findOneAndUpdate({_id: userId}, {$inc: {creditBalance: creditFee}}, {new: true})
        if (!updatedUserCredits) throw new Error('User not found')
        return JSON.parse(JSON.stringify(updatedUserCredits))
    } catch (error) {
        handleError(error)
    }
}