import fs from "fs"

fs.writeFileSync("./secret.json", `{"APIsecret": "${process.argv[2]}"}`)