import { readdir } from 'node:fs/promises';

export default async function (ostarbaiter){
    const result=[]
    const path=`uploads/${ostarbaiter.fio.replace(/\s+/g, '') + ostarbaiter.date}`
    try {
        const directories = await readdir(path);
        directories.map(async directory => {
            const files = await readdir(`${path}/${directory}`)
            const pathDirectoryFiles = []
            files.map(file => pathDirectoryFiles.push(`${path}/${directory}/${file}`))
            result.push({[directory]: pathDirectoryFiles})
        }
    )
        /*
        for (const directory of directories) {
            const files=await readdir(`${path}/${directory}`)
            const pathDirectoryFiles=[]
            for (const file of files) {
                  pathDirectoryFiles.push(`${path}/${directory}/${file}`)
            }
            result.push({[directory]: pathDirectoryFiles })
        }*/
    }catch (e) {
        return null
    }
    return result
}


export  async function cdnUrlImg(ostarbaiter){
    const path=`uploads/${ostarbaiter.fio.replace(/\s+/g, '') + ostarbaiter.date}/image`
    try {
        const file=await readdir(path)
        if(file) return `${path}/${file}`
        return null
    }catch (e) {
        return null
    }
}