

function characterScript(code) {
  //looks thru all scripts and sees if the code number passed in is in the range of this script
  for (let script of SCRIPTS) {
    if (script.ranges.some(([from, to]) => {
      //[from, to] is deconstructed
      return code >= from && code < to;
    })) {
      //returns entire script
      return script;
    }
  }
  return null;
}

// console.log(characterScript(121));
// → {name: "Latin", …}
function countBy(items, groupName) {
  let counts = [];
  for (let item of items) {
    // debugger
    let name = groupName(item);
    let known = counts.findIndex(c => c.name == name);
    if (known == -1) {
      counts.push({name, count: 1});
    } else {
      counts[known].count++;
    }
  }
  return counts;
}
function dominantDirection(text) {
  let writingsDirections = {ltr: 0, rtl: 0}
  let scripts = countBy(text, char => {
    //code point at returns the Unicode character at a position in a string
    let script = characterScript(char.codePointAt(0));
    return script ? script.direction : "none";
  }).filter(({name}) => name != "none");

  let total = scripts.reduce((n, {count}) => n + count, 0);
  // debugger
  if (total == 0) return "No scripts found";

  const directions = scripts.forEach(({name, count}) => {
    // return `${Math.round(count * 100 / total)}% ${name}`;
    writingsDirections[name] += count
  })
  return writingsDirections['ltr'] > writingsDirections['rtl'] ? `The dominant writing direction is Left-to-Right` : `The dominant writing direction is Right-To-Left`

}


//
// function textScripts(text) {
//   let scripts = countBy(text, char => {
//     //code point at returns the Unicode character at a position in a string
//     let script = characterScript(char.codePointAt(0));
//     return script ? script.name : "none";
//   }).filter(({name}) => name != "none");
//
//   let total = scripts.reduce((n, {count}) => n + count, 0);
//   if (total == 0) return "No scripts found";
//
//   return scripts.map(({name, count}) => {
//     return `${Math.round(count * 100 / total)}% ${name}`;
//   }).join(", ");
// }

// console.log(textScripts('英国的狗说"woof", 俄罗斯的狗说"тяв"'));
// → 61% Han, 22% Latin, 17% Cyrillic
console.log(dominantDirection("Hello!"));
// → ltr
console.log(dominantDirection("Hey, مساء الخير"));
// → rtl
