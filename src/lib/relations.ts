export const relations = {
 'part-of': {forward:'Part of', reverse:'Includes', directed:true},
 'led-to': {forward:'Led to', reverse:'Emerged from', directed:true},
 'informed': {forward:'Informed', reverse:'Informed by', directed:true},
 'related': {forward:'Related to', reverse:'Related to', directed:false},
} as const;
export type Edge = {source:string;target:string;type:keyof typeof relations;label:string;directed:boolean};
