const fs = require("fs")

const data = [
  ["😀", "grinning face"],
  ["😁", "beaming face with smiling eyes"],
  ["😅", "grinning face with sweat"],
  ["😂", "face with tears of joy"],
  ["🙃", "upside-down face"],
  ["😇", "smiling face with halo"],
  ["🥰", "smiling face with hearts"],
  ["😎", "smiling face with sunglasses"],
  ["😱", "face screaming in fear"],
  ["😷", "face with medical mask"],
]

for (const [idx, record] of Object.entries(data)) {
  let svg = fs.readFileSync(`./svg/${idx}.svg`)
  svg = svg.toString().replaceAll("\"", "\'")
  const metadata = {
    name: record[0],
    description: record[1],
    attributes: [
      {
        trait_type: "Level",
        value: 1
      }
    ],
    image_data: svg
  }
  fs.writeFileSync(`./json/${idx}.json`, JSON.stringify(metadata, null, 2))
}