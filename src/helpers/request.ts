import { Routes } from "../routes/routerDB";

export const postRequest = async (url: string, body: any) => {
  try {
    var res;
    const routeCurr = Routes.find(item => item.route == url);
    res = await (new (routeCurr.controller as any))[routeCurr.action](body);
    if(res !== null && res !== undefined){
      return res;
    }else{
      return undefined;
    }
  } catch (error) {
    console.log(error)
    return null
  }
}

