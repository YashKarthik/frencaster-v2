/**
 * @file Form component, which when submitted fetches the data from /api
 */

import { useRouter, NextRouter } from 'next/router';
import { FormEvent, useState } from 'react';

interface IResponseBody {
  username: string;
  freq: number;
  avatarUrl: string;
}

const submitUname = async (event: FormEvent<HTMLFormElement>, router: NextRouter) => {

  event.preventDefault();
  const name = event.currentTarget!.username.value;
  console.log(name);
  console.log("Creating your interaction circle");

  const res = await fetch(`/api/${name}`);
  const body  = await res.json()
  console.log(body)

  router.push({
    pathname: '/frens',
    query: { body: body }
  }, '/frens', );
};

export default function UsernameInput() {
  const router  = useRouter();
  const [buttonText, setButtonText] = useState('Generate');

  return (
    <form onSubmit={e => submitUname(e, router)}>
      <div className='flex flex-col items-center'>
        <div className="relative mt-1 rounded-sm border-2 border-black">
          <div className="rounded-l-sm pointer-events-none absolute inset-y-0 left-0 flex items-center border-r-2 border-black">
            <span className="px-3 text-violet-900 text-lg">@</span>
          </div>
          <input
            type="text"
            name="username"
            id="username"
            placeholder="yashkarthik"
            className="block
          w-full h-9
          rounded-sm px-12
          text-violet-900
          placeholder:text-gray-500"
          />
        </div>
        <button className="border-2 border-black rounded-sm
          p-1 mt-3
          text-lg
          hover:text-violet-600 hover:border-violet-600"
          onClick={e => setButtonText('Loading...')}
        >
          {buttonText}</button>
      </div>
    </form>
  )
}
