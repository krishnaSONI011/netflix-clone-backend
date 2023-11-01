import slugify from "slugify";

function slug (category){
   
    return slugify(category)
}
export  {slug};