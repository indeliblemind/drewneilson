// Profile and presentation settings. Content stays in one file per subject.
export const site = {
 demo:true,
 profile:{name:'Drew Neilson',headline:'Experience design, creative work & operations.',summary:'I build experiences, run businesses, and explore how people respond to places, stories, and systems.'},
 resume:{
  introduction:'I build experiences, run businesses, and explore how people respond to places, stories, and systems.',
  contact:[] as {label:string;url?:string}[],
  education:[] as {qualification:string;institution:string;period?:string}[],
 },
 resumeOrder:['harbor-studio','city-museum'],
};
