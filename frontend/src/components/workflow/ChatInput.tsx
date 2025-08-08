import React from 'react'
import { Button } from '../ui/button'
import { Send } from 'lucide-react'

const ChatInput = () => {
  return (
    <div className=' left-1/2 -translate-x-1/2 bottom-8 flex items-end absolute  h-[120px] w-[500px] p-4 shadow-md bg-zinc-800 rounded-2xl'>
        <textarea
          placeholder="Describe your workflow here..."
          className=" resize-none flex-grow h-full outline-none "
        />
        <Button className='rounded-full h-8 w-8 ml-2'>
            <Send strokeWidth={2} className="w-6 h-6" />
        </Button>
    </div>
  )
}

export default ChatInput