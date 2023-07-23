import {rest} from "msw";
export const handlers = [
    rest.get("http://localhost:30030/scoops",(res,req,ctx)=>{
        return res(
            ctx.json([
                {name:'Chocolate',imagePath : '/images/chocolate.png'},
                {name:'Vanilla',imagePath : '/images/vanilla.png'},
            ])
        )
    })
]