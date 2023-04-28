import * as fs from "fs";

export function createAllFiles(){
    // const filesArr = ["produto-images"]
    // filesArr.forEach(file => 
    createFileIfItNotExists(process.env.FILES_PATH)
    // )
}

async function createFileIfItNotExists(filePath: string){
    const pathsArr = filePath.replace(/\/\//g, "/").split("/")
    let dir = "";

    pathsArr.forEach(element => {
        if(element.length){
            dir += `/${element}`
        }
    });

    const exists = fs.existsSync(dir)
    if(!exists){
        try {
            await fs.mkdirSync(dir, {recursive:true})
            console.log(`------------> File ${dir} created successfully`)
        } catch (error) {
            console.log(error)
        }
        
    }
}