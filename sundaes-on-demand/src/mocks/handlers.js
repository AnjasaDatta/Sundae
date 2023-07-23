import {rest} from "msw";
export const handlers = [
    rest.get("http://localhost:30030/scoops",(res,req,ctx)=>{
        return res(
            ctx.json([
                {name:'Chocolate',imagePath : '/images/chocolate.png'},
                {name:'Vanilla',imagePath : '/images/vanilla.png'},
            ])
        )
    }),
    rest.get("http://localhost:30030/toppings",(res,req,ctx)=>{
        return res(
            ctx.json([
                {name:'Cherries',imagePath : '/images/cherries.png'},
                {name:'M&Ms',imagePath : '/images/m-and-ms.png'},
                {name:'Hot Fudge',imagePath : '/images/hot-fudge.png'},
            ])
        )
    }),
]