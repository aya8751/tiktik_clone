import type { NextApiRequest, NextApiResponse } from 'next'
import { client } from '../../utils/client'
// to unique identifer for every like 
import { uuid } from 'uuidv4';


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse) 
{
    if(req.method === 'PUT'){
        // destrict what return from body
        const {userId, postId, like} = req.body;
        //change something in client => patch
        const data = like ? await client
        .patch(postId)
        .setIfMissing({likes: []})
        .insert('after', 'likes[-1]',[
            {
                _key:uuid(),
                _ref:userId
            }
        ])
        .commit()
        : await client
        .patch(postId)
        .unset([`likes[_ref=="${userId}"]`])
        .commit();
        // return updated post
        res.status(200).json(data);
    }
}
