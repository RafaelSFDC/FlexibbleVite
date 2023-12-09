import { account, appwriteConfig, avatars, databases, storage } from "./AppWriteConfig";
import { ID, Query } from "appwrite";
import state from './../../store/index';

//==================================
// FUNCTIONS
//==================================
export const checkUser = async () => {
    try {
        const response = await account.get()
        state.user = response
        state.logged = true
        const userCollection = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            [Query.equal("accountId", response.$id)]
        )
        state.userCollection = userCollection.documents[0].$id
        state.userInfo = userCollection.documents[0]
        return response
    } catch (error) {
        state.logged = false
        return false
    } finally {
        state.loading.start = false
    }
}
//==================================
// CREDENTIALS
//==================================
export async function appWriteCreateUser(user, setLoading) {
    console.log("user", user)
    state.loading.createAccount = true
    try {
        const newAccount = await account.create(
            ID.unique(),
            user.email,
            user.password,
            user.username,
        );

        if (!newAccount) throw Error;

        const avatarUrl = avatars.getInitials(user.name);

        const newUser = await appWriteSaveUserToDB({
            accountId: newAccount.$id,
            name: newAccount.name,
            email: newAccount.email,
            username: user.username,
            avatarURL: avatarUrl,
        });

        return newUser;
    } catch (error) {
        console.log("THE ERROR", error);
        throw error
    } finally {
        setLoading(false)
        state.loading.createAccount = false
    }
}

export const appWriteLogin = async (userAccount) => {
    try {
        const response = await account.createEmailSession(userAccount.email, userAccount.password)
        state.logged = true
        checkUser()
        return response;
    } catch (error) {
        throw new Error("Invalid credentials, please try again");
    }
}
export const appWriteLogout = async () => {
    const response = await account.deleteSession('current')
    state.logged = false
    return response
}
//==================================
// GET DOCUMENTS
//==================================
export const appWriteGetProjects = async () => {
    const response = await databases.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.projectsCollectionId,
    )
    console.log("the projects", response)
    state.projects = response.documents
    return response
}
//==================================
// CREATE DOCUMENTS
//==================================
export async function uploadFile(file) {
    const uploadedFile = await storage.createFile(
        appwriteConfig.storageId,
        ID.unique(),
        file
    );
    if (!uploadedFile) throw Error
    const fileUrl = storage.getFilePreview(
        appwriteConfig.storageId,
        uploadedFile.$id,
        2000,
        2000,
        "top",
        100
    );
    if (!fileUrl) throw Error
    return fileUrl;
}
export async function appWriteSaveUserToDB(user) {
    try {
        const newUser = await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            ID.unique(),
            {
                accountId: user.accountId,
                email: user.email,
                name: user.name,
                profileImage: user.imageUrl,
                username: user.username,
            }
        );
        return newUser;
    } catch (error) {
        console.log("THE ERROR", error);
        throw error
    }
}
export async function appWriteCreateProject(project, selectedImage) {
    try {
        const file = await uploadFile(selectedImage)
        console.log(file)
        const newProject = await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.projectsCollectionId,
            ID.unique(),
            {
                title: project.title,
                description: project.description,
                image: file,
                liveSiteUrl: project.liveSiteUrl,
                githubUrl: project.githubUrl,
                category: project.category,
                createdBy: [state.userCollection],
            }
        );
        return newProject;
    } catch (error) {
        console.log("THE ERROR", error);
        throw error
    }
}
//==================================
// EDIT DOCUMENTS
//==================================
export async function appWriteEditProject(project, file) {
    if (file && file.length > 0) {
        try {
            const file = await uploadFile(file)
            const newProject = await databases.updateDocument(
                appwriteConfig.databaseId,
                appwriteConfig.projectsCollectionId,
                project.$id,
                {
                    title: project.title,
                    description: project.description,
                    liveSiteUrl: project.liveSiteUrl,
                    githubUrl: project.githubUrl,
                    category: project.category,
                    image: file,
                }
            );
            return newProject;
        } catch (error) {
            console.log(error)
            throw "Error uploading image"
        }
    } else {
        try {
            const newProject = await databases.updateDocument(
                appwriteConfig.databaseId,
                appwriteConfig.projectsCollectionId,
                project.$id,
                {
                    title: project.title,
                    description: project.description,
                    liveSiteUrl: project.liveSiteUrl,
                    githubUrl: project.githubUrl,
                    category: project.category,
                }
            );
            return newProject;
        } catch (error) {
            console.log(error)
            throw "Error uploading image"
        }
    }
}

//==================================
// DELETE DOCUMENTS
//==================================
export async function appWriteDeleteProject(id) {
    state.deletingProject = true
    try {
        const response = await databases.deleteDocument(
            appwriteConfig.databaseId,
            appwriteConfig.projectsCollectionId,
            id
        );
        return response;
    } catch (error) {
        console.log("THE ERROR", error);
        throw error
    } finally {
        state.deletingProject = false
    }
}