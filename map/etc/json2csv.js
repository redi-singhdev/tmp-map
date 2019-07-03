
var csv=''
var row0=d[0]
Object.keys(row0).forEach(k=>{
  csv+=`${k},`
})
csv=csv.substr(0,csv.length-1)+'\n'

d.forEach(r=>{
  Object.keys(row0).forEach(k=>{
    csv+=`"${r[k]}",`
  })
  csv=csv.substr(0,csv.length-1)  +'\n'
})
console.warn(csv)